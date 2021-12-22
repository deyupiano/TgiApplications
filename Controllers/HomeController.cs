using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Web;
using System.Web.Mvc;
using TgiApplications.Models;
using TgiApplications.Security;
using TgiApplications.ViewModels;

namespace TgiApplications.Controllers
{
    //[Authorize(Roles = "Super Admin, Admin")]
    public class HomeController : Controller
    {
        //private readonly ILogger<HomeController> _logger;
        //private readonly CustomIDataProtection protector;

        //public HomeController(ILogger<HomeController> logger, CustomIDataProtection customIDataProtection)
        //{
        //   // _logger = logger;
        //    protector = customIDataProtection;
        //}

        //[Route("Home")]
        public string userRole = "";
        public ActionResult Index()
        {

            if(string.IsNullOrEmpty(Session["UserID"] as string))
            {
                Session["UserRoles"] = "NoRole";
            }
            Session["UserRoles"] = Session["UserRoles"] as string;
            //if (enCodedUserDetails.Roles != null)
            //{
            //    SignInDetailsModel dm = new SignInDetailsModel();
            //    dm.FirstName = protector.Encode(Convert.ToByte(enCodedUserDetails.FirstName).);
            //    dm.LastName = protector.Encode(enCodedUserDetails.LastName);
            //    var results = new List<string>();
            //    foreach (var role in enCodedUserDetails.Roles)
            //    {
            //        var encodedRole = protector.Encode(role);
            //        results.Add(encodedRole);
            //    }
            //    dm.Roles = results;
            //    return View(dm);
            //}
            var user = new SignInDetailsModel { FirstName = "", LastName = "", Roles = { } };
            return View(user);
            //return View();
        }

        public ActionResult ContactUs()
        {
            var user = new SignInDetailsModel { FirstName = "", LastName = "", Roles = { } };
            return View(user);
        }
        public bool SendEmail(string recipientEmail, string subject, string emailBody, string senderEmail, string phoneNumber, string fullname)
        {
            emailBody += "<hr/>";
            emailBody += "<div style='background-color:forestgreen;color:white;width:100%;padding-left:10px'>";
            if(recipientEmail == "tleduservices@tolbeelglobalinvestment.com")
            {
                emailBody += "<p> COMPANY: TL EDUCATIONAL SERVICES<p>";
            }
            else if (recipientEmail == "tdelivery@tolbeelglobalinvestment.com")
            {
                emailBody += "<p> COMPANY: SMART DELIVERY SERVICES<p>";
            }
            else if (recipientEmail == "drycleaning@tolbeelglobalinvestment.com")
            {
                emailBody += "<p> COMPANY: TOLBEEL LAUNDRY SERVICES<p>";
            }
            emailBody += "<p> Mail From: " + fullname.ToUpper() + "<p>";
            emailBody += "<p> Sender Email: " + senderEmail + "<p>";
            emailBody += "<p> Sender Phone Number: " + phoneNumber + "<p>";
            emailBody += "</div>";
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
                MailMessage mailMessage = new MailMessage("deyupiano@gmail.com", recipientEmail, subject, emailBody);
                mailMessage.IsBodyHtml = true;
                mailMessage.BodyEncoding = UTF8Encoding.UTF8;
                smtpClient.Send(mailMessage);
                return true;
            }
            catch (Exception ex)
            {
                ex.ToString();
                return false;
            }

        }

        [HttpPost]
        public ActionResult ContactUs(ContactUsMailData data)
        {

            var result = SendEmail(data.EmailRecipient, data.MailSubject, data.MailBody, data.EmailSender, data.PhoneNumber, data.Fullname);
            
            var user = new SignInDetailsModel { FirstName = "", LastName = "", Roles = { } };
            return View(user);
        }
        public ActionResult About()
        {
            var user = new SignInDetailsModel { FirstName = "", LastName = "", Roles = { } };
            return View(user);
        }
        //[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        //public ActionResult Error()
        //{
        //    return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        //}
    }
}
