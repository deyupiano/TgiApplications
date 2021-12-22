using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ItemCategoryVM
    {
        [Display(Name = "Id")]
        public int ItemCategoryId { get; set; }
        [Display(Name = "Name")]
        public string ItemCategoryName { get; set; }
    }
}