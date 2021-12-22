using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class ServiceCharge
    {
        [Key]
        public int SChargesId { get; set; }
        public int ServiceId { get; set; }
        public string Duration { get; set; }
        public decimal RealCharge { get; set; }
        public decimal ServiceDiscount { get; set; }
        public decimal NetCharges { get; set; }
        public string Location { get; set; }
        public decimal LocationExtraCharges { get; set; }
        [ForeignKey("ServiceId")]
        public virtual Service Service { get; set; }
    }
}
