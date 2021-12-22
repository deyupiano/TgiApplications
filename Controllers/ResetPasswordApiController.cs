using Microsoft.AspNet.Identity;
using TgiApplications.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;

namespace TgiApplications.Controllers
{
    //[RoutePrefix("api/user")]
    public class ResetPasswordApiController : ApiController
    {
        //private TgiDbContext db = new TgiDbContext();

        //public string userName = "";
        //public string userId = "";
        //public string defaultPassword = "";
        //public string lastUsedPassword = "";
        //public string idUpdate = "";

        //[Route("api/ResetPasswordApi/{UserName}/{UserPhoneNo}/{AgentCode}")]
        //[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[AllowAnonymous]
        //public string[] Get(string UserName, string UserPhoneNo, string AgentCode)
        //{
        //    string[] message = { "Incorrect parameters were provided", "", "" };

        //    var data = db.PasswordHistories.Where(x => x.UserName == UserName && x.UserPhoneNo == UserPhoneNo && x.AgentCode == AgentCode).FirstOrDefault();
        //    if(data == null)
        //    {
        //        return message;
        //    }
        //    idUpdate = data.Id.ToString();
        //    string userIdentity = data.UserId;
        //    if (idUpdate != null || idUpdate != "")
        //    {
        //        message[0] = "correct";
        //        message[1] = idUpdate;
        //        message[2] = userIdentity;
        //        return message;
        //    }
        //    return message;
        //}

        //[Route("api/ResetPasswordApi/{Num1}/{Num2}/{Num3}/{Num4}")]
        //[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[Authorize]
        //public string[] Get(string Num1, string Num2, string Num3, string Num4)
        //{
        //    string[] message = { "Incorrect number were entered.","" };
        //    if (HttpContext.Current != null && HttpContext.Current.User != null
        //     && HttpContext.Current.User.Identity.Name != null)
        //    {
        //        userName = HttpContext.Current.User.Identity.Name;
        //        userId = HttpContext.Current.User.Identity.GetUserId();
        //    }
        //    string requiredLast4Digit = Num1 + Num2 + Num3 + Num4;
        //    string userPhoneNo = db.AspNetUsers.Where(x => x.Id == userId).Select(x => x.PhoneNumber).FirstOrDefault();
        //    string removeLast4Digit = userPhoneNo.Substring(0, userPhoneNo.Length - 4);
        //    string phoneNoBuilder = removeLast4Digit + requiredLast4Digit;
        //    var data = db.PasswordHistories.Where(x => x.UserId == userId).FirstOrDefault();
        //    idUpdate = data.Id.ToString();
        //    if (userPhoneNo == phoneNoBuilder)
        //    {
        //        message[0] = "correct";
        //        message[1] = idUpdate;
        //        return message;
        //    }
        //    return message;
        //}



        //// GET: api/AssetsApi

        ////[Route("ChangePassword")]
        //[EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        //[Authorize]
        ////[HttpPost]
        //public IHttpActionResult PutPassword(int id, UsersVM u)
        //{
            
        //    //var httpRequest = HttpContext.Current.Request;
        //    string message = "Password not changed. Please contact your agent for default password.";
        //    if (HttpContext.Current != null && HttpContext.Current.User != null
        //    && HttpContext.Current.User.Identity.Name != null)
        //    {
        //        userName = HttpContext.Current.User.Identity.Name;
        //        userId = HttpContext.Current.User.Identity.GetUserId();
        //    }
        //    var data = db.PasswordHistories.Where(x => x.UserId == userId).FirstOrDefault();
        //    defaultPassword = data.DefaultPassword;
        //    lastUsedPassword = data.NewPassword;
        //    if (defaultPassword == null || defaultPassword == "")
        //    {
        //        u.Message = message;
        //        return CreatedAtRoute("DefaultApi", new { Message = message}, u);
        //    }
        //    else
        //    {
        //        if(defaultPassword == u.op)
        //        {
        //            using (SchoolDirectorDbContext entities = new SchoolDirectorDbContext())
        //            {
        //                var user = entities.AspNetUsers.FirstOrDefault(y => y.Id == userId);
        //                if (userId == "")
        //                {
        //                    return BadRequest();
        //                }
        //                else
        //                {
        //                    string np = u.np;
        //                    //var oldPasswordHash = PwsHash.HashPassword(op);

        //                    if(lastUsedPassword != null || lastUsedPassword == "")
        //                    {
        //                        if (PwsHash.VerifyHashedPassword(user.PasswordHash, lastUsedPassword) == true)
        //                        {
        //                            user.Id = user.Id;
        //                            user.Email = user.Email;
        //                            user.Fullname = user.Fullname;
        //                            user.UserName = user.UserName;
        //                            user.SecurityStamp = Guid.NewGuid().ToString(format: "D");
        //                            user.PasswordHash = PwsHash.HashPassword(np);
        //                            user.EmailConfirmed = false;
        //                            user.PhoneNumberConfirmed = false;
        //                            user.TwoFactorEnabled = false;
        //                            user.LockoutEnabled = false;
        //                            user.AccessFailedCount = 0;
        //                            try
        //                            {
        //                                entities.SaveChanges();
        //                                UpdatePasswordHistory(np);
        //                                message = "Password successfully changed";

