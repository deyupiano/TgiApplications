using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TgiApplications.Models;

namespace TgiApplications.ViewModels
{
    public class IndexViewModel
    {
        public IEnumerable<Service> Service { get; set; }
        public IEnumerable<ServiceCategory> ServiceCategory { get; set; }
        public IEnumerable<Coupon> Coupon { get; set; }

    }
}