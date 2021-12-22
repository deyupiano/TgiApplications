using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using TgiApplications.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace TgiApplications.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class RolesController : Controller
    {
        TgiDbContext db;
        private ApplicationUserManager _userManager;

        public RolesController()
        {
            db = new TgiDbContext();
        }
        public RolesController(ApplicationUserManager userManager,
         ISecureDataFormat<AuthenticationTicket> accessTokenFormat)
        {
            UserManager = userManager;
            AccessTokenFormat = accessTokenFormat;
        }
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        public ISecureDataFormat<AuthenticationTicket> AccessTokenFormat { get; private set; }
        // GET: /Account/RegisterRole
        [HttpGet]
        [Authorize(Roles = "Super Admin")]
        public ActionResult RegisterRole()
        {

            ViewBag.Name = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            return View();
        }
        //
        // POST: /Roles/RegisterRole
        [HttpPost]
        [Authorize(Roles = "Super Admin")]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> RegisterRole(RegisterModel model, ApplicationUser user)
        {
            ViewBag.Name = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            var userId = db.Users.Where(i => i.UserName == user.UserName).Select(s => s.Id);
            string updateId = "";
            foreach (var i in userId)
            {
                updateId = i.ToString();
            }
            // Assign role to user
            await this.UserManager.AddToRoleAsync(updateId, model.UserName);
            return Redirect("/Roles/Index");
        }


        // GET: All Roles
        [Authorize(Roles = "Super Admin")]
        public ActionResult Index()
        {
            ViewBag.R = db.Roles.Select(x=>x.Name).ToList();

            ViewBag.Roles = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            return View();
        }
        public ActionResult GetRoles()
        {
            ViewBag.Roles = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            return PartialView();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Index(string UserName)
        {
            if (!string.IsNullOrWhiteSpace(UserName))
            {
                ApplicationUser user = db.Users.Where(u => u.UserName.Equals(UserName, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();
                var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));

                ViewBag.RolesForThisUser = manager.GetRoles(user.Id);

                //// prepopulat roles for the view dropdown
                //var list = context.Roles.OrderBy(r => r.Name).ToList().Select(rr => new SelectListItem { Value = rr.Name.ToString(), Text = rr.Name }).ToList();
                //ViewBag.Roles = list;
                ViewBag.Roles = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
                ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            }

            return View("Index");
        }
        // CREATE NEW ROLE
        [Authorize(Roles = "Super Admin")]
        [HttpGet]
        public ActionResult Create()
        {

            ViewBag.Roles = db.Roles.Select(x => x.Name).ToList();
            return View();
        }

        [HttpPost]
        public ActionResult Create(IdentityRole role)
        {
            if (ModelState.IsValid)
            {
                db.Roles.Add(role);
                db.SaveChanges();
            }

            return RedirectToAction("Create");
        }
        public ActionResult ManageUsers()
        {
            // prepopulat roles for the view dropdown
            //var list = context.Roles.OrderBy(r => r.Name).ToList().Select(rr =>
            //new SelectListItem { Value = rr.Name.ToString(), Text = rr.Name }).ToList();
            //ViewBag.Roles = list;
            ViewBag.Roles = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            return View();
        }
        public ActionResult DeleteRoleForUser()
        {
            ViewBag.Roles = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");

            return View();
        }
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteRoleForUser(string UserName, string RoleName)
        {
            ViewBag.Roles = new SelectList(db.Roles.ToList(), dataValueField: "Name", dataTextField: "Name");
            ViewBag.UserName = new SelectList(db.Users.ToList(), dataValueField: "UserName", dataTextField: "UserName");
            var manager = new ApplicationUserManager(new UserStore<ApplicationUser>(db));

            ApplicationUser user = db.Users.Where(u => u.UserName.Equals(UserName, StringComparison.CurrentCultureIgnoreCase)).FirstOrDefault();

            if (manager.IsInRole(user.Id, RoleName))
            {
                manager.RemoveFromRole(user.Id, RoleName);
                db.SaveChanges();
                ViewBag.ResultMessage = "Role removed from this user successfully !";
            }
            else
            {
                ViewBag.ResultMessage = "This user doesn't belong to selected role.";
            }

            return View("Index");
        }
    }
}