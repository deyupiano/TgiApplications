using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TgiApplications.Models
{
    public class PasswordHistoryVM
    {
        public int Id { get; set; }
        public string StaffName { get; set; }
        public string StaffRole { get; set; }
        public string DefaultPassword { get; set; }
        public string Num1 { get; set; }
        public string Num2 { get; set; }
        public string Num3 { get; set; }
        public string Num4 { get; set; }
        public string NewPassword { get; set; }
        public string UserId { get; set; }
        public Nullable<System.DateTime> DatePasswordChanged { get; set; }
        public string UserName { get; set; }
        public string AgentCode { get; set; }
        public string UserPhoneNo { get; set; }
    }
}