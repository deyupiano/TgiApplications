using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TgiApplications.Models
{
    public class GetOptions
    {
        public int skip { get; set; }
        public int take { get; set; }

        public string searchOperation { get; set; }
        public string searchValue { get; set; }
        public string searchExpr { get; set; }
    }
}