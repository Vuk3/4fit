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
    public class ZahtevController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public ZahtevController(_4fitContext context)
        {
            Context = context;
        }

    	[Authorize(Roles = "t")]        
        [Route("ZahtevTrenera/{kolicina}/{brRacuna}/{idTrenera}")]
        [HttpPost]
        public async Task<ActionResult> ZahtevTrenera(int kolicina, string brRacuna, int idTrenera){
            try
            {
                var Trener = await Context.Treneri.FindAsync(idTrenera);
                if(Trener == null){
                    return BadRequest("Nema takvog trenera");
                }

                if(Trener.Krediti < kolicina){
                    return BadRequest("Nemate dovoljno kredita");
                }

                var ZahtevTrenera = new ZahtevTrenera{
                    Podnosilac = Trener,
                    Kolicina = kolicina,
                    BrojRacuna = brRacuna
                };
                Trener.Krediti-=kolicina;
                Context.ZahteviTrenera.Add(ZahtevTrenera);
                await Context.SaveChangesAsync();
                return Ok(ZahtevTrenera);


            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

    	[Authorize(Roles = "k")]
        [HttpPost]
        [Route("DodajZahtevKlijenta/{kolicina}/{idKlijenta}")]
        public async Task<ActionResult> DodajObjavu([FromForm] IFormFile slika, int kolicina, int idKlijenta) {

            var slikaMem = new MemoryStream();
            slika.CopyTo(slikaMem);
            var slikaUBajtovima = slikaMem.ToArray();

            var klijent = await Context.Klijenti.FindAsync(idKlijenta);

            if(klijent == null){
                return BadRequest("Nema takvog klijenta");
            }

            var ZahtevKl = new ZahtevKlijenta{
                Podnosilac = klijent,
                Kolicina = kolicina,
                Slika = slikaUBajtovima
                
            };
            Context.ZahteviKlijenta.Add(ZahtevKl);

            await Context.SaveChangesAsync();

            return Ok(ZahtevKl);

        }

        
    }
}