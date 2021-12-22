using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace TgiApplications.Models
{
    public class OfflineOrder
    {
        [Key]
        public int Id { get; set; }
        public int? BizCenterId { get; set; }
        public int? CustId { get; set; }
        public int? StaffId { get; set; }
        public string CustomerPhoneNo { get; set; }
        public string OrderStatus { get; set; }
        public string CustomerEmail { get; set; }
        public DateTime OrderDate { get; set; }
        public string ItemColor { get; set; }
        public DateTime PickupDate { get; set; }
        public string ReferenceNo { get; set; }
        public int? ServiceTypeId { get; set; }
        public int? ServiceCategoryId { get; set; }
        public int? ItemId { get; set; }
        public int? ServiceId { get; set; }
        public double ServiceCharges { get; set; }
        public double LocationExtraCharges { get; set; }
        public int Quantity { get; set; }
        public double Price { get; set; }
        public double DiscountAmount { get; set; }
        public double Amount { get; set; }
        public double TotalAmount { get; set; }

        [ForeignKey("CustId")]
        public virtual Customer Customer { get; set; }
        [ForeignKey("ServiceTypeId")]
        public virtual ServiceType ServiceType { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }
        [ForeignKey("ServiceCategoryId")]
        public virtual ServiceCategory ServiceCategory { get; set; }
        [ForeignKey("ServiceId")]
        public virtual Service Service { get; set; }
        [ForeignKey("StaffId")]
        public virtual Customer Staff { get; set; }

        [ForeignKey("BizCenterId")]
        public virtual BizCenter BizCenter { get; set; }

    }
}