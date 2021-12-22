
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class Payment 
    {
        [Key]
        public int PId { get; set; }

        [Required(ErrorMessage = "Customer Id is a required field.")]
        public int CustId { get; set; }
        public string UserId { get; set; }
        public decimal OrderTotal { get; set; }
        public decimal AmountPaid { get; set; }
        public decimal Balance { get; set; }
        public string PaymentMode { get; set; }
        public DateTime? PaymentDatetime { get; set; }
        public string OrderCode { get; set; }
        public string PaymentEvidence { get; set; }

        [ForeignKey("CustId")]
        public virtual Customer Customer { get; set; }

    }
}
