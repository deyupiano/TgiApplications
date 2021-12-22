
using Microsoft.Owin.Security.DataProtection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TgiApplications.Security
{
    public class CustomIDataProtection
    {
        private readonly IDataProtector protector;

        public CustomIDataProtection(IDataProtectionProvider dataProtectionProvider, UniqueCode uniqueCode)
        {
            protector = dataProtectionProvider.Create(uniqueCode.RouteValue);
        }

        public string Decode(byte[] data)
        {
            return protector.Protect(data).ToString();
        }

        public string Encode(byte[] data)
        {
            return protector.Unprotect(data).ToString();
        }
    }
}

