
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class FeedBack 
    {
        [Key]
        public int SCId { get; set; }
        public string Type { get; set; }
        public string Comment { get; set; }
        public DateTime? DatetimePosted { get; set; }
        public string ResponseDetails { get; set; }
        public string ResponseStatus { get; set; }
        public int CustId { get; set; }
        [ForeignKey("CustId")]
        public virtual Customer Customer { get; set; }
    }
}
