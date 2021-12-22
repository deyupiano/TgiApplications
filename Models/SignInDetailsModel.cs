using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TgiApplications.Models
{
    public class SignInDetailsModel
    {

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public IList<string> Roles { get; set; }
    }
}
