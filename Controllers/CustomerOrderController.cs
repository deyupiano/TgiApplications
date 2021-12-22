using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using TgiApplications.Models;
using TgiApplications.Utility;
using TgiApplications.ViewModels;

namespace TgiApplications.Controllers
{
    public class CustomerOrderController : Controller
    {
 
        private int PageSize = 2;


        //[Authorize]
        public ActionResult ConfirmOrder(int id)
        {
            var _db = new TgiDbContext();
            var userId = Session["UserID"].ToString();

            OrderDetailsViewModel orderDetailsViewModel = new OrderDetailsViewModel()
            {
                OrderHeader = _db.Orders.Include("Users").FirstOrDefault(o => o.OrderId == id && o.UserId == userId),
                OrderDetails = _db.OrderDetails.Where(o => o.OrderId == id).ToList()
            };

            return View(orderDetailsViewModel);
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult GetOrderStatus(int Id)
        {
            var _db = new TgiDbContext();
            return PartialView("_OrderStatus", _db.Orders.Where(m => m.OrderId == Id).FirstOrDefault().Status);

        }

       // [Authorize]
        public ActionResult OrderHistory(int productPage=1)
        {
            var _db = new TgiDbContext();
            var userId = Session["UserID"].ToString();

            OrderListViewModel orderListVM = new OrderListViewModel()
            {
                Orders = new List<OrderDetailsViewModel>()
            };

            

            List<Order> OrderHeaderList = _db.Orders.Include("Users").Where(u => u.UserId == userId).ToList();

            foreach (Order item in OrderHeaderList)
            {
                OrderDetailsViewModel individual = new OrderDetailsViewModel
                {
                    OrderHeader = item,
                    OrderDetails = _db.OrderDetails.Where(o => o.OrderId == item.OrderId).ToList()
                };
                orderListVM.Orders.Add(individual);
            }

            var count = orderListVM.Orders.Count;
            orderListVM.Orders = orderListVM.Orders.OrderByDescending(p => p.OrderHeader.OrderId)
                                 .Skip((productPage - 1) * PageSize)
                                 .Take(PageSize).ToList();

            orderListVM.PagingInfo = new PagingInfo
            {
                CurrentPage = productPage,
                ItemsPerPage = PageSize,
                TotalItem = count,
                urlParam = "/CustomerOrder/OrderHistory?productPage=:"
            };

            return View(orderListVM);
        }

       // [Authorize(Roles = SD.LaundryUser + "," + SD.ManagerUser)]
        public ActionResult ManageOrder(int productPage = 1)
        {
            var _db = new TgiDbContext();
            List<OrderDetailsViewModel> orderDetailsVM = new List<OrderDetailsViewModel>();

            List<Order> OrderHeaderList = _db.Orders.Where(o=>o.Status==SD.StatusSubmitted || o.Status==SD.StatusInProcess).OrderByDescending(u=>u.PickUpTime).ToList();
            

            foreach (Order item in OrderHeaderList)
            {
                OrderDetailsViewModel individual = new OrderDetailsViewModel
                {
                    OrderHeader = item,
                    OrderDetails = _db.OrderDetails.Where(o => o.OrderId == item.OrderId).ToList()
                };
                orderDetailsVM.Add(individual);
            }

            

            return View(orderDetailsVM.OrderBy(o=>o.OrderHeader.PickUpTime).ToList());
        }


        public ActionResult GetOrderDetails(int Id)
        {
            var _db = new TgiDbContext();
            OrderDetailsViewModel orderDetailsViewModel = new OrderDetailsViewModel()
            {
                OrderHeader = _db.Orders.Include("Users").FirstOrDefault(m => m.OrderId == Id),
                OrderDetails = _db.OrderDetails.Where(m => m.OrderId == Id).ToList()
            };
            //orderDetailsViewModel.OrderHeader.ApplicationUser = await _db.ApplicationUser.FirstOrDefaultAsync(u => u.Id == orderDetailsViewModel.OrderHeader.UserId);

            return PartialView("_IndividualOrderDetails", orderDetailsViewModel);
        }




        //[Authorize(Roles =SD.LaundryUser + ","+ SD.ManagerUser)]
        public ActionResult OrderPrepare(int OrderId)
        {
            var _db = new TgiDbContext();
            Order orderHeader =  _db.Orders.Find(OrderId);
            orderHeader.Status = SD.StatusInProcess;
            _db.SaveChanges();
            return RedirectToAction("ManageOrder", "Order");
        }


        //[Authorize(Roles = SD.LaundryUser + "," + SD.ManagerUser)]
        public ActionResult OrderReady(int OrderId)
        {
            var _db = new TgiDbContext();
            Order orderHeader =  _db.Orders.Find(OrderId);
            orderHeader.Status = SD.StatusReady;
            _db.SaveChanges();

            //Email logic to notify user that order is ready for pickup
            //await _emailSender.SendEmailAsync(_db.Users.Where(u => u.Id == orderHeader.UserId).FirstOrDefault().Email, "Spice - Order Ready for Pickup " + orderHeader.Id.ToString(), "Order is ready for pickup.");


            return RedirectToAction("ManageOrder", "Order");
        }


        //[Authorize(Roles = SD.LaundryUser + "," + SD.ManagerUser)]
        public ActionResult OrderCancel(int OrderId)
        {
            var _db = new TgiDbContext();
            Order orderHeader = _db.Orders.Find(OrderId);
            orderHeader.Status = SD.StatusCancelled;
            _db.SaveChangesAsync();
            //_emailSender.SendEmailAsync(_db.Users.Where(u => u.Id == orderHeader.UserId).FirstOrDefault().Email, "Spice - Order Cancelled " + orderHeader.Id.ToString(), "Order has been cancelled successfully.");

            return RedirectToAction("ManageOrder", "Order");
        }



        //[Authorize]
        public ActionResult OrderPickup(int productPage = 1, string searchEmail=null, string searchPhone = null, string searchName = null)
        {
            var _db = new TgiDbContext();


            OrderListViewModel orderListVM = new OrderListViewModel()
            {
                Orders = new List<OrderDetailsViewModel>()
            };

            StringBuilder param = new StringBuilder();
            param.Append("/CustomerOrder/OrderPickup?productPage=:");
            param.Append("&searchName=");
            if(searchName!=null)
            {
                param.Append(searchName);
            }
            param.Append("&searchEmail=");
            if (searchEmail != null)
            {
                param.Append(searchEmail);
            }
            param.Append("&searchPhone=");
            if (searchPhone != null)
            {
                param.Append(searchPhone);
            }

            List<Order> OrderHeaderList = new List<Order>();
            if (searchName != null || searchEmail != null || searchPhone != null)
            {
                var user = new ApplicationUser();

                if(searchName!=null)
                {
                    OrderHeaderList = _db.Orders.Include("Users")
                                                .Where(u => u.PickupName.ToLower().Contains(searchName.ToLower()))
                                                .OrderByDescending(o => o.OrderDate).ToList();
                }
                else
                {
                    if (searchEmail != null)
                    {
                        user = _db.Users.Where(u => u.Email.ToLower().Contains(searchEmail.ToLower())).FirstOrDefault();
                        OrderHeaderList = _db.Orders.Include("Users")
                                                    .Where(o=>o.UserId==user.Id)
                                                    .OrderByDescending(o => o.OrderDate).ToList();
                    }
                    else
                    {
                        if (searchPhone != null)
                        {
                            OrderHeaderList = _db.Orders.Include("Users")
                                                        .Where(u => u.PhoneNumber.Contains(searchPhone))
                                                        .OrderByDescending(o => o.OrderDate).ToList();
                        }
                    }
                }
            }
            else
            {
                OrderHeaderList = _db.Orders.Include("Users").Where(u => u.Status == SD.StatusReady).ToList();
            }

            foreach (Order item in OrderHeaderList)
                {
                    OrderDetailsViewModel individual = new OrderDetailsViewModel
                    {
                        OrderHeader = item,
                        OrderDetails = _db.OrderDetails.Where(o => o.OrderId == item.OrderId).ToList()
                    };
                    orderListVM.Orders.Add(individual);
                }
            


            var count = orderListVM.Orders.Count;
            orderListVM.Orders = orderListVM.Orders.OrderByDescending(p => p.OrderHeader.OrderId)
                                 .Skip((productPage - 1) * PageSize)
                                 .Take(PageSize).ToList();

            orderListVM.PagingInfo = new PagingInfo
            {
                CurrentPage = productPage,
                ItemsPerPage = PageSize,
                TotalItem = count,
                urlParam = param.ToString()
            };

            return View(orderListVM);
        }

        //[Authorize(Roles =SD.FrontDeskUser + ","+ SD.ManagerUser)]
        [HttpPost]
        [ActionName("OrderPickup")]
        public ActionResult OrderPickupPost(int orderId)
        {
            var _db = new TgiDbContext();
            Order orderHeader = _db.Orders.Find(orderId);
            orderHeader.Status = SD.StatusCompleted;
            _db.SaveChangesAsync();
            //await _emailSender.SendEmailAsync(_db.Users.Where(u => u.Id == orderHeader.UserId).FirstOrDefault().Email, "Spice - Order Completed " + orderHeader.Id.ToString(), "Order has been completed successfully.");

            return RedirectToAction("OrderPickup", "Order");
        }
    }
}