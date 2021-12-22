using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.Models
{
    public class BizCenter
    {
        [Key]
        public int Id { get; set; }
        public string CenterName { get; set; }
        public string CenterAddress { get; set; }
        public string CenterPhoneNo { get; set; }
        public string CenterManager { get; set; }
    }
}