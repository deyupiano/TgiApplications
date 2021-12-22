using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ServiceCategoryVM
    {
        [Display(Name = "Id")]
        public int ServiceCategoryId { get; set; }
        [Display(Name = "Name")]
        public string ServiceCategoryName { get; set; }
    }
}