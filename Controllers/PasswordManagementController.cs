using TgiApplications.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;

namespace TgiApplications.Controllers
{
    [Authorize(Roles = "Super Admin, Admin")]
    public class PasswordManagementController : Controller
    {
        //private DefaultConnection db = new DefaultConnection();


        //// GET: Tickets
        //public ActionResult ShowPassword()
        //{
        //    db.Configuration.ProxyCreationEnabled = false;
        //    var assets = db.PasswordHistories.OrderByDescending(x => x.Id).ToList();

        //    return Json(assets, JsonRequestBehavior.AllowGet);
        //}

        //// GET: PasswordManagement
        //public ActionResult Index()
        //{
        //    return View();
        //}

    }
}