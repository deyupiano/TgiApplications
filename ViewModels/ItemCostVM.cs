using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ItemCostVM
    {
        [Display(Name = "Id")]
        public int ICostId { get; set; }
        [Display(Name = "Item")]
        public int? ItemId { get; set; }
        public int Quantity { get; set; }
        [Display(Name = "Real_Cost")]
        public decimal RealCost { get; set; }
        [Display(Name = "Discount")]
        public decimal ItemDiscount { get; set; }
        public decimal Cost { get; set; }
        public string Location { get; set; }
        public string Item { get; set; }
    }
}