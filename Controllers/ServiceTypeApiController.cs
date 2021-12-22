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
    public class ServiceTypeApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("sType/getList")]
        public IHttpActionResult GetAllItemServiceTypes()
        {
            IList<ServiceTypeVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.ServiceTypes.Select(s => new
               ServiceTypeVM()
                {
                    Id = s.Id,
                    Name = s.Name
                }).ToList<ServiceTypeVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("ServiceType/Create")]
        // POST: api/BulkInsert/BulkUpdate
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewItemCategory(ServiceTypeVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                ctx.ServiceTypes.Add(new ServiceType()
                {
                   Id = ic.Id,
                    Name = ic.Name
                });
                ctx.SaveChanges();
            }
            //return CreatedAtRoute("DefaultApi", new { Message = message }, ic);
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IHttpActionResult Put(int id, ServiceTypeVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingItem = ctx.ServiceTypes.Where(s => s.Id ==
               id).FirstOrDefault<ServiceType>();
                if (existingItem != null)
                {
                    existingItem.Name = ic.Name;
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
                var ic = ctx.ServiceTypes
                .Where(s => s.Id == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("sType/getById/{id:int}")]
        public async Task<IHttpActionResult> GetServiceType(int id)
        {
            var db = new TgiDbContext();
            ServiceType ic = await db.ServiceTypes.FindAsync(id);
            if (ic == null)
            {
                return NotFound();
            }

            return Ok(ic);
        }

    }
}