        //                            }
        //                            catch (DbUpdateConcurrencyException)
        //                            {

        //                            }
        //                        }
        //                        else
        //                        {
        //                            return BadRequest();
        //                        }
        //                    }
        //                    else
        //                    {
        //                        if (PwsHash.VerifyHashedPassword(user.PasswordHash, defaultPassword) == true)
        //                        {
        //                            user.Id = user.Id;
        //                            user.Email = user.Email;
        //                            user.Fullname = user.Fullname;
        //                            user.UserName = user.UserName;
        //                            user.SecurityStamp = Guid.NewGuid().ToString(format: "D");
        //                            user.PasswordHash = PwsHash.HashPassword(np);
        //                            user.EmailConfirmed = false;
        //                            user.PhoneNumberConfirmed = false;
        //                            user.TwoFactorEnabled = false;
        //                            user.LockoutEnabled = false;
        //                            user.AccessFailedCount = 0;
        //                            try
        //                            {
        //                                entities.SaveChanges();
        //                                UpdatePasswordHistory(np);
        //                                message = "Password successfully changed";

        //                            }
        //                            catch (DbUpdateConcurrencyException)
        //                            {

        //                            }
        //                        }
        //                        else
        //                        {
        //                            return BadRequest();
        //                        }
        //                    }


        //                }


        //            }
        //        }
        //        else if (lastUsedPassword == u.op)
        //        {
        //            using (SchoolDirectorDbContext entities = new SchoolDirectorDbContext())
        //            {
        //                var user = entities.AspNetUsers.FirstOrDefault(y => y.Id == userId);
        //                if (userId == "")
        //                {
        //                    return BadRequest();
        //                }
        //                else
        //                {
        //                    string np = u.np;
        //                    //var oldPasswordHash = PwsHash.HashPassword(op);


        //                    if (PwsHash.VerifyHashedPassword(user.PasswordHash, lastUsedPassword) == true)
        //                    {
        //                        user.Id = user.Id;
        //                        user.Email = user.Email;
        //                        user.Fullname = user.Fullname;
        //                        user.UserName = user.UserName;
        //                        user.SecurityStamp = Guid.NewGuid().ToString(format: "D");
        //                        user.PasswordHash = PwsHash.HashPassword(np);
        //                        user.EmailConfirmed = false;
        //                        user.PhoneNumberConfirmed = false;
        //                        user.TwoFactorEnabled = false;
        //                        user.LockoutEnabled = false;
        //                        user.AccessFailedCount = 0;
        //                        try
        //                        {
        //                            entities.SaveChanges();
        //                            UpdatePasswordHistory(np);
        //                            message = "Password successfully changed";
        //                        }
        //                        catch (DbUpdateConcurrencyException)
        //                        {

        //                        }
        //                    }
        //                    else
        //                    {
        //                        return BadRequest();
        //                    }


        //                }


        //            }
        //        }
        //        else if (u.op == "" || u.op == null)
        //        {
        //            using (SchoolDirectorDbContext entities = new SchoolDirectorDbContext())
        //            {
        //                var user = entities.AspNetUsers.FirstOrDefault(y => y.Id == u.Id);
        //                if (userId == "")
        //                {
        //                    return BadRequest();
        //                }
        //                else
        //                {
        //                    string np = u.np;
        //                    //var oldPasswordHash = PwsHash.HashPassword(op);


        //                    if (PwsHash.VerifyHashedPassword(user.PasswordHash, lastUsedPassword) == true)
        //                    {
        //                        user.Id = user.Id;
        //                        user.Email = user.Email;
        //                        user.Fullname = user.Fullname;
        //                        user.UserName = user.UserName;
        //                        user.SecurityStamp = Guid.NewGuid().ToString(format: "D");
        //                        user.PasswordHash = PwsHash.HashPassword(np);
        //                        user.EmailConfirmed = false;
        //                        user.PhoneNumberConfirmed = false;
        //                        user.TwoFactorEnabled = false;
        //                        user.LockoutEnabled = false;
        //                        user.AccessFailedCount = 0;
        //                        try
        //                        {
        //                            entities.SaveChanges();
        //                            UpdatePasswordHistory(np);
        //                            message = "Password successfully changed";
        //                        }
        //                        catch (DbUpdateConcurrencyException)
        //                        {

        //                        }
        //                    }
        //                    else
        //                    {
        //                        return BadRequest();
        //                    }


        //                }


        //            }
        //        }

        //    }

        //    return CreatedAtRoute("DefaultApi", new { Message = message }, u);
        //}
        //public void UpdatePasswordHistory(string newPassword)
        //{
        //    using (SchoolDirectorDbContext entities = new SchoolDirectorDbContext())
        //    {
        //        var entity = entities.PasswordHistories.FirstOrDefault(y => y.UserId == userId);
        //        if (entity.Id != 0)
        //        {
        //            entity.Id = entity.Id;
        //            entity.DefaultPassword = entity.DefaultPassword;
        //            entity.UserId = entity.UserId;
        //            entity.NewPassword = newPassword;
        //            entity.DatePasswordChanged = DateTime.Now;
        //            try
        //            {
        //                entities.SaveChanges();

        //            }
        //            catch (Exception ex)
        //            {

        //                ex.ToString();
        //            }
        //        }

        //    }
        //}

    }
}
