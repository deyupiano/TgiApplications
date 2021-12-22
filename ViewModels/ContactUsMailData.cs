using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TgiApplications.ViewModels
{
    public class ContactUsMailData
    {
        public string Fullname { get; set; }
        public string PhoneNumber { get; set; }
        public string EmailSender { get; set; }
        public string EmailRecipient { get; set; }
        public string MailSubject { get; set; }
        public string MailBody { get; set; }
    }
}