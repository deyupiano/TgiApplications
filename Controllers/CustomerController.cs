using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TgiApplications.Models;
using TgiApplications.OtherServices;
using TgiApplications.Utility;
using TgiApplications.ViewModels;

namespace TgiApplications.Controllers
{
    public class CustomerController : Controller
    {
        public ActionResult Index()
        {
            var _db = new TgiDbContext();
            IndexViewModel IndexVM = new IndexViewModel()
            {
                Service =  _db.Services.Include("ServiceCategory").Include("Item").ToList(),
                ServiceCategory = _db.ServiceCategories.ToList(),
                Coupon = _db.Coupons.Where(c => c.IsActive == true).ToList()

            };
            var userId = Session["UserID"].ToString();

            if (userId != null || userId != "")
            {
                var cnt = _db.ShoppingCarts.Where(u => u.ApplicationUserId == userId).ToList().Count;
                // HttpContext.Session.SetInt32(SD.ssShoppingCartCount, cnt);
                Session[SD.ssShoppingCartCount] = cnt;
            }


            return View(IndexVM);
        }
       // [Authorize]
        public ActionResult Details(int id)
        {
            var _db = new TgiDbContext();
            var menuItemFromDb = _db.Services.Include("ServiceCategory").Include("Item").Where(m => m.ServiceId == id).FirstOrDefault();

            ShoppingCart cartObj = new ShoppingCart()
            {
                Service = menuItemFromDb,
                ServiceId = menuItemFromDb.ServiceId
            };

            return View(cartObj);
        }


       // [Authorize]
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Details(ShoppingCart CartObject)
        {
            var _db = new TgiDbContext();
            CartObject.Id = 0;
            if (ModelState.IsValid)
            {
                var userId = Session["UserID"].ToString();

                if (userId != null || userId != "")
                {
                    CartObject.ApplicationUserId = userId;
                }
           

                ShoppingCart cartFromDb = _db.ShoppingCarts.Where(c => c.ApplicationUserId == CartObject.ApplicationUserId
                                                && c.ServiceId == CartObject.ServiceId).FirstOrDefault();

                if (cartFromDb == null)
                {
                    _db.ShoppingCarts.Add(CartObject);
                }
                else
                {
                    cartFromDb.Count = cartFromDb.Count + CartObject.Count;
                }
                _db.SaveChanges();

                var count = _db.ShoppingCarts.Where(c => c.ApplicationUserId == CartObject.ApplicationUserId).ToList().Count();
                Session[SD.ssShoppingCartCount] = count;

                return RedirectToAction("Index");
            }
            else
            {

                var menuItemFromDb = _db.Services.Include("ServiceCategory").Include("Item").Where(m => m.ServiceId == CartObject.ServiceId).FirstOrDefault();

                ShoppingCart cartObj = new ShoppingCart()
                {
                    Service = menuItemFromDb,
                    ServiceId = menuItemFromDb.ServiceId
                };

                return View(cartObj);
            }
        }
        public JsonResult GetAllDropDownList() { 
             var _db = new TgiDbContext();
            var laundryCustomers = _db.Customers.Where(x => x.RegisteredAs == "LaundryCustomer").ToList();
            var services = _db.Services.ToList();
            var sType = _db.ServiceTypes.ToList();
            var sCategory = _db.ServiceCategories.ToList();
            var pStatus = _db.ProgressStatuses.ToList();
            var items = _db.Items.ToList();
            var centers = _db.BizCenters.ToList();
            var locations = _db.LocationExtras.ToList();
            var iCategory = _db.ItemCategories.ToList();
            MultipleList mlist = new MultipleList()
            {
                Customer = laundryCustomers,
                Service = services,
                ServiceType = sType,
                ServiceCategory = sCategory,
                ProgressStatus = pStatus,
                Item = items,
                Center = centers,
                Location= locations,
                ItemCat = iCategory
            };
            return Json(mlist, JsonRequestBehavior.AllowGet);
        }
        public ActionResult OfflineOrder()
        {
            return View();
        }
        [HttpPost]
        public ActionResult OfflineOrder(List<OfflineOrder> orders)
        {
            var _db = new TgiDbContext();
            var ofo = new OfflineOrder();
            foreach (var order in orders)
            {
                ofo.BizCenterId = order.BizCenterId;
                ofo.LocationExtraCharges = order.LocationExtraCharges;
                ofo.ItemColor = order.ItemColor;
                ofo.ItemId = order.ItemId;
                ofo.OrderDate = DateTime.Now;
                ofo.OrderStatus = order.OrderStatus;
                ofo.PickupDate = order.PickupDate;
                ofo.Price = order.Price;
                ofo.Quantity = order.Quantity;
                ofo.ReferenceNo = order.ReferenceNo;
                ofo.ServiceCategoryId = order.ServiceCategoryId;
                ofo.ServiceTypeId = order.ServiceTypeId;
                ofo.ServiceId = order.ServiceId;
                ofo.DiscountAmount = order.DiscountAmount;

            }


            return View();
        }
        public ActionResult UpdateProgressStatus()
        {
            var _db = new TgiDbContext();

            return View();
        }
        [HttpPost]
        public JsonResult SendText(TextMessanger message)
        {
            bool result = false;
            // Plug in your SMS service here to send a text message.
            var spc = new SmsProviderConnection();
            var request = (HttpWebRequest)WebRequest.Create(requestUriString: spc.Request);
            IWebProxy theProxy = request.Proxy;
            if (theProxy != null)
            {
                theProxy.Credentials = CredentialCache.DefaultCredentials;
            }
            var cookies = new CookieContainer();
            request.UseDefaultCredentials = true;
            request.CookieContainer = cookies;
            request.CookieContainer = cookies;

            string data = spc.Data(mSender: "TOLBEEL PROFESSIONAL LAUNDRY & DRY CLEANING SERVICES", gsm: message.Destination, smsText: message.Body);
           
            request.ContentType = "application/json";
            request.Method = WebRequestMethods.Http.Post;
            request.ContentLength = data.Length;
            try
            {
                if (request.Connection != null)
                {
                    var writer =  new StreamWriter(request.GetRequestStream());
                    writer.Write(data);
                    writer.Close();
                    result = true;
                }
            }
            catch (Exception ex)
            {
                ex.ToString();
                result = false;
            }
            return Json(result);
        }
        public JsonResult SendMail(TextMessanger mailer)
        {
            bool result = false;
            string emailBody = mailer.Body;
            string subject = "CUSTOMER ORDER SUMMARY";
            try
            {
                var smtpClient = new SmtpClient("smtp.gmail.com")
                {
                    Port = 587,
                    EnableSsl = true,
                    Timeout = 100000,
                    DeliveryMethod = SmtpDeliveryMethod.Network,
                    UseDefaultCredentials = false,
                    //Credentials = new NetworkCredential("tolbeelglobalinvestment@gmail.com", "Tonronto@1965"),
                    Credentials = new NetworkCredential("deyupiano@gmail.com", "412515Ade"),
                };
                //MailMessage mailMessage = new MailMessage("tolbeelglobalinvestment@gmail.com", recipientEmail, subject, emailBody);
                MailMessage mailMessage = new MailMessage("deyupiano@gmail.com", mailer.Destination, subject, emailBody);
                mailMessage.IsBodyHtml = true;
                mailMessage.BodyEncoding = UTF8Encoding.UTF8;
                smtpClient.Send(mailMessage);
                result = true;
                return Json(result);
            }
            catch (Exception ex)
            {
                ex.ToString();
                result= false;
                return Json(result);
            }
        }
    }
}