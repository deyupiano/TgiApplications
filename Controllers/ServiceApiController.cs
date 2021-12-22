using System;
using System.Collections.Generic;
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
    public class ServiceApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("service/getList")]
        public IHttpActionResult GetAllServices()
        {
            IList<ServiceVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.Services.OrderByDescending(s=>s.ServiceId).Select(s => new
               ServiceVM()
                {
                    ServiceId = s.ServiceId,
                    ServiceName = s.ServiceName,
                    Category = s.ServiceCategory.ServiceCategoryName,
                    ServiceDescription = s.ServiceDescription,
                    Price = s.Price,
                    ServiceCategoryId = s.ServiceCategoryId,
                    ItemId = s.ItemId,
                    Id = s.Id,
                    ServiceImage = s.Image,
                    ServiceItem = s.Item.ItemName,
                    SType = s.ServiceType.Name,
                    ServiceDetails = s.Item.ItemName + "," + s.Item.ItemImage + "," + s.Item.ServiceType.Name + "," + s.ServiceDescription,
                }).ToList<ServiceVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
            //IList<ServiceMenuItemVM> menuItems = null;
            //using (var ctx = new TgiDbContext())
            //{
            //    menuItems = ctx.Services.Include("ServiceCategories").Include("Items")
            //    .Select(s => new ServiceMenuItemVM()
            //    {
            //        ServiceId = s.ServiceId,
            //        ServiceName = s.ServiceName,
            //        Category = s.ServiceCategory.ServiceCategoryName,
            //        ServiceDescription = s.ServiceDescription,
            //        Address = s.StudentAddress == null ? null : new AddressViewModel()
            //        {
            //            StudentId = s.StudentAddress.StudentID,
            //            Address1 = s.StudentAddress.Address1,
            //            Address2 = s.StudentAddress.Address2,
            //            City = s.StudentAddress.City,
            //            State = s.StudentAddress.State
            //        }
            //    }).ToList<ServiceMenuItemVM>();
            //}
            //if (menuItems.Count == 0)
            //{
            //    return NotFound();
            //}
            //return Ok(menuItems);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("Service/Create")]
        // POST: api/BulkInsert/BulkUpdate
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewService(ServiceVM ic)
        {
            string newName = "";
            if (isThereSpace(ic.ServiceName) == true)
            {
                newName = ic.ServiceName.Replace(" ", "_");
            }
            else
            {
                newName = ic.ServiceName;
            }

            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                if (ic.ServiceImage == null || ic.ServiceImage == "")
                {
                    ctx.Services.Add(new Service()
                    {
                        ServiceName = ic.ServiceName,
                        ServiceCategoryId = ic.ServiceCategoryId,
                        ServiceDescription = ic.ServiceDescription,
                        Price = ic.Price,
                        Image = ic.ServiceImage,
                        ItemId = ic.ItemId,
                        Id = ic.Id,
                    });
                }
                else
                {
                    string extension = ImageProcessing.UploadedImages(ic.ServiceImage, newName);
                    string filePath = newName + extension;
                    try
                    {
                        ctx.Services.Add(new Service()
                        {
                            ServiceName = ic.ServiceName,
                            ServiceCategoryId = ic.ServiceCategoryId,
                            ServiceDescription = ic.ServiceDescription,
                            Price = ic.Price,
                            Image = filePath,
                            ItemId = ic.ItemId,
                            Id = ic.Id,
                        });
                    }
                    catch (Exception ex)
                    {
                        ex.ToString();
                    }

                }
                ctx.SaveChanges();
            }
            //return CreatedAtRoute("DefaultApi", new { Message = message }, ic);
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IHttpActionResult Put(int id, ServiceVM ic)
        {
            string newName = "";
            if (isThereSpace(ic.ServiceName) == true)
            {
                newName = ic.ServiceName.Replace(" ", "_");
            }
            else
            {
                newName = ic.ServiceName;
            }

            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingItem = ctx.Services.Where(s => s.ServiceId == ic.ServiceId).FirstOrDefault<Service>();
                if (existingItem != null)
                {

                    if (ic.ServiceImage == null || ic.ServiceImage == "")
                    {
                        existingItem.ServiceId = existingItem.ServiceId;
                        existingItem.ServiceName = ic.ServiceName;
                        existingItem.ServiceDescription = ic.ServiceDescription;
                        existingItem.ServiceCategoryId = ic.ServiceCategoryId;
                        existingItem.Price = ic.Price;
                        existingItem.Image = existingItem.Image;
                        existingItem.ItemId = ic.ItemId;
                        existingItem.Id = ic.Id;
                    }
                    else
                    {
                        string extension = ImageProcessing.UploadedImages(ic.ServiceImage, newName);
                        string filePath = newName + extension;
                        try
                        {
                            existingItem.ServiceId = existingItem.ServiceId;
                            existingItem.ServiceName = ic.ServiceName;
                            existingItem.ServiceDescription = ic.ServiceDescription;
                            existingItem.ServiceCategoryId = ic.ServiceCategoryId;
                            existingItem.Price = ic.Price;
                            existingItem.Image = filePath;
                            existingItem.ItemId = ic.ItemId;
                            existingItem.Id = ic.Id;
                        }
                        catch (Exception ex)
                        {
                            ex.ToString();
                        }

                    }
                    ctx.SaveChanges();
                }
                else
                {
                    return NotFound();
                }
            }
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [HttpDelete]
        public IHttpActionResult Delete(int id)
        {
            if (id <= 0)
                return BadRequest("Not a valid item category id");
            using (var ctx = new TgiDbContext())
            {
                var ic = ctx.Services
                .Where(s => s.ServiceId == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("service/getById/{id:int}")]
        public async Task<IHttpActionResult> GetService(int id)
        {
            //var db = new TgiDbContext();
            //Service ic = await db.Services.FindAsync(id);
            //if (ic == null)
            //{
            //    return NotFound();
            //}
            object ic = null;
            using (var ctx = new TgiDbContext())
            {
                ic = ctx.Services.Where(x => x.ServiceId == id).Select(s => new
                 ServiceVM()
                {
                    ServiceId = s.ServiceId,
                    ServiceName = s.ServiceName,
                    Category = s.ServiceCategory.ServiceCategoryName,
                    ServiceDescription = s.ServiceDescription,
                    ItemId = s.ItemId,
                    ServiceCategoryId = s.ServiceCategoryId,
                    Price = s.Price,
                    ServiceImage = s.Image,
                    ServiceItem = s.Item.ItemName,
                    SType = s.ServiceType.Name,
                    Id = s.Id,
                    ServiceDetails = s.Item.ItemName + "," + s.Item.ItemImage + "," + s.Item.ServiceType.Name + "," + s.ServiceDescription,
                }).FirstOrDefault();
            }
            return Ok(ic);
        }
        public bool isThereSpace(String sentence)
        {
            return sentence.Contains(" ");
        }
    }
}