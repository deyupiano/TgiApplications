using Stripe;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Mvc;
using TgiApplications.Models;
using TgiApplications.Utility;
using TgiApplications.ViewModels;

namespace TgiApplications.Controllers
{
    public class CustomerCartController : Controller
    {

        public OrderDetailsCart detailCart { get; set; }

        public ActionResult Index()
        {
            var _db = new TgiDbContext();
            detailCart = new OrderDetailsCart()
            {

                OrderHeader = new TgiApplications.Models.Order()
            };

            detailCart.OrderHeader.OrderTotal = 0;

            var userId = Session["UserID"].ToString();
            var cart = _db.ShoppingCarts.Where(c => c.ApplicationUserId == userId);
            if(cart !=null)
            {
                detailCart.listCart = cart.ToList();
            }

            foreach(var list in detailCart.listCart)
            {
                list.Service = _db.Services.FirstOrDefault(m => m.ServiceId == list.ServiceId);
                detailCart.OrderHeader.OrderTotal = detailCart.OrderHeader.OrderTotal + (list.Service.Price * list.Count);
                list.Service.ServiceDescription = SD.ConvertToRawHtml(list.Service.ServiceDescription);
                if(list.Service.ServiceDescription.Length>100)
                {
                    list.Service.ServiceDescription = list.Service.ServiceDescription.Substring(0, 99) + "...";
                }
            }
            detailCart.OrderHeader.OrderTotalOriginal = detailCart.OrderHeader.OrderTotal;
            
            if(Session[SD.ssCouponCode] !=null)
            {
                detailCart.OrderHeader.CouponCode = Session[SD.ssCouponCode].ToString();
                var couponFromDb = _db.Coupons.Where(c => c.Name.ToLower() == detailCart.OrderHeader.CouponCode.ToLower()).FirstOrDefault();
                detailCart.OrderHeader.OrderTotal = SD.DiscountedPrice(couponFromDb, detailCart.OrderHeader.OrderTotalOriginal);
            }


            return View(detailCart);

        }


