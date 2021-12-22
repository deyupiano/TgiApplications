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
    public class ItemCostApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("itemcost/getList")]
        public IHttpActionResult GetAllItemCosts()
        {
            IList<ItemCostVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.ItemCosts.Select(s => new
               ItemCostVM()
                {
                    ICostId = s.ICostId,
                    ItemId = s.ItemId,
                    Quantity = s.Quantity,
                    RealCost = s.RealCost,
                    ItemDiscount = s.ItemDiscount,
                    Cost = s.Cost,
                    Location = s.Location,
                    Item = s.Item.ItemName
                }).ToList<ItemCostVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("ItemCost/Create")]
        // POST: api/BulkInsert/BulkUpdate
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewItemCost(ItemCostVM ic)
        {
            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                ctx.ItemCosts.Add(new ItemCost()
                {
                    ICostId = ic.ICostId,
                    ItemId = ic.ItemId,
                    Quantity = ic.Quantity,
                    RealCost = ic.RealCost,
                    ItemDiscount = ic.ItemDiscount,
                    Cost = ic.Cost,
                    Location = ic.Location,
                });
                ctx.SaveChanges();
            }
            //return CreatedAtRoute("DefaultApi", new { Message = message }, ic);
            return Ok(ic);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        public IHttpActionResult Put(int id, ItemCostVM ic)
        {

            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingItem = ctx.ItemCosts.Where(s => s.ICostId == id).FirstOrDefault<ItemCost>();
                if (existingItem != null)
                {
                    existingItem.ICostId = ic.ICostId;
                    existingItem.ItemId = ic.ItemId;
                    existingItem.Quantity = ic.Quantity;
                    existingItem.RealCost = ic.RealCost;
                    existingItem.ItemDiscount = ic.ItemDiscount;
                    existingItem.Cost = ic.Cost;
                    existingItem.Location = ic.Location;
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
                var ic = ctx.ItemCosts
                .Where(s => s.ICostId == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("itemcost/getById/{id:int}")]
        public async Task<IHttpActionResult> GetItemCost(int id)
        {
            var db = new TgiDbContext();
            ItemCost ic = await db.ItemCosts.FindAsync(id);
            if (ic == null)
            {
                return NotFound();
            }

            return Ok(ic);
        }
        public bool isThereSpace(String sentence)
        {
            return sentence.Contains(" ");
        }
    }
}