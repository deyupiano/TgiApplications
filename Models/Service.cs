using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class Service
    {
        [Key]
        [Display(Name = "Id")]
        public int ServiceId { get; set; }
        [Display(Name = "Service")]
        public string ServiceName { get; set; }
        [Display(Name = "Item")]
        public int ItemId { get; set; }
        [Display(Name = "Category")]
        public int? ServiceCategoryId { get; set; }
        [Display(Name = "Description")]
        public string ServiceDescription { get; set; }
        [Range(1, int.MaxValue, ErrorMessage = " Price should be greater than ${1}")]
        public double Price { get; set; }
        public string ServiceItem { get; set; }

        [Display(Name = "Service Type")]
        public int? Id { get; set; }

        public string Image { get; set; }
        [ForeignKey("Id")]
        public virtual ServiceType ServiceType { get; set; }

        [ForeignKey("ServiceCategoryId")]
        public virtual ServiceCategory ServiceCategory { get; set; }

        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }

    }
}