        public ActionResult Summary()
        {
            var _db = new TgiDbContext();
            detailCart = new OrderDetailsCart()
            {
                OrderHeader = new TgiApplications.Models.Order()
            };

            detailCart.OrderHeader.OrderTotal = 0;

            var userId = Session["UserID"].ToString();
            ApplicationUser applicationUser = _db.Users.Where(c => c.Id == userId).FirstOrDefault();
            var cart = _db.ShoppingCarts.Where(c => c.ApplicationUserId == userId);
            if (cart != null)
            {
                detailCart.listCart = cart.ToList();
            }

            foreach (var list in detailCart.listCart)
            {
                list.Service = _db.Services.FirstOrDefault(m => m.ServiceId == list.ServiceId);
                detailCart.OrderHeader.OrderTotal = detailCart.OrderHeader.OrderTotal + (list.Service.Price * list.Count);
               
            }
            detailCart.OrderHeader.OrderTotalOriginal = detailCart.OrderHeader.OrderTotal;
            detailCart.OrderHeader.PickupName = applicationUser.UserName;
            detailCart.OrderHeader.PhoneNumber = applicationUser.PhoneNumber;
            detailCart.OrderHeader.PickUpTime = DateTime.Now;


            if (Session[SD.ssCouponCode] != null)
            {
                detailCart.OrderHeader.CouponCode = Session[SD.ssCouponCode].ToString();
                var couponFromDb = _db.Coupons.Where(c => c.Name.ToLower() == detailCart.OrderHeader.CouponCode.ToLower()).FirstOrDefault();
                detailCart.OrderHeader.OrderTotal = SD.DiscountedPrice(couponFromDb, detailCart.OrderHeader.OrderTotalOriginal);
            }


            return View(detailCart);

        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Summary(string stripeToken)
        {
            var _db = new TgiDbContext();
            var userId = Session["UserID"].ToString();

            detailCart.listCart = _db.ShoppingCarts.Where(c => c.ApplicationUserId == userId).ToList();

            detailCart.OrderHeader.PaymentStatus = SD.PaymentStatusPending;
            detailCart.OrderHeader.OrderDate = DateTime.Now;
            detailCart.OrderHeader.UserId = userId;
            detailCart.OrderHeader.Status = SD.PaymentStatusPending;
            detailCart.OrderHeader.PickUpTime = Convert.ToDateTime(detailCart.OrderHeader.PickUpDate.ToShortDateString() + " " + detailCart.OrderHeader.PickUpTime.ToShortTimeString());

            List<OrderDetails> orderDetailsList = new List<OrderDetails>();
            _db.Orders.Add(detailCart.OrderHeader);
            _db.SaveChanges();

            detailCart.OrderHeader.OrderTotalOriginal = 0;


            foreach (var item in detailCart.listCart)
            {
                item.Service =  _db.Services.FirstOrDefault(m => m.ServiceId == item.ServiceId);
                OrderDetails orderDetails = new OrderDetails
                {
                    ServiceId = item.ServiceId,
                    OrderId = detailCart.OrderHeader.OrderId,
                    Description = item.Service.ServiceDescription,
                    Name = item.Service.ServiceName,
                    ItemId = item.Service.ItemId,
                    Price = item.Service.Price,
                    Count = item.Count
                };
                detailCart.OrderHeader.OrderTotalOriginal += orderDetails.Count * orderDetails.Price;
                _db.OrderDetails.Add(orderDetails);

            }

            if (Session[SD.ssCouponCode] != null)
            {
                detailCart.OrderHeader.CouponCode = Session[SD.ssCouponCode].ToString();
                var couponFromDb = _db.Coupons.Where(c => c.Name.ToLower() == detailCart.OrderHeader.CouponCode.ToLower()).FirstOrDefault();
                detailCart.OrderHeader.OrderTotal = SD.DiscountedPrice(couponFromDb, detailCart.OrderHeader.OrderTotalOriginal);
            }
            else
            {
                detailCart.OrderHeader.OrderTotal = detailCart.OrderHeader.OrderTotalOriginal;
            }
            detailCart.OrderHeader.CouponCodeDiscount = detailCart.OrderHeader.OrderTotalOriginal - detailCart.OrderHeader.OrderTotal;

            _db.ShoppingCarts.RemoveRange(detailCart.listCart);
            Session[SD.ssCouponCode] = 0;
         var rs = _db.SaveChangesAsync();

            //var options = new ChargeCreateOptions
            //{
            //    Amount = Convert.ToInt32(detailCart.OrderHeader.OrderTotal * 100),
            //    Currency = "Naira",
            //    Description = "Order ID : " + detailCart.OrderHeader.OrderId,
            //    Source = stripeToken

            //};
            //var service = new ChargeService();
            //Charge charge = service.Create(options);

            //if (charge.BalanceTransactionId == null)
            //{
            //    detailCart.OrderHeader.PaymentStatus = SD.PaymentStatusRejected;
            //}
            //else
            //{
            //    detailCart.OrderHeader.TransactionId = charge.BalanceTransactionId;
            //}

            //if (charge.Status.ToLower() == "succeeded")
            //{
            //    detailCart.OrderHeader.PaymentStatus = SD.PaymentStatusApproved;
            //    detailCart.OrderHeader.Status = SD.StatusSubmitted;
            //}
            //else
            //{
            //    detailCart.OrderHeader.PaymentStatus = SD.PaymentStatusRejected;
            //}

            //_db.SaveChangesAsync();
            if(rs.Result > 0)
            {
                detailCart.OrderHeader.PaymentStatus = SD.PaymentStatusApproved;
                detailCart.OrderHeader.Status = SD.StatusSubmitted;
            }
            else
            {
                detailCart.OrderHeader.PaymentStatus = SD.PaymentStatusRejected;
            }
            return RedirectToAction("Index", "Home");

        }


        public ActionResult AddCoupon()
        {
            if (detailCart.OrderHeader.CouponCode == null)
            {
                detailCart.OrderHeader.CouponCode = "";
            }
            Session[SD.ssCouponCode] = detailCart.OrderHeader.CouponCode;

            return RedirectToAction("Index");
        }

        public ActionResult RemoveCoupon()
        {

            Session[SD.ssCouponCode] = string.Empty;

            return RedirectToAction("Index");
        }


        public ActionResult Plus(int cartId)
        {
            var _db = new TgiDbContext();
            var cart = _db.ShoppingCarts.FirstOrDefault(c => c.Id == cartId);
            cart.Count += 1;
            _db.SaveChanges();
            return RedirectToAction("Index");
        }

        public ActionResult Minus(int cartId)
        {
            var _db = new TgiDbContext();
            var cart = _db.ShoppingCarts.FirstOrDefault(c => c.Id == cartId);
            if (cart.Count == 1)
            {
                _db.ShoppingCarts.Remove(cart);
                _db.SaveChanges();

                var cnt = _db.ShoppingCarts.Where(u => u.ApplicationUserId == cart.ApplicationUserId).ToList().Count;
                Session[SD.ssShoppingCartCount] = cnt;
            }
            else
            {
                cart.Count -= 1;
                _db.SaveChanges();
            }

            return RedirectToAction("Index");
        }

        public ActionResult Remove(int cartId)
        {
            var _db = new TgiDbContext();
            var cart = _db.ShoppingCarts.FirstOrDefault(c => c.Id == cartId);

            _db.ShoppingCarts.Remove(cart);
            _db.SaveChanges();

            var cnt = _db.ShoppingCarts.Where(u => u.ApplicationUserId == cart.ApplicationUserId).ToList().Count;
            Session[SD.ssShoppingCartCount] = cnt;
           
            return RedirectToAction("Index");
        }

    }
}