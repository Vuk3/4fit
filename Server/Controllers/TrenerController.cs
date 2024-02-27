using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace _4fit.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TrenerController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public TrenerController(_4fitContext context)
        {
            Context = context;
        }

        
    	[Authorize(Roles = "t")]
        [Route("IzmeniBiografiju/{id}/{biografija}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniDrzavu(int id,String biografija){
            if(biografija.Length > 1000 )
            {
                return BadRequest("Predugacka biografija!");
            }

            try
            {
                var k = await Context.Treneri.FindAsync(id);

                if(k == null)
                {
                    return BadRequest("Ne postoji trener");
                }

                k.Biografija = biografija;
                await Context.SaveChangesAsync();
                return Ok("Biografija je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

    	[Authorize(Roles = "t")]
        [HttpPost]
        [Route("DodajObjavu/{opis}/{id}")]
        public async Task<JsonResult> DodajObjavu([FromForm] IFormFile slika, string opis, int id) {

            var slikaMem = new MemoryStream();
            slika.CopyTo(slikaMem);
            var slikaUBajtovima = slikaMem.ToArray();


            var trener = await Context.Treneri.FindAsync(id);

            var objavaTrenera = new ObjavaTrenera{
                Sadrzaj=opis,
                Slika=slikaUBajtovima,
                Trener=trener
            };

            Context.ObjaveTrenera.Add(objavaTrenera);

            await Context.SaveChangesAsync();

            return new JsonResult(slikaUBajtovima);

        }

    	[Authorize]
        [Route("VratiObjave/{id}")]
        [HttpGet]
        public async Task<ActionResult> VratiObjave(int id){
            var ObjaveTrenera = await Context.ObjaveTrenera
                                        .Include(p => p.Trener)
                                        .Where(p => p.Trener.ID == id)
                                        .Select(a => new{
                                            id = a.ID,
                                            slika = a.Slika,
                                            trener = a.Trener.ID,
                                            opis = a.Sadrzaj
                                        }).ToListAsync();
            return Ok(Enumerable.Reverse(ObjaveTrenera).ToList());
        }

    }
}
