using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class CustomerVM
    {
        public int CustId { get; set; }
        public string UserId { get; set; }
        public string Fullname { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }
        public string AddressDescription { get; set; }
        [RegularExpression("\\w+([-+.']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*", ErrorMessage = "Please enter a valid email address.")]
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
        public string WhatsappNumber { get; set; }
        public string StateOfResidence { get; set; }
        public string LGA { get; set; }
        public string NearestBusStop { get; set; }
        public string CustomerMode { get; set; }
        public string Password { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public string Company { get; set; }
        public string RegisteredAs { get; set; }
        public string DateOfBirth { get; set; }
        public string Message { get; set; }
        public string UniqueId { get; set; }
        public string Gender { get; set; }
        public string Passport { get; set; }
        public bool IsSuccess { get; set; }
    }
}