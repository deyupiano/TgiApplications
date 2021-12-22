using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class Item
    { 
        [Key]
        public int ItemId { get; set; }
        public string ItemName { get; set; }
        public string ItemImage { get; set; }
        public int? Id { get; set; }
        public int? ItemCategoryId { get; set; }
        public string ItemDescription { get; set; }
        [ForeignKey("Id")]
        public virtual ServiceType ServiceType { get; set; }

        [ForeignKey("ItemCategoryId")]
        public virtual ItemCategory ItemCategory { get; set; }

    }
}
