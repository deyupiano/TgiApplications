using TgiApplications.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TgiApplications.ViewModels;
using Newtonsoft.Json;
using System.Net.Http;
using System.Threading.Tasks;
using System.IO;
using TgiApplications.Utility;
using TgiApplications.OtherServices;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity;

namespace TgiApplications.Controllers

{
    public class AdminController : Controller
    {

        public ServiceMenuItemVM MenuItemVM { get; set; }
        //private static string baseUrl = "http://195.201.81.237/";
        private static string baseUrl = "https://localhost:44359/";
        //private static string baseUrl = "https://www.tolbeelglobalinvestment.com/";
        private object records = new List<CustomerVM>();
        public JsonResult GetRoles()
        {
            var _db = new TgiDbContext();
            var roles = _db.Roles.ToList();

            return Json(roles, JsonRequestBehavior.AllowGet);
        }
        // GET: Admin
        public ActionResult Dashboard()
        {
            if ((Session["UserRoles"].ToString()).Contains("SuperAdmin") == true)
            {
                return View();
            }
            return RedirectToAction("index", "home");
        }
        #region Customer Staff Registration
        public ActionResult CustomerList()
        {
            ViewBag.Customers = TempData["Customers"];
            return View();
        }
        public ActionResult CreateCustomer()
        {
            var _db = new TgiDbContext();
            ViewBag.Roles = new SelectList(_db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> SaveCustomer(List<CustomerVM> persons)
        {

            if (ModelState.IsValid)
            {
                var result = await SendBulkCreate(persons);
                if (result == true)
                {
                    return Json(records, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(null, JsonRequestBehavior.AllowGet);
                }
            }

            return Json(null, JsonRequestBehavior.AllowGet);
        }
        public async Task<JsonResult> GetAllCustomer()
        {
            bool result = false;
            var apiService = new ApiService();
            //var connection = await apiService.CheckConnection();
            //if (connection.IsSuccess)
            //{
            //    //Error No internet Page
            //    return Json(null, JsonRequestBehavior.AllowGet);
            //}

            var token = Session["AccessToken"];
            var response = await apiService.GetList<CustomerVM>(
                baseUrl,
                "person",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                return Json(null, JsonRequestBehavior.AllowGet);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;

            return Json(records, JsonRequestBehavior.AllowGet);
        }
        public async Task<JsonResult> GetCustomerById(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            //var connection = await apiService.CheckConnection();
            //if (connection.IsSuccess)
            //{
            //    //Error No internet Page
            //    return Json(null, JsonRequestBehavior.AllowGet);
            //}

            var token = Session["AccessToken"];
            var response = await apiService.Get<CustomerVM>(
                baseUrl,
                "person",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                return Json(null, JsonRequestBehavior.AllowGet);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;

            return Json(records, JsonRequestBehavior.AllowGet);
        }
        public async Task<JsonResult> DeleteCustomerById(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            //var connection = await apiService.CheckConnection();
            //if (connection.IsSuccess)
            //{
            //    //Error No internet Page
            //    return Json(null, JsonRequestBehavior.AllowGet);
            //}

            var token = Session["AccessToken"];
            var response = await apiService.Delete<CustomerVM>(
                baseUrl,
                "Api",
                "/CustomerApi",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                return Json(null, JsonRequestBehavior.AllowGet);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;

            return Json(records, JsonRequestBehavior.AllowGet);
        }
        public JsonResult Delete(int id)
        {
            bool status;
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl);
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("Api/CustomerApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                status = result.IsSuccessStatusCode;
                if (result.IsSuccessStatusCode)
                {
                    return Json(status, JsonRequestBehavior.AllowGet);
                }
            }
            return Json(status, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public async Task<JsonResult> SaveEditedCustomer(int CustId, CustomerVM customer)
        {
            bool result = false;
            var apiService = new ApiService();
            //var connection = await apiService.CheckConnection();
            //if (connection.IsSuccess)
            //{
            //    //Error No internet Page
            //    return Json(null, JsonRequestBehavior.AllowGet);
            //}

            var token = Session["AccessToken"];
            var response = await apiService.Put<CustomerVM>(
                baseUrl,
                "Api",
                "/CustomerApi",
                "Bearer",
                token.ToString(),
                customer, CustId);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                return Json(null, JsonRequestBehavior.AllowGet);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;

            return Json(records, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        // [ValidateAntiForgeryToken]
        public async Task<ActionResult> CreateCustomer(List<CustomerVM> persons)
        {
            bool result = false;
            if (ModelState.IsValid)
            {
                result = await SendBulkCreate(persons);
                if (result == true)
                {
                    ViewBag.Message = "Account(s) successfully created..";
                    ViewBag.Customers = TempData["Customers"];
                    ModelState.Clear();
                    //return RedirectToAction("CustomerList");

                }
                else
                {
                    ViewBag.Message = "Something went wrong. Please try again.";
                }
            }

            return View();
        }
        private async Task<bool> SendBulkCreate(List<CustomerVM> persons)
        {
            bool result = false;
            var apiService = new ApiService();
            //var connection = await apiService.CheckConnection();
            //if (connection.IsSuccess)
            //{
            //    //Error No internet Page
            //    return result;
            //}

            var token = Session["AccessToken"];
            var response = await apiService.PostBulkPerson<CustomerVM>(
                baseUrl,
                "person",
                "/create",
                "Bearer",
                token.ToString(),
                persons);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                return result;
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return result;
        }
        #endregion

        #region Item Category
        public async Task<ActionResult> ItemCategory()
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.GetList<ItemCategoryVM>(
                baseUrl,
                "iCat",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        public async Task<ActionResult> EditItemCategory(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<ItemCategoryVM>(
                baseUrl,
                "iCat",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        [HttpPost]
        public async Task<ActionResult> EditItemCategory(int id, ItemCategoryVM ic)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Put<ItemCategoryVM>(
                baseUrl,
                "Api",
                "/ItemCategoryApi",
                "Bearer",
                token.ToString(),
                ic, id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return RedirectToAction("ItemCategory", records);
        }

        public ActionResult DeleteItemCategory(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "/Api/");
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("ItemCategoryApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("ItemCategory");

                }
            }
            return RedirectToAction("ItemCategory");
        }

        public ActionResult CreateItemCategory()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> CreateItemCategory(ItemCategoryVM ic)
        {
            var apiService = new ApiService();
            if (ModelState.IsValid)
            {
                var token = Session["AccessToken"];
                var response = await apiService.Post<ItemCategoryVM>(
                    baseUrl,
                    "ItemCategory",
                    "/Create",
                    "Bearer",
                    token.ToString(),
                    ic);
                if (!response.IsSuccess)
                {
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact administrator.");
                    return View(ic);
                }
                return RedirectToAction("ItemCategory");
            }

            return RedirectToAction("ItemCategory");
        }

        #endregion

        #region Service Category
        public async Task<ActionResult> ServiceCategory()
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.GetList<ServiceCategoryVM>(
                baseUrl,
                "sCat",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        public async Task<ActionResult> EditServiceCategory(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<ServiceCategoryVM>(
                baseUrl,
                "sCat",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        [HttpPost]
        public async Task<ActionResult> EditServiceCategory(int id, ServiceCategoryVM ic)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Put<ServiceCategoryVM>(
                baseUrl,
                "Api",
                "/ServiceCategoryApi",
                "Bearer",
                token.ToString(),
                ic, id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return RedirectToAction("ServiceCategory", records);
        }

        public ActionResult DeleteServiceCategory(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "/Api/");
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("ServiceCategoryApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("ServiceCategory");

                }
            }
            return RedirectToAction("ServiceCategory");
        }

        public ActionResult CreateServiceCategory()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> CreateServiceCategory(ServiceCategoryVM ic)
        {
            var apiService = new ApiService();
            if (ModelState.IsValid)
            {
                var token = Session["AccessToken"];
                var response = await apiService.Post<ServiceCategoryVM>(
                    baseUrl,
                    "ServiceCategory",
                    "/Create",
                    "Bearer",
                    token.ToString(),
                    ic);
                if (!response.IsSuccess)
                {
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact administrator.");
                    return View(ic);
                }
                return RedirectToAction("ServiceCategory");
            }

            return RedirectToAction("ServiceCategory");
        }
        #endregion

        #region Service
        public async Task<ActionResult> Services()
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.GetList<ServiceVM>(
                baseUrl,
                "service",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        public async Task<ActionResult> EditService(int id)
        {
            var db = new TgiDbContext();
            List<ServiceCategory> cList = db.ServiceCategories.ToList();
            ViewBag.CategoryList = new SelectList(cList, "ServiceCategoryId", "ServiceCategoryName");
            List<Item> iList = db.Items.ToList();
            ViewBag.ItemList = new SelectList(iList, "ItemId", "ItemName");
            List<ServiceType> stList = db.ServiceTypes.ToList();
            ViewBag.ServiceType = new SelectList(stList, "Id", "Name");
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<ServiceVM>(
                baseUrl,
                "service",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            records = response.Result;
            object catIdValue = null;
            object ItmIdValue = null;
            object StValue = null;
            object o = records;
            string[] propertyNames = o.GetType().GetProperties().Select(p => p.Name).ToArray();
            foreach (var prop in propertyNames)
            {
                if (prop == "ServiceCategoryId")
                {
                    catIdValue = o.GetType().GetProperty(prop).GetValue(o, null);
                }

                if (prop == "ItemId")
                {
                    ItmIdValue = o.GetType().GetProperty(prop).GetValue(o, null);
                }
                if (prop == "Id")
                {
                    StValue = o.GetType().GetProperty(prop).GetValue(o, null);
                }
            }

            //ServiceVM res = JsonConvert.DeserializeObject<ServiceVM>(records);
            ViewBag.CatValue = catIdValue;
            ViewBag.ItmValue = ItmIdValue;
            ViewBag.StValue = StValue;
            return View(records);
        }
        [HttpPost]
        public async Task<JsonResult> EditService(int id, ServiceVM ic)
        {
            var db = new TgiDbContext();
            List<ServiceCategory> cList = db.ServiceCategories.ToList();
            ViewBag.CategoryList = new SelectList(cList, "ServiceCategoryId", "ServiceCategoryName");
            List<Item> iList = db.Items.ToList();
            ViewBag.ItemList = new SelectList(iList, "ItemId", "ItemName");
            List<ServiceType> stList = db.ServiceTypes.ToList();
            ViewBag.ServiceType = new SelectList(stList, "Id", "Name");
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Put<ServiceVM>(
                baseUrl,
                "Api",
                "/ServiceApi",
                "Bearer",
                token.ToString(),
                ic, id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
                return Json(false);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            //return RedirectToAction("Services", records);
            return Json(true);
        }

        public ActionResult DeleteService(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "/Api/");
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("ServiceApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("Services");

                }
            }
            return RedirectToAction("Services");
        }

        public ActionResult CreateService()
        {
            var db = new TgiDbContext();
            List<ServiceCategory> cList = db.ServiceCategories.ToList();
            ViewBag.CategoryList = new SelectList(cList, "ServiceCategoryId", "ServiceCategoryName");
            List<Item> iList = db.Items.ToList();
            ViewBag.ItemList = new SelectList(iList, "ItemId", "ItemName");
            List<ServiceType> stList = db.ServiceTypes.ToList();
            ViewBag.ServiceType = new SelectList(stList, "Id", "Name");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> CreateService(ServiceVM ic)
        {
            var db = new TgiDbContext();
            List<ServiceCategory> cList = db.ServiceCategories.ToList();
            ViewBag.CategoryList = new SelectList(cList, "ServiceCategoryId", "ServiceCategoryName");

            List<Item> iList = db.Items.ToList();
            ViewBag.CategoryList = new SelectList(cList, "ItemId", "ItemName");
            List<ServiceType> stList = db.ServiceTypes.ToList();
            ViewBag.ServiceType = new SelectList(stList, "Id", "Name");
            var apiService = new ApiService();
            if (ModelState.IsValid)
            {
                var token = Session["AccessToken"];
                var response = await apiService.Post<ServiceVM>(
                    baseUrl,
                    "Service",
                    "/Create",
                    "Bearer",
                    token.ToString(),
                    ic);
                if (!response.IsSuccess)
                {
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact administrator.");
                    //return View(ic);
                    return Json(false);
                }
                //return RedirectToAction("Services");
                return Json(true);
            }
            return Json(true);
            //return RedirectToAction("Services");
        }

        #endregion
        #region Items
        public async Task<ActionResult> Items()
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.GetList<ItemVM>(
                baseUrl,
                "item",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        public async Task<ActionResult> EditItem(int id)
        {
            var db = new TgiDbContext();
            List<ServiceType> cList = db.ServiceTypes.ToList();
            ViewBag.CategoryList = new SelectList(cList, "Id", "Name");
            List<Item> iList = db.Items.ToList();
            ViewBag.ItemList = new SelectList(iList, "ItemId", "ItemName");
            List<ItemCategory> icList = db.ItemCategories.ToList();
            ViewBag.ItemICList = new SelectList(icList, "ItemCategoryId", "ItemCategoryName");
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<ItemVM>(
                baseUrl,
                "item",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            object ItmTypeIdValue = null;
            object o = records;
            string[] propertyNames = o.GetType().GetProperties().Select(p => p.Name).ToArray();
            foreach (var prop in propertyNames)
            {
                if (prop == "Id")
                {
                    ItmTypeIdValue = o.GetType().GetProperty(prop).GetValue(o, null);
                }
            }
            ViewBag.ItmTyp = ItmTypeIdValue;
            return View(records);
        }
        [HttpPost]
        public async Task<JsonResult> EditItem(int id, ItemVM ic)
        {
            var db = new TgiDbContext();
            List<ServiceType> cList = db.ServiceTypes.ToList();
            ViewBag.CategoryList = new SelectList(cList, "Id", "Name");
            List<Item> iList = db.Items.ToList();
            ViewBag.ItemList = new SelectList(iList, "ItemId", "ItemName");
            List<ItemCategory> icList = db.ItemCategories.ToList();
            ViewBag.ItemICList = new SelectList(icList, "ItemCategoryId", "ItemCategoryName");
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Put<ItemVM>(
                baseUrl,
                "Api",
                "/ItemApi",
                "Bearer",
                token.ToString(),
                ic, id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
                return Json(false);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            //return RedirectToAction("Items", records);
            return Json(true);
        }

        public ActionResult DeleteItem(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "/Api/");
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("ItemApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("Services");

                }
            }
            return RedirectToAction("Items");
        }

        public ActionResult CreateItem()
        {
            var db = new TgiDbContext();
            List<ServiceType> cList = db.ServiceTypes.ToList();
            ViewBag.CategoryList = new SelectList(cList, "Id", "Name");
            List<Item> iList = db.Items.ToList();
            ViewBag.ItemList = new SelectList(iList, "ItemId", "ItemName");
            List<ItemCategory> icList = db.ItemCategories.ToList();
            ViewBag.ItemICList = new SelectList(icList, "ItemCategoryId", "ItemCategoryName");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> CreateItem(ItemVM ic)
        {
            var db = new TgiDbContext();
            List<ServiceType> cList = db.ServiceTypes.ToList();
            ViewBag.CategoryList = new SelectList(cList, "Id", "Name");
            List<Item> iList = db.Items.ToList();
            ViewBag.ItemList = new SelectList(iList, "ItemId", "ItemName");
            List<ItemCategory> icList = db.ItemCategories.ToList();
            ViewBag.ItemICList = new SelectList(icList, "ItemCategoryId", "ItemCategoryName");
            var apiService = new ApiService();
            if (ModelState.IsValid)
            {
                var token = Session["AccessToken"];
                var response = await apiService.Post<ItemVM>(
                    baseUrl,
                    "Item",
                    "/Create",
                    "Bearer",
                    token.ToString(),
                    ic);
                if (!response.IsSuccess)
                {
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact administrator.");
                    //return View(ic);
                }
                return Json(true);
                //return RedirectToAction("Items");
            }

            return Json(false);
        }

        #endregion
        #region Service Type
        public async Task<ActionResult> ServiceTypes()
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.GetList<ServiceTypeVM>(
                baseUrl,
                "sType",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        public async Task<ActionResult> EditServiceType(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<ServiceTypeVM>(
                baseUrl,
                "sType",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        [HttpPost]
        public async Task<ActionResult> EditServiceType(int id, ServiceTypeVM ic)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Put<ServiceTypeVM>(
                baseUrl,
                "Api",
                "/ServiceTypeApi",
                "Bearer",
                token.ToString(),
                ic, id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return RedirectToAction("ServiceTypes", records);
        }

        public ActionResult DeleteItemServiceType(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "/Api/");
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("ServiceTypeApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("ServiceType");

                }
            }
            return RedirectToAction("ServiceType");
        }

        public ActionResult CreateServiceType()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> CreateServiceType(ServiceTypeVM ic)
        {
            var apiService = new ApiService();
            if (ModelState.IsValid)
            {
                var token = Session["AccessToken"];
                var response = await apiService.Post<ServiceTypeVM>(
                    baseUrl,
                    "ServiceType",
                    "/Create",
                    "Bearer",
                    token.ToString(),
                    ic);
                if (!response.IsSuccess)
                {
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact administrator.");
                    return View(ic);
                }
                return RedirectToAction("ServiceTypes");
            }

            return RedirectToAction("ServiceTypes");
        }

        #endregion
        #region Coupon

        public ActionResult Coupon()
        {
            var _db = new TgiDbContext();
            return View(_db.Coupons.ToList());
        }
        public ActionResult CreateCoupon()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult CreateCoupon(Coupon coupons, HttpPostedFileBase postedFile)
        {
            var _db = new TgiDbContext();
            if (ModelState.IsValid)
            {
                byte[] bytes;
                using(BinaryReader br = new BinaryReader(postedFile.InputStream))
                {
                    bytes = br.ReadBytes(postedFile.ContentLength);
                    _db.Coupons.Add(new Coupon
                    {                       
                        Picture = bytes
                    });
                }
                _db.Coupons.Add(coupons);
                _db.SaveChanges();
                return RedirectToAction("Coupon");
            }
            return View(coupons);
        }

        public ActionResult EditCoupon(int? id)
        {
            var _db = new TgiDbContext();
            if (id == null)
            {
                ViewBag.Message = "Not Found";
                return View();
            }
            var coupon = _db.Coupons.SingleOrDefault(m => m.Id == id);
            if (coupon == null)
            {
                ViewBag.Message = "Not Found";
                return View();
            }
            return View(coupon);
        }

        [HttpPost] 
        [ValidateAntiForgeryToken]
        public ActionResult EditCoupon(Coupon coupons, HttpPostedFileBase postedFile)
        {
            var _db = new TgiDbContext();
            if (coupons.Id == 0)
            {
                ViewBag.Message = "Not Found";
                return View();
            }

            var couponFromDb = _db.Coupons.Where(c => c.Id == coupons.Id).FirstOrDefault();

            if (ModelState.IsValid)
            {
                byte[] bytes;
                using (BinaryReader br = new BinaryReader(postedFile.InputStream))
                {
                    bytes = br.ReadBytes(postedFile.ContentLength);

                }
                couponFromDb.Picture = bytes;
            }
            couponFromDb.MinimumAmount = coupons.MinimumAmount;
            couponFromDb.Name = coupons.Name;
            couponFromDb.Discount = coupons.Discount;
            couponFromDb.CouponType = coupons.CouponType;
            couponFromDb.IsActive = coupons.IsActive;
            _db.SaveChanges();

            return RedirectToAction("Coupon");
        }

        //GET Delete Coupon
        public ActionResult DeleteCoupon(int? id)
        {
            var _db = new TgiDbContext();
            if (id == null)
            {
                ViewBag.Message = "Not Found";
                return View();
            }
            var coupon = _db.Coupons.SingleOrDefault(m => m.Id == id);
            if (coupon == null)
            {
                ViewBag.Message = "Not Found";
                return View();
            }
            return View(coupon);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteCoupon(int id)
        {
            var _db = new TgiDbContext();
            var coupons = _db.Coupons.SingleOrDefault(m => m.Id == id);
            _db.Coupons.Remove(coupons);
            _db.SaveChanges();
            return RedirectToAction("Coupon");
        }
        #endregion

        #region Manage Users
        public ActionResult CreateRole()
        {
            var role = new IdentityRole();
            return View(role);
        }
        [HttpPost]
        public ActionResult CreateRole(IdentityRole role)
        {
            var _db = new TgiDbContext();
            var roleExist = _db.Roles.Where(x => x.Name == role.Name).FirstOrDefault();
            if (roleExist == null)
            {
                _db.Roles.Add(role);
                _db.SaveChanges();
                return RedirectToAction("ViewRoles");
            }
            return View(role);

        }
        public ActionResult ViewRoles()
        {
            var _db = new TgiDbContext();
            var roles = _db.Roles.ToList();
            return View(roles);
        }

        [HttpGet]
        [AllowAnonymous]
        public ActionResult RoleAddToUser()
        {
            var _db = new TgiDbContext();
            ViewBag.Roles = new SelectList(_db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.Users = new SelectList(_db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            return View();
        }

        // POST: /Account/RegisterRole
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RoleAddToUser(UsersRolesVM model)
        {
            var _db = new TgiDbContext();
            ViewBag.Roles = new SelectList(_db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.Users = new SelectList(_db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            var userId = _db.Users.Where(i => i.UserName == model.User).Select(s => s.Id).FirstOrDefault();
            //string updateId = "";
            //foreach (var i in userId)
            //{
            //    updateId = i.ToString();
            //}
            // Assign role to user
            var userStore = new UserStore<ApplicationUser>(new TgiDbContext());
            var manager = new UserManager<ApplicationUser>(userStore);
            var result = await manager.AddToRoleAsync(userId, model.Role);
            if(result.Succeeded == true)
            {
                return RedirectToAction("RolesForUser", "Admin");
            }
            ViewBag.Message = "Failed to added role for user";
            return View(model);
        }
       // [Authorize(Roles ="SuperAdmin")]
        public ActionResult DeleteRoleForUser()
        {
            var _db = new TgiDbContext();
            ViewBag.Roles = new SelectList(_db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.Users = new SelectList(_db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");

            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteRoleForUser(UsersRolesVM model)
        {
            var _db = new TgiDbContext();
            ViewBag.Roles = new SelectList(_db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.Users = new SelectList(_db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(_db));

            ApplicationUser user = _db.Users.Where(u => u.UserName.Equals(model.User, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();

            if (manager.IsInRole(user.Id, model.Role))
            {
                manager.RemoveFromRole(user.Id, model.Role);
                _db.SaveChanges();
                return RedirectToAction("RolesForUser", "Admin");
            }

                ViewBag.ResultMessage = "This user doesn't belong to selected role.";
                return View("Index");
        }

        //[Authorize(Roles = "SuperAdmin")]
        public ActionResult RolesForUser()
        {
            var _db = new TgiDbContext();
            ViewBag.R = _db.Roles.Select(x => x.Name).ToList();

            ViewBag.Roles = new SelectList(_db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(_db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult RolesForUser(string UserName)
        {
            var _db = new TgiDbContext();
            if (!string.IsNullOrWhiteSpace(UserName))
            {
                ApplicationUser user = _db.Users.Where(u => u.UserName.Equals(UserName, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
                var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(_db));

                ViewBag.RolesForThisUser = manager.GetRoles(user.Id);//RolesForThisUser

                //// prepopulat roles for the view dropdown
                //var list = context.Roles.OrderBy(r => r.Name).ToList().Select(rr => new SelectListItem { Value = rr.Name.ToString(), Text = rr.Name }).ToList();
                //ViewBag.Roles = list;
                ViewBag.Roles = new SelectList(_db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
                ViewBag.UserName = new SelectList(_db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            }

            return View();
        }
        public ActionResult DeleteUser()
        {
            var _db = new TgiDbContext();
            ViewBag.UserName = new SelectList(_db.Users.ToList(), dataValueField: "Email", dataTextField: "UserName");
            return View();
        }
        [HttpPost]
        public async Task<JsonResult> DeleteUser(string email)
        {
            var _db = new TgiDbContext();
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(_db));

            var user = manager.Users.FirstOrDefault(x => x.Email == email);
            if (user == null) return null;
            var roles = await manager.GetRolesAsync(user.Id);

            foreach (var role in roles)
            {
                await manager.RemoveFromRolesAsync(user.Id, role);
            }

            var result = await manager.DeleteAsync(user); //here result has two properties Errors and Succeeded.
            if (result.Succeeded == true)
            {
                return Json(true);
            }
            else
            {
                return Json(false);
            }
        }
        #endregion
        #region Centers
        public async Task<ActionResult> Centers()
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.GetList<CentersVM>(
                baseUrl,
                "centers",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        public async Task<ActionResult> EditCenter(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<CentersVM>(
                baseUrl,
                "center",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        [HttpPost]
        public async Task<ActionResult> EditCenter(int id, CentersVM ic)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Put<CentersVM>(
                baseUrl,
                "Api",
                "/CentersApi",
                "Bearer",
                token.ToString(),
                ic, id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return RedirectToAction("Centers", records);
        }

        public ActionResult DeleteCenter(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "/Api/");
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("CentersApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("Centers");

                }
            }
            return RedirectToAction("Centers");
        }

        public ActionResult CreateCenter()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> CreateCenter(CentersVM ic)
        {
            var apiService = new ApiService();
            if (ModelState.IsValid)
            {
                var token = Session["AccessToken"];
                var response = await apiService.Post<CentersVM>(
                    baseUrl,
                    "Center",
                    "/Create",
                    "Bearer",
                    token.ToString(),
                    ic);
                if (!response.IsSuccess)
                {
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact administrator.");
                    return View(ic);
                }
                return RedirectToAction("Centers");
            }

            return RedirectToAction("Centers");
        }
        public async Task<ActionResult> CenterDetail(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<CentersVM>(
                baseUrl,
                "center",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        #endregion
        #region Location Extra
        public async Task<ActionResult> LocationExtraCharges()
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.GetList<LocationExtraVM>(
                baseUrl,
                "locationx",
                "/getlist",
                "Bearer",
                token.ToString());
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        public async Task<ActionResult> EditLocationExtraCharges(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<LocationExtraVM>(
                baseUrl,
                "locationx",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        [HttpPost]
        public async Task<ActionResult> EditLocationExtraCharges(int id, LocationExtraVM ic)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Put<LocationExtraVM>(
                baseUrl,
                "Api",
                "/LocationExtraChargesApi",
                "Bearer",
                token.ToString(),
                ic, id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return RedirectToAction("LocationExtraCharges", records);
        }

        public ActionResult DeleteLocationExtra(int id)
        {
            using (var client = new HttpClient())
            {
                client.BaseAddress = new Uri(baseUrl + "/Api/");
                //HTTP DELETE
                var deleteTask = client.DeleteAsync("LocationExtraChargesApi/" + id.ToString());
                deleteTask.Wait();
                var result = deleteTask.Result;
                if (result.IsSuccessStatusCode)
                {
                    return RedirectToAction("LocationExtraCharges");

                }
            }
            return RedirectToAction("LocationExtraCharges");
        }

        public ActionResult CreateLocationExtraCharges()
        {
            return View();
        }
        [HttpPost]
        public async Task<ActionResult> CreateLocationExtraCharges(LocationExtraVM ic)
        {
            var apiService = new ApiService();
            if (ModelState.IsValid)
            {
                var token = Session["AccessToken"];
                var response = await apiService.Post<LocationExtraVM>(
                    baseUrl,
                    "locationx",
                    "/Create",
                    "Bearer",
                    token.ToString(),
                    ic);
                if (!response.IsSuccess)
                {
                    ModelState.AddModelError(string.Empty, "Server Error. Please contact administrator.");
                    return View(ic);
                }
                return RedirectToAction("LocationExtraCharges");
            }

            return RedirectToAction("LocationExtraCharges");
        }
        public async Task<ActionResult> LocationExtraChargesDetail(int id)
        {
            bool result = false;
            var apiService = new ApiService();
            var token = Session["AccessToken"];
            var response = await apiService.Get<LocationExtraVM>(
                baseUrl,
                "locationx",
                "/getById",
                "Bearer",
                token.ToString(),
                id);
            if (!response.IsSuccess)
            {
                // Error Failed result
                result = false;
                var error = response.Message;
                ModelState.AddModelError(string.Empty, error);
            }

            // On Success result go to List
            string msg = response.Message;
            result = response.IsSuccess;
            //CustomerVM result = JsonConvert.DeserializeObject<CustomerVM>();
            records = response.Result;
            return View(records);
        }
        #endregion
    }
}