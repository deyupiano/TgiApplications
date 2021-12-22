
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class OrderServiceTracker
    {
        [Key]
        public int TrackerId { get; set; }
        public int CustId { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Order Reference Code")]
        public string OrderCode { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Order Progess")]
        public string OrderProgess { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Order Status")]
        public string OrderStatus { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Staff In Charge ")]
        public string StaffInCharge { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [Display(Name = "Staff Contact")]
        public string StaffContact { get; set; }
        public string ProccessDetails { get; set; }
        public DateTime? ModifiedDate { get; set; }
        [ForeignKey("CustId")]
        public virtual Customer Customer { get; set; }

    }
}
