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
using TgiApplications.OtherServices;

namespace TgiApplications.Controllers
{
    public class ItemApiController : ApiController
    {
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("item/getList")]
        public IHttpActionResult GetAllItems()
        {
            IList<ItemVM> ics = null;
            using (var ctx = new TgiDbContext())
            {
                ics = ctx.Items.OrderByDescending(s=>s.ItemId).Select(s => new
               ItemVM()
                {
                    ItemId = s.ItemId,
                    ItemName = s.ItemName,
                    Id = s.Id,
                    ItemImage = s.ItemImage,
                    SCategory = s.ServiceType.Name,
                    ICategory = s.ItemCategory.ItemCategoryName,
                    ItemDescription = s.ItemDescription
                }).ToList<ItemVM>();
            }
            if (ics.Count == 0)
            {
                return NotFound();
            }
            return Ok(ics);
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [Route("Item/Create")]
        // POST: api/BulkInsert/BulkUpdate
        [ResponseType(typeof(void))]
        [HttpPost]
        public IHttpActionResult PostNewItem(ItemVM ic)
        {
            string newName = "";
            if (isThereSpace(ic.ItemName) == true)
            {
                newName = ic.ItemName.Replace(" ", "_");
            }
            else
            {
                newName = ic.ItemName;
            }

            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                if (ic.ItemImage == null || ic.ItemImage == "")
                {
                    ctx.Items.Add(new Item()
                    {
                        ItemId = ic.ItemId,
                        ItemName = ic.ItemName,
                        ItemImage = "",
                        Id = ic.Id,
                        ItemCategoryId = ic.ItemCategoryId,
                        ItemDescription = ic.ItemDescription
                    });
                }
                else
                {
                    string extension = ImageProcessing.UploadedImages(ic.ItemImage, newName);
                    string filePath = newName + extension;
                    try
                    {
                        ctx.Items.Add(new Item()
                        {
                            ItemId = ic.ItemId,
                            ItemName = ic.ItemName,
                            ItemImage = filePath,
                            Id = ic.Id,
                            ItemCategoryId = ic.ItemCategoryId,
                            ItemDescription = ic.ItemDescription
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
        public IHttpActionResult Put(int id, ItemVM ic)
        {

            if (!ModelState.IsValid)
                return BadRequest("Not a valid data");
            using (var ctx = new TgiDbContext())
            {
                var existingItem = ctx.Items.Where(s => s.ItemId == id).FirstOrDefault<Item>();
                if (ic.ItemImage == null || ic.ItemImage == "")
                {
                    if (existingItem != null)
                    {
                        existingItem.ItemName = ic.ItemName;
                        existingItem.ItemImage = "";
                        existingItem.ItemDescription = ic.ItemDescription;
                        existingItem.ItemCategoryId = ic.ItemCategoryId;
                        existingItem.Id = ic.Id;
                        ctx.SaveChanges();
                    }
                    else
                    {
                        return NotFound();
                    }
                }
                else
                {
                    string newName = "";
                    if (isThereSpace(ic.ItemName) == true)
                    {
                        newName = ic.ItemName.Replace(" ", "_");
                    }
                    else
                    {
                        newName = ic.ItemName;
                    }
                    string extension = ImageProcessing.UploadedImages(ic.ItemImage, newName);
                    var filePath = newName + extension;
                    if (existingItem != null)
                    {
                        existingItem.ItemName = ic.ItemName;
                        existingItem.ItemImage = filePath;
                        existingItem.ItemDescription = ic.ItemDescription;
                        existingItem.Id = ic.Id;
                        existingItem.ItemCategoryId = ic.ItemCategoryId;
                        ctx.SaveChanges();
                    }
                    else
                    {
                        return NotFound();
                    }
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
                var ic = ctx.Items
                .Where(s => s.ItemId == id)
               .FirstOrDefault();
                ctx.Entry(ic).State = System.Data.Entity.EntityState.Deleted;
                ctx.SaveChanges();
            }
            return Ok();
        }
        [EnableCors(origins: "*", headers: "*", methods: "*", SupportsCredentials = true)]
        [ResponseType(typeof(void))]
        [Route("item/getById/{id:int}")]
        public async Task<IHttpActionResult> GetItem(int id)
        {
            //var db = new TgiDbContext();

            //Item ic = await db.Items.FindAsync(id);
            //ic.Id = ic.ServiceType.Id;
            //if (ic == null)
            //{
            //    return NotFound();
            //}

            //return Ok(ic);
            object ic = null;
            using (var ctx = new TgiDbContext())
            {
                ic = ctx.Items.Where(x => x.ItemId == id).Select(s => new
                 ItemVM()
                {
                    ItemId = s.ItemId,
                    ItemName = s.ItemName,
                    ItemImage = s.ItemImage,
                    ItemDescription = s.ItemDescription,
                    Id = s.ServiceType.Id,
                    ItemCategoryId = s.ItemCategory.ItemCategoryId
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