
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class Business 
    {
        [Key]
        public int BId { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [MaxLength(1000, ErrorMessage = "Can not exceed 1000 charaters")]
        public string BizName { get; set; }

        [Required(ErrorMessage = "This is a required field")]
        [MaxLength(50, ErrorMessage = "Can not exceed 50 charaters")]
        public string Email { get; set; }


        [MaxLength(50, ErrorMessage = "Can not exceed 50 charaters")]
        public string Website { get; set; }

        [MaxLength(250, ErrorMessage = "Can not exceed 250 charaters")]
        public string Address { get; set; }

    }
}
