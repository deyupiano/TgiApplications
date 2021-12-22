using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TgiApplications.Models;

namespace TgiApplications.ViewModels
{

    public class ServiceMenuItemVM
    {
        public Service Service { get; set; }
        public IEnumerable<ServiceCategory> ServiceCategory { get; set; }
        public IEnumerable<Item> Item { get; set; }
    }
}