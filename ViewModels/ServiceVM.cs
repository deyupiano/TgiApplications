using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ServiceVM
    {
        [Display(Name = "Id")]
        public int ServiceId { get; set; }
        [Display(Name = "Service_Item")]
        public int ItemId { get; set; }
        [Display(Name = "Name")]
        public string ServiceName { get; set; }
        [Display(Name = "Image")]
        public string ServiceImage { get; set; }
        [Display(Name = "Category")]
        public int? ServiceCategoryId { get; set; }
        [Display(Name = "Description")]
        public string ServiceDescription { get; set; }
        [Display(Name = "Category")]
        public string Category { get; set; }
        [Display(Name = "Service_Details")]
        public string ServiceDetails { get; set; }
        [Display(Name = "Service Type")]
        public int? Id { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = " Price should be greater than ${1}")]
        public double Price { get; set; }
        public string ServiceItem { get; set; }
        [Display(Name = "Service Type")]
        public string SType { get; set; }
    }
}