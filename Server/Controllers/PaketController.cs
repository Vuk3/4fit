using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace _4fit.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PaketController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public PaketController(_4fitContext context)
        {
            Context = context;
        }

		[Authorize(Roles = "t")]
        [Route("DodajPaket/{idTrenera}/{naziv}/{opis}/{trajanje}/{cena}")]
        [HttpPost]
        public async Task<ActionResult> DodajPaket(int idTrenera, String naziv, String opis, int trajanje, int cena){
            try
            {
                var trener = await Context.Treneri.FindAsync(idTrenera);
                var paket = new Paket{
                    Naziv=naziv,
                    Opis=opis,
                    TrajanjePaketa=trajanje,
                    Cena=cena,
                    Trener=trener
                };
                Context.Paketi.Add(paket);
                await Context.SaveChangesAsync();

                return Ok(paket);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    	[Authorize]
        [Route("VratiPakete/{idTrenera}")]
        [HttpGet]
        public async Task<ActionResult> VratiPakete(int idTrenera){
            try
            {
                var p = await Context.Paketi
                .Where(p => p.Trener.ID == idTrenera)
                .Select(m => new{
                    id = m.ID,
                    cena = m.Cena,
                    naziv = m.Naziv,
                    opis = m.Opis,
                    trajanje = m.TrajanjePaketa,
                    korimetrenera = m.Trener.Username,
                    idTrenera = m.Trener.ID,
                })
                .ToListAsync();
                return Ok(p);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    	[Authorize(Roles = "t, a")]
        [Route("IzbrisiPaket/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiPaket(int id){
            try
            {
                var t = await Context.Paketi.Include(p=>p.Klijenti).Where(p => p.ID == id).FirstOrDefaultAsync();
                if(t.Klijenti.Count != 0){
                    return BadRequest("Ne mozete obrisati paket koji ima pretplacene klijente.");
                }
                if (t != null)
                    {
                        Context.Paketi.Remove(t);
                        await Context.SaveChangesAsync();
                        return Ok("Uspesno izbrisan paket");
                    }
                else{
                    return BadRequest("Greska");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    	[Authorize]
        [Route("VratiPakete")]
        [HttpGet]
        public async Task<ActionResult> VratiPakete(){
            try
            {
                var p = await Context.Paketi
                .Select(m => new{
                    cena = m.Cena,
                    naziv = m.Naziv,
                    opis = m.Opis,
                    trajanje = m.TrajanjePaketa,
                    korimetrenera = m.Trener.Username,
                    idTrenera = m.Trener.ID,
                                        idPaketa = m.ID

                })
                .ToListAsync();
                return Ok(p);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
    }
}