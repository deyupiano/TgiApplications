using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class ItemCost
    {
        [Key]
        public int ICostId { get; set; }
        public int? ItemId { get; set; }
        public int Quantity { get; set; }
        public decimal RealCost { get; set; }
        public decimal ItemDiscount { get; set; }
        public decimal Cost { get; set; }
        public string Location { get; set; }
        [ForeignKey("ItemId")]
        public virtual Item Item { get; set; }

    }
}
