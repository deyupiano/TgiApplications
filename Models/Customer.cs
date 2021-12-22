
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class Customer 
    {
        [Key]
        public int CustId { get; set; }
        [MaxLength(250, ErrorMessage = "Maximum length is 200 characters.")]
        public string UserId { get; set; }
        //[Required(ErrorMessage = "Full Name is a required field.")]
        [MaxLength(250, ErrorMessage = "Maximum length is 200 characters.")]
        public string Fullname { get; set; }
        //[Required(ErrorMessage = "Address1 is a required field.")]
        [MaxLength(500, ErrorMessage = "Maximum length is 500 characters.")]
        public string Address1 { get; set; }

        [MaxLength(500, ErrorMessage = "Maximum length is 500 characters.")]
        public string Address2 { get; set; }

        [MaxLength(500, ErrorMessage = "Maximum length is 500 characters.")]
        public string AddressDescription { get; set; }

        [MaxLength(200, ErrorMessage = "Maximum length is 200 characters.")]
        public string Email { get; set; }

        ////[Required(ErrorMessage = "Phone number is a required field.")]
        [MaxLength(200, ErrorMessage = "Maximum length is 200 characters.")]
        public string PhoneNumber { get; set; }

        [MaxLength(200, ErrorMessage = "Maximum length is 200 characters.")]
        public string WhatsappNumber { get; set; }

        [MaxLength(50, ErrorMessage = "Maximum length is 200 characters.")]
        public string StateOfResidence { get; set; }
        //[Required(ErrorMessage = "LGA is a required field.")]
        [MaxLength(50, ErrorMessage = "Maximum length is 200 characters.")]
        public string LGA { get; set; }
        //[Required(ErrorMessage = "Nearest bus stop is a required field.")]
        [MaxLength(50, ErrorMessage = "Maximum length is 200 characters.")]
        public string NearestBusStop { get; set; }
        //[Required(ErrorMessage = "Customer mode is a required field.")]
        [MaxLength(50, ErrorMessage = "Maximum length is 200 characters.")]
        public string CustomerMode { get; set; }
        //[Required]
        //[StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 4)]
        [DataType(DataType.Password)]
        public string Password { get; set; }
        public DateTime? StartDate { get; set; }
        public string DateOfBirth { get; set; }
        public DateTime? EndDate { get; set; }
        public string Company { get; set; }
        public string RegisteredAs { get; set; }
        public string UniqueId { get; set; }
        public string Gender { get; set; }
        public string Passport { get; set; }
    }
}
