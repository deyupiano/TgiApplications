using System.Collections;
using System.Collections.Generic;
using TgiApplications.ViewModels;

namespace TgiApplications.Models
{
    public class ApiResponse
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public List<CustomerVM> Result { get; set; }
    }
}
