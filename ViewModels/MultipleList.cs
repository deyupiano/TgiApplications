using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TgiApplications.Models;

namespace TgiApplications.ViewModels
{
    public class MultipleList
    {
        public IEnumerable<Service> Service { get; set; }
        public IEnumerable<ServiceType> ServiceType { get; set; }
        public IEnumerable<ServiceCategory> ServiceCategory { get; set; }
        public IEnumerable<Item> Item { get; set; }
        public IEnumerable<ProgressStatus> ProgressStatus { get; set; }
        public IEnumerable<BizCenter> Center { get; set; }
        public IEnumerable<Customer> Customer { get; set; }
        public IEnumerable<LocationExtra> Location { get; set; }
        public IEnumerable<ItemCategory> ItemCat { get; set; }
    }
}