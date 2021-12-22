
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class Order 
    {
        [Display(Name = "Order Id")]
        [Key]
        [Required]
        public int OrderId { get; set; }
        public string UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual ApplicationUser ApplicationUser { get; set; }
     
        [Display(Name = "Customer Id")]
        public int? CustId { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Order Reference Code")]
        public string OrderCode { get; set; }
        [Required]
        public double OrderTotalOriginal { get; set; }

        [Required]
        [DisplayFormat(DataFormatString = "{0:C}")]
        [Display(Name = "Order Total")]
        public double OrderTotal { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Item Id")]
        public int? ItemId { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Order Date")]
        public DateTime? OrderDate { get; set; }

        [Required]
        [Display(Name = "Delivery Date")]
        public DateTime? DeliveryDateTime { get; set; }
        [Required]
        [Display(Name = "Pickup Time")]
        public DateTime PickUpTime { get; set; }

        [Required]
        [NotMapped]
        public DateTime PickUpDate { get; set; }
        [Display(Name = "Coupon Code")]
        public string CouponCode { get; set; }
        public double CouponCodeDiscount { get; set; }
        public string Status { get; set; }
        public string PaymentStatus { get; set; }
        public string Comments { get; set; }
        [Display(Name = "Pickup Name")]
        public string PickupName { get; set; }

        [Display(Name = "Phone Number")]
        public string PhoneNumber { get; set; }

        public string TransactionId { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Pickup City")]
        public string PickupCity { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Pickup Address")]
        public string PickupAddress { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Delivery City")]
        public string DeliveryCity { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Delivery Address")]
        public string DeliveryAddress { get; set; }
        [ForeignKey("CustId")]
        public virtual Customer Customer { get; set; }

    }
}