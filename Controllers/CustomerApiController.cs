using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TgiApplications.Models;
using TgiApplications.OtherServices;
using TgiApplications.ViewModels;

namespace TgiApplications.Controllers
{
    public class CustomerApiController : ApiController
    {
        private ApplicationUserManager _userManager;
        //private readonly TgiDbContext db = new TgiDbContext();

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
        public string userName = "";
        public string userId = "";
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[Authorize]
        [Route("person/getList")]
        // GET: api/CustomersApi
        public IQueryable<CustomerVM> GetCustomers([FromUri] GetOptions options = null)
        {
            var db = new TgiDbContext();
            var customers = from r in db.Customers//.Where(x=>x.CustomerName == userName)

                            orderby r.CustId descending
                            select new CustomerVM
                            {
                                CustId = r.CustId,
                                UserId = r.UserId,
                                Fullname = r.Fullname,
                                Address1 = r.Address1,
                                Address2 = r.Address2,
                                AddressDescription = r.AddressDescription,
                                Email = r.Email,
                                PhoneNumber = r.PhoneNumber,
                                WhatsappNumber = r.WhatsappNumber,
                                StateOfResidence = r.StateOfResidence,
                                LGA = r.LGA,
                                CustomerMode = r.CustomerMode,
                                UniqueId = r.UniqueId,
                                RegisteredAs = r.RegisteredAs,
                                Gender = r.Gender,
                                DateOfBirth = r.DateOfBirth,
                                Password = r.Password,
                                Passport = r.Passport,
                                Company = r.Company
                            };
            if (options != null)
            {
                customers = customers.Skip(options.skip);
                if (options.take > 0)
                    customers = customers.Take(options.take);
            };

            return customers;
        }

        // GET: api/CustomerApi/5
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[Authorize]

