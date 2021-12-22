using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TgiApplications.Models;

namespace TgiApplications.ViewModels
{
    public class OrderDetailsCart
    {
        public List<ShoppingCart> listCart { get; set; }
        public Order OrderHeader { get; set; }
    }
}