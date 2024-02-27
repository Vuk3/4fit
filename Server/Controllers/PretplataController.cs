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
    public class PretplataController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public PretplataController(_4fitContext context)
        {
            Context = context;
        }
    	[Authorize(Roles = "k")]
        [Route("PretplatiSe/{idPaketa}/{idKlijenta}")]
        [HttpPost]
        public async Task<ActionResult> PretplatiSe(int idPaketa, int idKlijenta){
            try
            {
                var paket = await Context.Paketi.Include(p=>p.Trener).Where(p=>p.ID==idPaketa).FirstOrDefaultAsync();
                var kl = await Context.Klijenti.FindAsync(idKlijenta);
                var Datum = DateTime.Now;
                var datumDo = Datum.AddMonths(paket.TrajanjePaketa);

                var trener = await Context.Treneri.Where(p=>p.ID == paket.Trener.ID).FirstOrDefaultAsync();


                var provera = await Context.Pretplate
                                        .Include(a=>a.Klijent)
                                        .Include(p => p.Paket)
                                        .Where(b => b.Paket.ID == idPaketa && b.Klijent.ID == idKlijenta)
                                        .FirstOrDefaultAsync();
                
                if(provera != null)
                {
                    return BadRequest("Vec je pretplacen");
                }
                //skini pare klijentu

                if(kl.Krediti<paket.Cena){
                    return BadRequest("Nemate dovoljno kredita za dati paket!");
                }

                kl.Krediti-=paket.Cena;
                trener.Krediti+=paket.Cena;


                var Pretplata = new Pretplata{
                    DatumDo = datumDo,
                    DatumOd = DateTime.Now,
                    Klijent = kl,
                    Paket = paket
                };

                Context.Pretplate.Add(Pretplata);
                await Context.SaveChangesAsync();
                return(Ok(Pretplata));
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

        
    	[Authorize(Roles = "k")]
        [Route("VratiPretplateKlijenta/{idKlijenta}")]
        [HttpGet]
        public async Task<ActionResult> VratiPretplateKlijenta(int idKlijenta){
            try
            {
                var kl = await Context.Pretplate
                                .Include(b=>b.Paket)
                                .ThenInclude(x => x.Trener)
                                .Include(c=>c.Klijent)
                                .Where(p => p.Klijent.ID == idKlijenta)
                                .Select(a => new{
                                    id = a.ID,
                                    datumOd = a.DatumOd.ToString("dd/MM/yyyy"),
                                    datumDo = a.DatumDo.ToString("dd/MM/yyyy H:mm"),
                                    paket = a.Paket,
                                    trenerUn = a.Paket.Trener.Username
                                })
                                .ToListAsync();
                if (kl != null){
                    return Ok(kl);
                }
                return BadRequest("Nema korisnika");
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }


        [Authorize(Roles = "k,t")]
        [Route("VratiPretplate/{idKorisnika}")]
        [HttpGet]
        public async Task<ActionResult> VratiPretplate(int idKorisnika){
            try
            {
                var klijent = await Context.Pretplate
                                .Include(b=>b.Paket)
                                .ThenInclude(x => x.Trener)
                                .Include(c=>c.Klijent)
                                .Where(p => p.Klijent.ID == idKorisnika)
                                .Select(a => new{
                                    id = a.ID,
                                    datumOd = a.DatumOd.ToString("dd/MM/yyyy"),
                                    datumDo = a.DatumDo.ToString("dd/MM/yyyy H:mm"),
                                    paketNaziv = a.Paket.Naziv,
                                    fleg=a.Klijent.Fleg,
                                    trenerUn = a.Paket.Trener.Username,
                                    trenerID = a.Paket.Trener.ID
                                })
                                .ToListAsync();

                var trener = await Context.Pretplate
                                .Include(b=>b.Paket)
                                .ThenInclude(x => x.Trener)
                                .Include(c=>c.Klijent)
                                .Where(p =>p.Paket.Trener.ID == idKorisnika)
                                .Select(a => new{
                                    id = a.ID,
                                    datumOd = a.DatumOd.ToString("dd/MM/yyyy"),
                                    datumDo = a.DatumDo.ToString("dd/MM/yyyy H:mm"),
                                    paketNaziv = a.Paket.Naziv,
                                    fleg = a.Paket.Trener.Fleg,
                                    klijentID = a.Klijent.ID,
                                    klijentUn = a.Klijent.Username
                                })
                                .ToListAsync();

                if(trener.Count != 0){
                    return Ok(trener);
                }
                if (klijent.Count != 0){
                    return Ok(klijent);
                }

                return BadRequest("Nema korisnika");
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

    }
}