        [ResponseType(typeof(void))]
        [Route("person/getById/{id:int}")]
        public async Task<IHttpActionResult> GetCustomer(int id)
        {
            var db = new TgiDbContext();
            Customer customer = await db.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // PUT: api/CustomerApi/5
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[Authorize(Roles = "SuperAdmin")]
        [ResponseType(typeof(void))]
        //[Route("person/update")]
        public async Task<IHttpActionResult> PutCustomer(int id, CustomerVM customer)
        {
            var db = new TgiDbContext();
            var existingData = db.Customers.Where(x => x.CustId == id).FirstOrDefault();
            
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != customer.CustId)
            {
                return BadRequest();
            }
            if(customer.Passport == null || customer.Passport == "")
            {
                existingData.Address1 = customer.Address1;
                existingData.Address2 = customer.Address2;
                existingData.AddressDescription = customer.AddressDescription;
                existingData.Company = customer.Company;
                existingData.CustId = customer.CustId;
                existingData.CustomerMode = customer.CustomerMode;
                existingData.DateOfBirth = customer.DateOfBirth;
                existingData.Email = customer.Email;
                existingData.EndDate = customer.EndDate;
                existingData.Fullname = customer.Fullname;
                existingData.Gender = customer.Gender;
                existingData.LGA = customer.LGA;
                existingData.NearestBusStop = customer.NearestBusStop;
                existingData.Passport = existingData.Passport;
                existingData.Password = customer.Password;
                existingData.PhoneNumber = customer.PhoneNumber;
                existingData.RegisteredAs = customer.RegisteredAs;
                existingData.StartDate = existingData.StartDate;
                existingData.StateOfResidence = customer.StateOfResidence;
                existingData.UniqueId = customer.UniqueId;
                existingData.UserId = customer.UserId;
                existingData.WhatsappNumber = customer.WhatsappNumber;
            }
            else
            {
                string newName = "";
                if (isThereSpace(customer.Fullname) == true)
                {
                    newName = customer.Fullname.Replace(" ", "_");
                }
                else
                {
                    newName = customer.Fullname;
                }
                string extension = ImageProcessing.UploadedImages(customer.Passport, newName);
                var filePath = newName + extension;
                existingData.Address1 = customer.Address1;
                existingData.Address2 = customer.Address2;
                existingData.AddressDescription = customer.AddressDescription;
                existingData.Company = customer.Company;
                existingData.CustId = customer.CustId;
                existingData.CustomerMode = customer.CustomerMode;
                existingData.DateOfBirth = customer.DateOfBirth;
                existingData.Email = customer.Email;
                existingData.EndDate = customer.EndDate;
                existingData.Fullname = customer.Fullname;
                existingData.Gender = customer.Gender;
                existingData.LGA = customer.LGA;
                existingData.NearestBusStop = customer.NearestBusStop;
                existingData.Passport = filePath;
                existingData.Password = customer.Password;
                existingData.PhoneNumber = customer.PhoneNumber;
                existingData.RegisteredAs = customer.RegisteredAs;
                existingData.StartDate = existingData.StartDate;
                existingData.StateOfResidence = customer.StateOfResidence;
                existingData.UniqueId = customer.UniqueId;
                existingData.UserId = customer.UserId;
                existingData.WhatsappNumber = customer.WhatsappNumber;
            }
           
            try
            {
                db.Entry(existingData).State = EntityState.Modified;
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CustomerExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return Ok(customer);
        }

        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[Authorize(Roles = "SuperAdmin, Admin, Manager")]
        [Route("person/Create")]
        // POST: api/BulkInsert/BulkUpdate
        [ResponseType(typeof(void))]
        [HttpPost]
        public async Task<IHttpActionResult> PostBulkPerson(List<CustomerVM> persons)
        {
            var Resp = new Response();
            Boolean result = false;
            object res = "false";
            var db = new TgiDbContext();
            string message = "FAILED TO CREATE ACCOUNT";

            if (!ModelState.IsValid)
            {
                result = false;
                return BadRequest(ModelState);
            }


            if (HttpContext.Current != null && HttpContext.Current.User != null
                    && HttpContext.Current.User.Identity.Name != null)
            {
                string loginUserName = HttpContext.Current.User.Identity.Name;
                string loginUserId = HttpContext.Current.User.Identity.GetUserId();

            }
            var customer = new Customer();
            string regMode = "";
            if(persons != null)
            {
                foreach (var person in persons)
                {
                    regMode = person.CustomerMode;
                    if (regMode == "ONLINE")
                    {
                        try
                        {
                            //check if user exsist and create web account first
                            var user = db.Users.Where(m => m.Email == person.Email && m.UserName == person.Fullname).FirstOrDefault();
                            string frn = "";
                            string lsn = "";
                            if (user == null)
                            {
                                if (isThereSpace(person.Fullname) == true)
                                {
                                    var fln = person.Fullname.Split(' ');
                                    frn = fln[0];
                                    lsn = fln[1];
                                    string lastCustomerId = "";
                                    string lastStaffId = "";
                                    var userId = await CreateWebUser(person.Email, person.Password, frn, lsn, person.PhoneNumber, person.Company, person.RegisteredAs);
                                    if (userId != "")
                                    {
                                        lastCustomerId = db.Customers.OrderByDescending(x => x.CustId).Where(x => x.RegisteredAs == "CUSTOMER").Select(x => x.UniqueId).FirstOrDefault();
                                        lastStaffId = db.Customers.OrderByDescending(x => x.CustId).Where(x => x.RegisteredAs == "STAFF").Select(x => x.UniqueId).FirstOrDefault();
                                        customer.UserId = userId;
                                        customer.WhatsappNumber = person.WhatsappNumber;
                                        customer.PhoneNumber = person.PhoneNumber;
                                        customer.Password = person.Password;
                                        customer.Fullname = person.Fullname.ToUpper();

                                        if (person.RegisteredAs.Contains("Staff") == true || person.RegisteredAs.Contains("Manager") == true)
                                        {
                                            customer.Email = frn.ToLower() + "." + lsn.ToLower() + "@tolbeelglobalinvestment.com";
                                        }
                                        else
                                        {
                                            customer.Email = person.Email;
                                        }
                                        customer.DateOfBirth = person.DateOfBirth;
                                        customer.StartDate = DateTime.Now;
                                        customer.EndDate = null;
                                        customer.CustomerMode = regMode;
                                        customer.Address1 = person.Address1;
                                        customer.Address2 = person.Address2;
                                        customer.AddressDescription = person.AddressDescription;
                                        customer.Company = person.Company;
                                        customer.LGA = person.LGA;
                                        customer.NearestBusStop = person.NearestBusStop;
                                        customer.StateOfResidence = person.StateOfResidence;
                                        customer.RegisteredAs = person.RegisteredAs;
                                        customer.Gender = person.Gender;
                                        if (person.RegisteredAs == "LaundryStaff" || person.RegisteredAs == "LogisticsStaff" || person.RegisteredAs == "SchoolStaff")
                                        {
                                            if (lastStaffId != null)
                                            {
                                                var lastId = lastStaffId.Split('/');
                                                customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                            }
                                            else
                                            {
                                                customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/1";
                                            }
                                        }
                                        else if (person.RegisteredAs == "LaundryManager" || person.RegisteredAs == "LogisticsManager" || person.RegisteredAs == "SchoolManager")
                                        {
                                            if (lastStaffId != null)
                                            {
                                                var lastId = lastStaffId.Split('/');
                                                customer.UniqueId = "MGR/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                            }
                                            else
                                            {
                                                customer.UniqueId = "MGR/" + DateTime.Now.Year.ToString() + "/1";
                                            }
                                        }
                                        else if (person.RegisteredAs == "LaundryCustomer" || person.RegisteredAs == "LogisticsCustomer")
                                        {
                                            if (lastCustomerId != null)
                                            {
                                                var lastId = lastCustomerId.Split('/');
                                                customer.UniqueId = "CUS/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                            }
                                            else
                                            {
                                                customer.UniqueId = "CUS/" + DateTime.Now.Year.ToString() + "/1";
                                            }
                                        }
                                        else if (person.RegisteredAs == "Lecturer")
                                        {
                                            if (lastCustomerId != null)
                                            {
                                                var lastId = lastCustomerId.Split('/');
                                                customer.UniqueId = "LEC/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                            }
                                            else
                                            {
                                                customer.UniqueId = "LEC/" + DateTime.Now.Year.ToString() + "/1";
                                            }
                                        }
                                        else if (person.RegisteredAs == "Student")
                                        {
                                            if (lastCustomerId != null)
                                            {
                                                var lastId = lastCustomerId.Split('/');
                                                customer.UniqueId = "STD/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                            }
                                            else
                                            {
                                                customer.UniqueId = "STD/" + DateTime.Now.Year.ToString() + "/1";
                                            }
                                        }
                                        else
                                        {
                                            if (lastStaffId != null)
                                            {
                                                var lastId = lastStaffId.Split('/');
                                                customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                            }
                                            else
                                            {
                                                customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/1";
                                            }
                                        }

                                        db.Customers.Add(customer);
                                        try
                                        {
                                            await db.SaveChangesAsync();
                                            message = "SUCCESSFULLY CREATED";
                                            var allRecords = db.Customers.ToList();
                                            Resp = new Response { IsSuccess = true, Message = message, Result = allRecords };

                                        }
                                        catch (Exception ex)
                                        {

                                            ex.ToString();
                                        }
                                        person.Message = message;
                                        result = true;
                                    }

                                }
                            }
                        }
                        catch (DbUpdateException ex)
                        {

                            if (CustomerExists(person.CustId))
                            {
                                return Conflict();
                            }
                            else
                            {
                                ex.ToString();
                            }
                        }


                    }
                    else
                    {
                        try
                        {
                            string frn = "";
                            string lsn = "";

                            if (isThereSpace(person.Fullname) == true)
                            {
                                var fln = person.Fullname.Split(' ');
                                frn = fln[0];
                                lsn = fln[1];
                                customer.UserId = "";
                                var lastCustomerId = db.Customers.OrderByDescending(x => x.CustId).Select(x => x.UniqueId).FirstOrDefault();
                                var lastStaffId = db.Customers.OrderByDescending(x => x.CustId).Select(x => x.UniqueId).FirstOrDefault();
                                if (person.RegisteredAs == "LaundryStaff" || person.RegisteredAs == "LogisticsStaff" || person.RegisteredAs == "SchoolStaff")
                                {
                                    if (lastStaffId != null)
                                    {
                                        var lastId = lastStaffId.Split('/');
                                        customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                    }
                                    else
                                    {
                                        customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/1";
                                    }
                                }
                                else if (person.RegisteredAs == "LaundryManager" || person.RegisteredAs == "LogisticsManager" || person.RegisteredAs == "SchoolManager")
                                {
                                    if (lastStaffId != null)
                                    {
                                        var lastId = lastStaffId.Split('/');
                                        customer.UniqueId = "MGR/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                    }
                                    else
                                    {
                                        customer.UniqueId = "MGR/" + DateTime.Now.Year.ToString() + "/1";
                                    }
                                }
                                else if (person.RegisteredAs == "LaundryCustomer"|| person.RegisteredAs == "LogisticsCustomer" )
                                {
                                    if (lastCustomerId != null)
                                    {
                                        var lastId = lastCustomerId.Split('/');
                                        customer.UniqueId = "CUS/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                    }
                                    else
                                    {
                                        customer.UniqueId = "CUS/" + DateTime.Now.Year.ToString() + "/1";
                                    }
                                }
                                else if (person.RegisteredAs == "Lecturer")
                                {
                                    if (lastCustomerId != null)
                                    {
                                        var lastId = lastCustomerId.Split('/');
                                        customer.UniqueId = "LEC/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                    }
                                    else
                                    {
                                        customer.UniqueId = "LEC/" + DateTime.Now.Year.ToString() + "/1";
                                    }
                                }
                                else if (person.RegisteredAs == "Student")
                                {
                                    if (lastCustomerId != null)
                                    {
                                        var lastId = lastCustomerId.Split('/');
                                        customer.UniqueId = "STD/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                    }
                                    else
                                    {
                                        customer.UniqueId = "STD/" + DateTime.Now.Year.ToString() + "/1";
                                    }
                                }
                                else
                                {
                                    if (lastStaffId != null)
                                    {
                                        var lastId = lastStaffId.Split('/');
                                        customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                    }
                                    else
                                    {
                                        customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/1";
                                    }
                                }
                                
                                customer.WhatsappNumber = person.WhatsappNumber;
                                customer.PhoneNumber = person.PhoneNumber;
                                customer.Password = person.Password;
                                customer.Fullname = person.Fullname.ToUpper();

                                if (customer.RegisteredAs == "STAFF")
                                {
                                    customer.Email = frn.ToLower() + "." + lsn.ToLower() + "@tolbeelglobalinvestment.com";
                                }
                                else
                                {
                                    customer.Email = person.Email;
                                }
                                customer.Email = person.Email.ToLower();
                                customer.DateOfBirth = person.DateOfBirth;
                                customer.StartDate = DateTime.Now;
                                customer.EndDate = null;
                                customer.CustomerMode = regMode;
                                customer.Address1 = person.Address1;
                                customer.Address2 = person.Address2;
                                customer.AddressDescription = person.AddressDescription;
                                customer.Company = person.Company;
                                customer.LGA = person.LGA;
                                customer.NearestBusStop = person.NearestBusStop;
                                customer.StateOfResidence = person.StateOfResidence;
                                db.Customers.Add(customer);
                                await db.SaveChangesAsync();
                                message = "SUCCESSFULLY CREATED";
                                var allRecords = db.Customers.ToList();
                                Resp = new Response { IsSuccess = true, Message = message, Result = allRecords };

                                person.Message = message;
                                result = true;
                            }

                        }
                        catch (DbUpdateException ex)
                        {
                            if (CustomerExists(person.CustId))
                            {
                                return Conflict();
                            }
                            else
                            {
                                ex.ToString();
                            }
                        }
                    }

                }

            }

            return Ok(Resp);
        }

        public bool isThereSpace(String sentence)
        {
            return sentence.Contains(" ");
        }
        public async Task<string> CreateWebUser(string email, string password, string firstName, string lastName,string phoneNumber, string company, string regAs)
        {
            var db = new TgiDbContext();
            string UserId = "";
            if (password != "" && firstName != "" && lastName != "")
            {
                var users = new ApplicationUser();

                UserId = Guid.NewGuid().ToString();

                var userIdExist = db.Users.Where(m => m.Id == UserId).FirstOrDefault();
                if (userIdExist == null)
                {
                    users.Id = UserId;
                }
                else
                {
                    UserId = Guid.NewGuid().ToString();
                    users.Id = UserId;
                }
                users.SecurityStamp = Guid.NewGuid().ToString(format: "D");

                if(regAs == "STAFF")
                {
                    users.Email = firstName.ToLower() + "." + lastName.ToLower() + "@tolbeelglobalinvestment.com";
                }
                else
                {
                    users.Email = email;
                }
               
                users.EmailConfirmed = false;
                users.PhoneNumber = phoneNumber;
                users.PhoneNumberConfirmed = false;
                users.TwoFactorEnabled = false;
                users.LockoutEnabled = false;
                users.AccessFailedCount = 0;
                users.IsActivated = true;
                users.FirstName = firstName.ToUpper();
                users.LastName = lastName.ToUpper();
                users.Company = company;
                users.UserName = firstName.ToUpper() +" "+ lastName.ToUpper();
                db.Users.Add(users);
                var userStore = new UserStore<ApplicationUser>(new TgiDbContext());
                var manager = new UserManager<ApplicationUser>(userStore);

                IdentityResult result = await UserManager.CreateAsync(users, password);
                string uRole = "";
          
                if (result.Succeeded != true && regAs == "CUSTOMER" && company == "TOLBEEL PROFESSIONAL LAUNDRY SERVICES")
                {
                    uRole = "LaundryCustomer";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "CUSTOMER" && company == "TOLBEEL SMART LOGISTICS SERVICES")
                {
                    uRole = "LogisticsCustomer";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "STUDENT" && company == "TL EDUCATIONAL SERVICES")
                {
                    uRole = "Student";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "MANIGER" && company == "TL EDUCATIONAL SERVICES")
                {
                    uRole = "SchoolManager";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "MANIGER" && company == "TOLBEEL SMART LOGISTICS SERVICES")
                {
                    uRole = "LogisticsManager";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "MANIGER" && company == "TOLBEEL PROFESSIONAL LAUNDRY SERVICES")
                {
                    uRole = "LaundryManager";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "STAFF" && company == "TOLBEEL PROFESSIONAL LAUNDRY SERVICES")
                {
                    uRole = "LaundryStaff";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "STAFF" && company == "TOLBEEL SMART LOGISTICS SERVICES")
                {
                    uRole = "LogisticsStaff";
                    UserId = "";
                    return result.Errors.ToString();
                }
                else if (result.Succeeded != true && regAs == "STAFF" && company == "TL EDUCATIONAL SERVICES")
                {
                    uRole = "SchoolStaff";
                    UserId = "";
                    return result.Errors.ToString();
                }
                var res = manager.AddToRoles(users.Id, uRole);
               
            }
            return UserId;
        }
        // POST: api/CustomersApi
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[Authorize(Roles = "SuperAdmin")]
        [ResponseType(typeof(Customer))]
        public async Task<IHttpActionResult> PostCustomer(CustomerVM person)
        {
            var db = new TgiDbContext();
            string message = "FAILED TO CREATE ACCOUNT";
            if (HttpContext.Current != null && HttpContext.Current.User != null
                    && HttpContext.Current.User.Identity.Name != null)
            {
                userName = HttpContext.Current.User.Identity.Name;
                userId = HttpContext.Current.User.Identity.GetUserId();

            }
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var sc = new Customer();
            string regMode = "";
            regMode = person.CustomerMode;
            if (regMode == "ONLINE")
            {
                try
                {
                    //check if user exsist and create web account first
                    var user = db.Users.Where(m => m.Email == person.Email && m.UserName == person.Fullname).FirstOrDefault();
                    if (user == null)
                    {
                        var fln = person.Fullname.Split(' ');
                        string frn = fln[0];
                        string lsn = fln[1];
                        string lastCustomerId = "";
                        string lastStaffId = "";
                        var userId = await CreateWebUser(person.Email, person.Password, frn, lsn, person.PhoneNumber, person.Company, person.RegisteredAs);
                        if (userId != "")
                        {
                            lastCustomerId = db.Customers.OrderByDescending(x => x.CustId).Where(x => x.RegisteredAs == "CUSTOMER").Select(x => x.UniqueId).FirstOrDefault();
                            lastStaffId = db.Customers.OrderByDescending(x => x.CustId).Where(x => x.RegisteredAs == "STAFF").Select(x => x.UniqueId).FirstOrDefault();

                            var customer = new Customer();
                            customer.UserId = userId;
                            customer.WhatsappNumber = person.WhatsappNumber;
                            customer.PhoneNumber = person.PhoneNumber;
                            customer.Password = person.Password;
                            customer.Fullname = person.Fullname.ToUpper();
                            if (customer.RegisteredAs == "STAFF")
                            {
                                customer.Email = frn.ToLower() + "." + lsn.ToLower() + "@tolbeelglobalinvestment.com";
                            }
                            else
                            {
                                customer.Email = person.Email;
                            }
                            customer.DateOfBirth = person.DateOfBirth;
                            customer.StartDate = DateTime.Now;
                            customer.EndDate = null;
                            customer.CustomerMode = regMode;
                            customer.Address1 = person.Address1;
                            customer.Address2 = person.Address2;
                            customer.AddressDescription = person.AddressDescription;
                            customer.Company = person.Company;
                            customer.LGA = person.LGA;
                            customer.NearestBusStop = person.NearestBusStop;
                            customer.StateOfResidence = person.StateOfResidence;
                            if (customer.RegisteredAs == "STAFF")
                            {
                                if (lastCustomerId != null)
                                {
                                    var lastId = lastStaffId.Split('/');
                                    customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                }
                                else
                                {
                                    customer.UniqueId = "STAFF/" + DateTime.Now.Year.ToString() + "/1";
                                }
                            }
                            else if (customer.RegisteredAs == "CUSTOMER")
                            {
                                if (lastCustomerId != null)
                                {
                                    var lastId = lastCustomerId.Split('/');
                                    customer.UniqueId = "CUSTOMER/" + DateTime.Now.Year.ToString() + "/" + (Convert.ToInt32(lastId[2]) + 1).ToString();
                                }
                                else
                                {
                                    customer.UniqueId = "CUSTOMER/" + DateTime.Now.Year.ToString() + "/1";
                                }
                            }
                            db.Customers.Add(customer);
                            await db.SaveChangesAsync();
                            message = "SUCCESSFULLY CREATED";
                        }

                    }
                }
                catch (DbUpdateException ex)
                {

                    if (CustomerExists(person.CustId))
                    {
                        return Conflict();
                    }
                    else
                    {
                        ex.ToString();
                    }
                }


            }
            else
            {
                try
                {
                    var customer = new Customer();
                    customer.UserId = "";
                    customer.WhatsappNumber = person.WhatsappNumber;
                    customer.PhoneNumber = person.PhoneNumber;
                    customer.Password = person.Password;
                    customer.Fullname = person.Fullname.ToUpper();
                    customer.Email = person.Email.ToLower();
                    customer.DateOfBirth = person.DateOfBirth;
                    customer.StartDate = DateTime.Now;
                    customer.EndDate = null;
                    customer.CustomerMode = regMode;
                    customer.Address1 = person.Address1;
                    customer.Address2 = person.Address2;
                    customer.AddressDescription = person.AddressDescription;
                    customer.Company = person.Company;
                    customer.LGA = person.LGA;
                    customer.NearestBusStop = person.NearestBusStop;
                    customer.StateOfResidence = person.StateOfResidence;
                    db.Customers.Add(customer);
                    await db.SaveChangesAsync();
                    message = "SUCCESSFULLY CREATED";
                }
                catch (DbUpdateException ex)
                {
                    if (CustomerExists(person.CustId))
                    {
                        return Conflict();
                    }
                    else
                    {
                        ex.ToString();
                    }
                }
            }

            return CreatedAtRoute("DefaultApi", new { Message = message }, person);
        }

        //// DELETE: api/CustomersApi/5
        //[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        ////[Authorize(Roles = "SuperAdmin")]
        ////[Route("Remove/Person/{id}")]
        //[HttpDelete]
        //[ResponseType(typeof(void))]
        ////[Route("person/deleteById/{id}")]

        //public async Task<IHttpActionResult> DeleteCustomer(int id)
        //{
        //    var db = new TgiDbContext();
        //    Customer customer = await db.Customers.FindAsync(id);
        //    if (customer == null)
        //    {
        //        return NotFound();
        //    }

        //    db.Customers.Remove(customer);
        //    await db.SaveChangesAsync();

        //    return Ok(customer);
        //}


        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        ////[Authorize(Roles = "SuperAdmin")]
        [HttpDelete]
        public HttpResponseMessage Delete(int id)
        {
            try
            {
                using (TgiDbContext entities = new TgiDbContext())
                {
                    var entity = entities.Customers.FirstOrDefault(e => e.CustId == id);
                    if (entity == null)
                    {
                        return Request.CreateErrorResponse(HttpStatusCode.NotFound,
                            "Person with Id = " + id.ToString() + " not found to delete");
                    }
                    else
                    {
                        entities.Customers.Remove(entity);
                        entities.SaveChanges();
                        DeleteWebAccount(entity.UserId);
                        return Request.CreateResponse(HttpStatusCode.OK);

                    }
                }
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ex);
            }
        }
        private void DeleteWebAccount(string id)
        {
            try
            {
                using (TgiDbContext entities = new TgiDbContext())
                {
                    var entity = entities.Users.FirstOrDefault(e => e.Id == id);
                    if (entity != null)
                    {
                        entities.Users.Remove(entity);
                        entities.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        protected override void Dispose(bool disposing)
        {
            var db = new TgiDbContext();
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool CustomerExists(int id)
        {
            var db = new TgiDbContext();
            return db.Customers.Count(e => e.CustId == id) > 0;
        }
    }

}