
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class PaymentType 
    {
        [Key]
        public int PTId { get; set; }
        public string PaymentMode { get; set; }
    }
}
