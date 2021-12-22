using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class ServiceCategory
    {
        [Key]
        public int ServiceCategoryId { get; set; }
        public string ServiceCategoryName { get; set; }
    }
}
