using Newtonsoft.Json;
using TgiApplications.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using TgiApplications.Utility;
using TgiApplications.Repository;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace TgiApplications.Controllers
{
    public class UsersController : Controller
    {
        //private static string baseUrl = "http://195.201.81.237/";
        private static string baseUrl = "https://localhost:44359/";
        //private static string baseUrl = "https://www.tolbeelglobalinvestment.com/";

        //public UsersController(HttpClient httpClient)
        //{
        //    this.httpClient = httpClient;
        //    httpClient.DefaultRequestHeaders.Clear();
        //}
        // GET: Users
        //[Route("login")]
        public ActionResult Login()
        {
            return View();
        }
        static Dictionary<string, string> GetTokenDetails(string userName, string password)
        {
            Dictionary<string, string> tokenDetails = null;
            try
            {
                using (var client = new HttpClient())
                {
                    var login = new Dictionary<string, string>
                   {
                       {"grant_type", "password"},
                       {"username", userName},
                       {"password", password},
                   };

                    var resp = client.PostAsync("https://www.tolbeelglobalinvestment.com/token", new FormUrlEncodedContent(login));
                    resp.Wait(TimeSpan.FromSeconds(10));

                    if (resp.IsCompleted)
                    {
                        if (resp.Result.Content.ReadAsStringAsync().Result.Contains("access_token"))
                        {
                            tokenDetails = JsonConvert.DeserializeObject<Dictionary<string, string>>(resp.Result.Content.ReadAsStringAsync().Result);
                        }
                    }
                }
            }
            catch (Exception ex)
            {

            }
            return tokenDetails;
        }
        //[Route("login")]
        [HttpPost]
        public ActionResult Login(SignInModel signInModel)
        {
            var _db = new TgiDbContext();
            if (ModelState.IsValid)
            {
                HttpClient client = new HttpClient();
                client.BaseAddress = new Uri(baseUrl);
                HttpResponseMessage response =
                  client.PostAsync("Token",
                    new StringContent(string.Format("grant_type=password&username={0}&password={1}",
                      HttpUtility.UrlEncode(signInModel.UserName),
                      HttpUtility.UrlEncode(signInModel.Password)), Encoding.UTF8,
                      "application/x-www-form-urlencoded")).Result;

                string resultJSON = response.Content.ReadAsStringAsync().Result;
                LoginTokenResult result = JsonConvert.DeserializeObject<LoginTokenResult>(resultJSON);
                try
                {
                    if (result.AccessToken != null)
                    {
                        var activationStatus = result.IsActivated;
                        if (activationStatus == true)
                        {
                            Session["AccessToken"] = result.AccessToken.ToString();
                            Session["UserID"] = result.UserId.ToString().Replace("\"", "");
                            Session["UserName"] = result.UserName.ToString().Replace("\"", "");
                            Session["UserRoles"] = result.Roles.ToString();
                            string roles = Regex.Replace(result.Roles, @"[\[\]]", "");
                            roles = roles.Replace("\"", "");
                            string uId = "";
                            uId = Session["UserID"].ToString();
                            List<ShoppingCart> lstShopCart = _db.ShoppingCarts.Where(x => x.ApplicationUserId == uId).ToList();
                            Session[SD.ssShoppingCartCount] = lstShopCart.Count();

                            if (roles.Contains("SuperAdmin") == true)
                            {
                                return RedirectToAction("dashboard", "admin");
                            }
                            else if (roles.Contains("LaundryManager") == true)
                            {
                                return RedirectToAction("home", "LaundryServices");
                            }
                            else if (roles.Contains("LaundryCustomer") == true)
                            {
                                return RedirectToAction("home", "LaundryServices");
                            }
                            else if (roles.Contains("LogisticsManager") == true)
                            {
                                return RedirectToAction("home", "LogisticsServices");
                            }
                            else if (roles.Contains("LogisticsCustomer") == true)
                            {
                                return RedirectToAction("home", "LogisticsServices");
                            }
                            else if (roles.Contains("SchoolManager") == true)
                            {
                                return RedirectToAction("home", "EducationalServices");
                            }
                            else if (roles.Contains("Student") == true)
                            {
                                return RedirectToAction("home", "EducationalServices");
                            }
                            else if (roles.Contains("LaundryStaff") == true)
                            {
                                return RedirectToAction("home", "LaundryServices");
                            }
                            else if (roles.Contains("LogisticsStaff") == true)
                            {
                                return RedirectToAction("home", "LogisticsServices");
                            }
                            else if (roles.Contains("SchoolStaff") == true)
                            {
                                return RedirectToAction("home", "EducationalServices");
                            }
                        }
                        else
                        {
                            ViewBag.Message = "PLEASE CONTACT YOUR ADMIN FOR ACCOUNT ACTIVATION.";
                        }

                    }
                    else
                    {
                        ViewBag.Message = "OOPS!  LOGIN FAILED. INVALID CREDENTIALS ";
                        return View(signInModel);
                    }

                }
                catch (Exception ex)
                {
                    ViewBag.Message = "OOPS! LOGIN FAILED. INVALID CREDENTIALS ";
                }

            }
            return View(signInModel);
        }

        public ActionResult Logout()
        {
            Response.Cache.SetCacheability(HttpCacheability.NoCache);
            Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
            Response.Cache.SetNoStore();
            Session[SD.ssShoppingCartCount] = 0;
            Session.RemoveAll();
            return RedirectToAction("Index", "Home");
        }
 
        public class LoginTokenResult
        {
            public override string ToString()
            {
                return AccessToken;
            }

            [JsonProperty(PropertyName = "access_token")]
            public string AccessToken { get; set; }
            [JsonProperty(PropertyName = "username")]
            public string UserName { get; set; }
            [JsonProperty(PropertyName = "userId")]
            public string UserId { get; set; }
            [JsonProperty(PropertyName = "error")]
            public string Error { get; set; }

            [JsonProperty(PropertyName = "error_description")]
            public string ErrorDescription { get; set; }
            public string Roles { get; set; }
            [JsonProperty(PropertyName = "isActivated")]
            public bool IsActivated { get; set; }

        }
        public async Task<JsonResult> SetPassword(SetPasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(false);
            }
            var userStore = new UserStore<ApplicationUser>(new TgiDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            IdentityResult result = await manager.AddPasswordAsync(Session["UserID"].ToString(), model.NewPassword);

            if (!result.Succeeded)
            {
                return Json(false);
            }

            return Json(true);
        }
        [HttpPost]
        public async Task<JsonResult> ChangePassword(ChangePasswordBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return Json(false);
            }
            var userStore = new UserStore<ApplicationUser>(new TgiDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var userId = Session["UserID"].ToString();
            IdentityResult result = await manager.ChangePasswordAsync(userId, model.OldPassword,model.NewPassword);

            if (!result.Succeeded)
            {
                return Json(false);
            }

            return Json(true);
        }
        public ActionResult ChangePassword()
        {

            return View();
        }
        public ActionResult Register()
        {
            var db = new TgiDbContext();
            List<Business> bList = db.Businesses.ToList();
            ViewBag.BList = new SelectList(bList, "BizName", "BizName");
            return View();
        }
        [AllowAnonymous]
        [HttpPost]
        public ActionResult Register(RegisterModel model)
        {
            var db = new TgiDbContext();
            List<Business> bList = db.Businesses.ToList();
            ViewBag.BList = new SelectList(bList, "BizName", "BizName");
            if (ModelState.IsValid)
            {
                //string apiUrl = baseUrl + "api/account/register";
                string stringData = JsonConvert.SerializeObject(model);
                HttpClient httpClient = new HttpClient();
                httpClient.BaseAddress = new Uri(baseUrl);
                HttpResponseMessage response =
                httpClient.PostAsync("account/register",
                new StringContent(string.Format("company={0}&firstname={1}&lastname={2}&phonenumber={3}&confirmpassword={4}&email={5}&password={6}",
                //HttpUtility.UrlEncode(model.UserName),
                HttpUtility.UrlEncode(model.Company),
                HttpUtility.UrlEncode(model.FirstName),
                HttpUtility.UrlEncode(model.LastName),
                HttpUtility.UrlEncode(model.PhoneNumber),
                HttpUtility.UrlEncode(model.ConfirmPassword),
                HttpUtility.UrlEncode(model.Email),
                HttpUtility.UrlEncode(model.Password)), Encoding.UTF8,
                "application/x-www-form-urlencoded")).Result;

                string resultJSON = response.Content.ReadAsStringAsync().Result;

                //var contentData = new StringContent(stringData, System.Text.Encoding.UTF8, "application/json");
                // var response = await httpClient.PostAsync(apiUrl, contentData);

                if (response.IsSuccessStatusCode)
                {
                    ViewBag.Message = "User successfully created..";
                    ModelState.Clear();
                }
                else
                {
                    ViewBag.Message = "Error while calling web API";
                }
            }
            return View(model);
        }

    }
}