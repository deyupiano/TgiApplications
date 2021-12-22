using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TgiApplications.Models;

namespace TgiApplications.ViewModels
{
    public class OrderListViewModel
    {
        public IList<OrderDetailsViewModel> Orders { get; set; }
        public PagingInfo PagingInfo { get; set; }
    }
}
