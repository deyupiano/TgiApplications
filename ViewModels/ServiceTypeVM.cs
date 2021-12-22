using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ServiceTypeVM
    {
        [Display(Name = "Id")]
        public int Id { get; set; }
        [Display(Name = "ServiceType")]
        public string Name { get; set; }


    }
}