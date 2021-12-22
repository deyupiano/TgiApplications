using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class CentersVM
    {
        public int Id { get; set; }
        public string CenterName { get; set; }
        public string CenterAddress { get; set; }
        public string CenterPhoneNo { get; set; }
        public string CenterManager { get; set; }
    }
}