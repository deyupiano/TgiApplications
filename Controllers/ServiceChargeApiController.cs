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
using TgiApplications.ViewModels;

namespace TgiApplications.Controllers
{
    public class ServiceChargeApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("servicecharge/getList")]
        public IHttpActionResult GetAllServicesCharges()
        {
            IList<ServiceChargeVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.ServiceCharges.Select(s => new
               ServiceChargeVM()
                {
                    SChargesId = s.SChargesId,
                    ServiceId = s.ServiceId,
                    Duration = s.Duration,
                    RealCharge = s.RealCharge,
                    ServiceDiscount = s.ServiceDiscount,
                    NetCharges = s.NetCharges,
                    Location = s.Location,
                    Service = s.Service.ServiceName,
                    ServiceDetails = s.Service.Item.ItemName +","+ s.Service.Item.ItemCategory.ItemCategoryName + "," + s.Service.Item.ItemDescription + "," + s.Service.Item.ItemImage,
                }).ToList<ServiceChargeVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("ServiceCharge/Create")]
        // POST: api/BulkInsert/BulkUpdate
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewServiceCharge(ServiceChargeVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                ctx.ServiceCharges.Add(new ServiceCharge()
                {
                    SChargesId = ic.SChargesId,
                    ServiceId = ic.ServiceId,
                    Duration = ic.Duration,
                    RealCharge = ic.RealCharge,
                    ServiceDiscount = ic.ServiceDiscount,
                    NetCharges = ic.NetCharges,
                    Location = ic.Location,
                });
                ctx.SaveChanges();
            }
            //return CreatedAtRoute("DefaultApi", new { Message = message }, ic);
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IHttpActionResult Put(int id, ServiceChargeVM ic)
        {

            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingItem = ctx.ServiceCharges.Where(s => s.SChargesId == id).FirstOrDefault<ServiceCharge>();
                if (existingItem != null)
                {
                    existingItem.SChargesId = ic.SChargesId;
                    existingItem.ServiceId = ic.ServiceId;
                    existingItem.Duration = ic.Duration;
                    existingItem.RealCharge = ic.RealCharge;
                    existingItem.ServiceDiscount = ic.ServiceDiscount;
                    existingItem.NetCharges = ic.NetCharges;
                    existingItem.Location = ic.Location;
                    existingItem.LocationExtraCharges = ic.LocationExtraCharges;
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
                return BadRequest("Not a valid item cost id");
            using (var ctx = new TgiDbContext())
            {
                var ic = ctx.ServiceCharges
                .Where(s => s.SChargesId == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("serviceCharge/getById/{id:int}")]
        public async Task<IHttpActionResult> GetServiceCharge(int id)
        {
            //var db = new TgiDbContext();
            //ServiceCharge ic = await db.ServiceCharges.FindAsync(id);
            //if (ic == null)
            //{
            //    return NotFound();
            //}
            object ic = null;
            using (var ctx = new TgiDbContext())
            {
                ic = ctx.ServiceCharges.Where(x=>x.SChargesId == id).Select(s => new
               ServiceChargeVM()
                {
                    SChargesId = s.SChargesId,
                    ServiceId = s.ServiceId,
                    Duration = s.Duration,
                    RealCharge = s.RealCharge,
                    ServiceDiscount = s.ServiceDiscount,
                    NetCharges = s.NetCharges,
                    Location = s.Location,
                    Service = s.Service.ServiceName,
                    ServiceDetails = s.Service.Item.ItemName + "," + s.Service.Item.ItemCategory.ItemCategoryName + "," + s.Service.Item.ItemDescription + "," + s.Service.Item.ItemImage,
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