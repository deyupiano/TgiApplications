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
    public class CentersApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("centers/getList")]
        public IHttpActionResult GetAllCenters()
        {
            IList<CentersVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.BizCenters.Select(s => new
               CentersVM()
                {
                    Id = s.Id,
                    CenterName = s.CenterName,
                    CenterAddress = s.CenterAddress,
                    CenterPhoneNo = s.CenterPhoneNo,
                    CenterManager = s.CenterManager
                }).ToList<CentersVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("Center/Create")]
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewCenter(CentersVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                ctx.BizCenters.Add(new BizCenter()
                {
                    Id = ic.Id,
                    CenterName = ic.CenterName,
                    CenterAddress = ic.CenterAddress,
                    CenterPhoneNo = ic.CenterPhoneNo,
                    CenterManager = ic.CenterManager
                });
                ctx.SaveChanges();
            }
            //return CreatedAtRoute("DefaultApi", new { Message = message }, ic);
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IHttpActionResult Put(int id, CentersVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingCenter = ctx.BizCenters.Where(s => s.Id ==
               id).FirstOrDefault<BizCenter>();
                if (existingCenter != null)
                {
                    existingCenter.CenterName = ic.CenterName;
                    existingCenter.CenterAddress = ic.CenterAddress;
                    existingCenter.CenterPhoneNo = ic.CenterPhoneNo;
                    existingCenter.CenterManager = ic.CenterManager;
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
                return BadRequest("Not a valid item center id");
            using (var ctx = new TgiDbContext())
            {
                var ic = ctx.BizCenters
                .Where(s => s.Id == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("center/getById/{id:int}")]
        public async Task<IHttpActionResult> GetCenter(int id)
        {
            var db = new TgiDbContext();
            BizCenter ic = await db.BizCenters.FindAsync(id);
            if (ic == null)
            {
                return NotFound();
            }

            return Ok(ic);
        }

    }
}