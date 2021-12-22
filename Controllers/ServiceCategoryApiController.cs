using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using TgiApplications.Models;
using TgiApplications.ViewModels;

namespace TgiApplications.Controllers
{
    public class ServiceCategoryApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("sCat/getList")]
        public IHttpActionResult GetAllServiceCategorys()
        {
            IList<ServiceCategoryVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.ServiceCategories.Select(s => new
               ServiceCategoryVM()
                {
                    ServiceCategoryId = s.ServiceCategoryId,
                    ServiceCategoryName = s.ServiceCategoryName
                }).ToList<ServiceCategoryVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("ServiceCategory/Create")]
        // POST: api/BulkInsert/BulkUpdate
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewServiceCategory(ServiceCategoryVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                ctx.ServiceCategories.Add(new ServiceCategory()
                {
                    ServiceCategoryId = ic.ServiceCategoryId,
                    ServiceCategoryName = ic.ServiceCategoryName
                });
                ctx.SaveChanges();
            }
            //return CreatedAtRoute("DefaultApi", new { Message = message }, ic);
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IHttpActionResult Put(int id, ServiceCategoryVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingService = ctx.ServiceCategories.Where(s => s.ServiceCategoryId ==
               id).FirstOrDefault<ServiceCategory>();
                if (existingService != null)
                {
                    existingService.ServiceCategoryName = ic.ServiceCategoryName;
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
                var ic = ctx.ServiceCategories
                .Where(s => s.ServiceCategoryId == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("sCat/getById/{id:int}")]
        public async Task<IHttpActionResult> GetServiceCategory(int id)
        {
            var db = new TgiDbContext();
            ServiceCategory ic = await db.ServiceCategories.FindAsync(id);
            if (ic == null)
            {
                return NotFound();
            }

            return Ok(ic);
        }

    }
}