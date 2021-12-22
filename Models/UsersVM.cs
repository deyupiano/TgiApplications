using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TgiApplications.Models
{
    public class UsersVM
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public bool EmailConfirmed { get; set; }
        public string PasswordHash { get; set; }
        public string SecurityStamp { get; set; }
        public string PhoneNumber { get; set; }
        public bool PhoneNumberConfirmed { get; set; }
        public bool TwoFactorEnabled { get; set; }
        public Nullable<System.DateTime> LockoutEndDateUtc { get; set; }
        public bool LockoutEnabled { get; set; }
        public int AccessFailedCount { get; set; }
        public string UserName { get; set; }
        public string AgentId { get; set; }
        public string AgentCode { get; set; }
        public string Fullname { get; set; }
        public string Company { get; set; }
        public string op { get; set; }
        public string np { get; set; }
        public string Message { get; set; }
    }
}