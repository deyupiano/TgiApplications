using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ItemVM
    {
        [Display(Name = "Id")]
        public int ItemId { get; set; }
        [Display(Name = "ItemCategoryId")]
        public int ItemCategoryId { get; set; }
        [Display(Name = "Name")]
        public string ItemName { get; set; }
        [Display(Name = "Image")]
        public string ItemImage { get; set; }
        [Display(Name = "Service Category")]
        public int? Id { get; set; }
        [Display(Name = "Description")]
        public string ItemDescription { get; set; }
        [Display(Name = "Service Category")]
        public string SCategory { get; set; }
        [Display(Name = "Item Category")]
        public string ICategory { get; set; }
    }
}