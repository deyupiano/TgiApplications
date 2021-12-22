using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class LocationExtra
    {
        [Key]
        public int ExtraId { get; set; }
        public string Location { get; set; }
        public int Charges { get; set; }
      
    }
}
