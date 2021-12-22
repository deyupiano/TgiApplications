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
    public class LocationExtraChargesApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("locationx/getList")]
        public IHttpActionResult GetAllLocationCharges()
        {
            IList<LocationExtraVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.LocationExtras.Select(s => new
               LocationExtraVM()
                {
                    ExtraId = s.ExtraId,
                    Location = s.Location,
                    Charges = s.Charges,
                }).ToList<LocationExtraVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("locationx/Create")]
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewCenter(LocationExtraVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                ctx.LocationExtras.Add(new LocationExtra()
                {
                    ExtraId = ic.ExtraId,
                    Location = ic.Location,
                    Charges = ic.Charges,
                });
                ctx.SaveChanges();
            }
            //return CreatedAtRoute("DefaultApi", new { Message = message }, ic);
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IHttpActionResult Put(int id, LocationExtraVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingLocationX = ctx.LocationExtras.Where(s => s.ExtraId ==
               id).FirstOrDefault<LocationExtra>();
                if (existingLocationX != null)
                {
                    existingLocationX.Location = ic.Location;
                    existingLocationX.Charges = ic.Charges;
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
                return BadRequest("Not a valid location id");
            using (var ctx = new TgiDbContext())
            {
                var ic = ctx.LocationExtras
                .Where(s => s.ExtraId == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("locationx/getById/{id:int}")]
        public async Task<IHttpActionResult> GetLocationXCharges(int id)
        {
            var db = new TgiDbContext();
            LocationExtra ic = await db.LocationExtras.FindAsync(id);
            if (ic == null)
            {
                return NotFound();
            }

            return Ok(ic);
        }

    }
}