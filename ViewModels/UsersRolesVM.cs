using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TgiApplications.Models;

namespace TgiApplications.ViewModels
{
    public class UsersRolesVM

    {
        public string Role { get; set; }
        public string User { get; set; }

    }
}