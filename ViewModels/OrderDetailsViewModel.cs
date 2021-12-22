using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TgiApplications.Models;

namespace TgiApplications.ViewModels
{
    public class OrderDetailsViewModel
    {
        public Order OrderHeader { get; set; }
        public List<OrderDetails> OrderDetails { get; set; }
    }
}
