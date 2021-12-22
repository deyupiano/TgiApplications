using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ServiceChargeVM
    {
        [Display(Name = "Id")]
        public int SChargesId { get; set; }
        [Display(Name = "Service")]
        public int ServiceId { get; set; }
        public string Duration { get; set; }
        [Display(Name = "Real_Charges")]
        public decimal RealCharge { get; set; }
        [Display(Name = "Discount")]
        public decimal ServiceDiscount { get; set; }
        [Display(Name = "Final_Charges")]
        public decimal NetCharges { get; set; }
        public string Location { get; set; }
        [Display(Name = "Extra_Charges")]
        public decimal LocationExtraCharges { get; set; }
        public string Service { get; set; }
        [Display(Name = "Service_Details")]
        public string ServiceDetails { get; set; }
    }
}