using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TgiApplications.OtherServices
{
    public class SmsProviderConnection
    {
        //public string Request = "https://api.infobip.com/sms/1/text/query?";
        public string Request = "http://api2.infobip.com/api/sendsms/plain?";
        public string ReportRequest = "https://api.infobip.com/sms/1/reports?limit=50";
        public string User = "deyupiano";
        public string Password = "@412515Ola";
        public string AuthToken = string.Empty;



        public string Token()
        {
            AuthToken = User + ":" + Password;
            return AuthToken;
        }


        public string Data(string mSender, string gsm, string smsText)
        {
            string type = "LongSMS";
            string data = ("username=" + (User + ("&password=" + (Password + ("&type=" + (type + ("&sender=" + (mSender + ("&GSM=" + (gsm + ("&SMSText=" + (smsText + ""))))))))))));
            return data;
        }
    }
}