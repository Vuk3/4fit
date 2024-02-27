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
    [Authorize(Roles = "a")]
    [Route("[controller]")]
    public class AdminController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public AdminController(_4fitContext context)
        {
            Context = context;
        }

        [Route("BrisiTemuAdmin/{idTeme}")]
        [HttpDelete]
        public async Task<ActionResult> BrisiTemuAdmin(int idTeme){
            try
            {
                var tema = await Context.NoveObjave.Include(p=>p.KorisniciKojiSuLajkovali).Where(p=>p.ID==idTeme).FirstOrDefaultAsync();
                var odgovori = await Context.OdgovoriNaObjavu.Include(p=>p.KorisniciKojiSuLajkovali).Where(p => p.Objava.ID == idTeme).ToListAsync();
                odgovori.ForEach(p => {
                     p.KorisniciKojiSuLajkovali.ForEach(s=>{
                        Context.LajkoviObjave.Remove(s);
                        tema.BrojLajkova--;
                    });

                    Context.OdgovoriNaObjavu.Remove(p);
                
                });
                   



                tema.KorisniciKojiSuLajkovali.ForEach(p=>{
                    Context.LajkoviObjave.Remove(p);
                    tema.BrojLajkova--;
                });


                Context.NoveObjave.Remove(tema);
                await Context.SaveChangesAsync();
                return Ok("uspesno brisanje");
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

        [Route("BrisiOdgovorAdmin/{idOdgovora}")]
        [HttpDelete]
        public async Task<ActionResult> BrisiOdgovorAdmin(int idOdgovora){
            try
            {
                var odg = await Context.OdgovoriNaObjavu
                            .Include(p=>p.KorisniciKojiSuLajkovali)
                            .Include(p => p.Korisnik)
                            .Include(p => p.Objava)
                            .Where(p => p.ID == idOdgovora).FirstOrDefaultAsync();

                    odg.KorisniciKojiSuLajkovali.ForEach(s=>{
                        Context.LajkoviObjave.Remove(s);
                    });

                

                odg.Objava.BrojKomentara--;
                Context.OdgovoriNaObjavu.Remove(odg);
                await Context.SaveChangesAsync();
                return Ok("uspesno brisanje");
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

        [Route("Banuj/{id}/{razlog}")]
        [HttpPut]
        public async Task<ActionResult> Banuj(int id, string razlog){
            try
            {
                var k = await Context.Korisnici.Include(p=>p.Ban).Where(p=>p.ID==id).FirstOrDefaultAsync();

                if(k==null){
                    return BadRequest("korisnik ne postoji");
                }

                var ban = new Ban{
                    Razlog=razlog,
                    Korisnik=k
                };


                Context.Banovi.Add(ban);
                await Context.SaveChangesAsync();
                return Ok(k);
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

        [Route("VratiBan/{idKor}")]
        [HttpGet]
        public async Task<ActionResult> VratiBan(int idKor){
            try
            {
                var k = await Context.Banovi.Include(b=>b.Korisnik).Where(p=>p.Korisnik.ID==idKor).FirstOrDefaultAsync();

                if(k==null){
                    return Ok();
                }


                return BadRequest();
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

        [Route("BrisiObjTreneraAdmin/{idObjave}")]
        [HttpDelete]
        public async Task<ActionResult> BrisiObjTreneraAdmin(int idObjave){
            try
            {
                var tema = await Context.ObjaveTrenera.Include(a=>a.KorisniciKojiSuLajkovali).Where(p=> p.ID == idObjave).FirstOrDefaultAsync();
                tema.KorisniciKojiSuLajkovali.ForEach(a => {
                    Context.LajkoviObjave.Remove(a);
                });

                Context.ObjaveTrenera.Remove(tema);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {                
                return BadRequest(e.Message);
            }
        }

        [Route("VratiBanovane")]
        [HttpGet]
        public async Task<ActionResult> VratiBanovane(){
            try
            {
                var k = await Context.Korisnici.Include(p=> p.Ban).Where(a=> a.Ban != null).ToListAsync();
                return Ok(Enumerable.Reverse(k).ToList());

            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }


        [Route("Odbanuj/{id}")]
        [HttpPut]
        public async Task<ActionResult> Odbanuj(int id){
            try
            {
                var k = await Context.Korisnici.Include(p=>p.Ban).Where(p=>p.ID==id).FirstOrDefaultAsync();

                if(k==null){
                    return BadRequest("korisnik ne postoji");
                }

                // var ban = new Ban{
                //     Razlog=razlog,
                //     Korisnik=k
                // };

                var ban = await Context.Banovi.Where(p=>p.Korisnik==k).FirstOrDefaultAsync();
                Context.Banovi.Remove(ban);
                await Context.SaveChangesAsync();
                return Ok(k);
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

        [Route("VratiZahteveTrenera")]
        [HttpGet]
        public async Task<ActionResult> VratiZahteveTrenera(){
            try
            {
                var ZahteviTr = await Context.ZahteviTrenera
                                    .Include(a => a.Podnosilac)
                                    .Select(b => new {
                                        id = b.ID,
                                        kolicina = b.Kolicina,
                                        BrRac = b.BrojRacuna,
                                        korTrenera = b.Podnosilac.Username,
                                        ime = b.Podnosilac.Ime,
                                        prezime = b.Podnosilac.Prezime,
                                        idTrenera = b.Podnosilac.ID
                                    })
                                    .ToListAsync();

                return Ok(ZahteviTr);
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

        [Route("Isplati/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Isplati(int id){
            try
            {
                var Zahtev = await Context.ZahteviTrenera.FindAsync(id);
                Context.ZahteviTrenera.Remove(Zahtev);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

        [Route("Uplati/{id}/{kolicina}")]
        [HttpDelete]
        public async Task<ActionResult> Uplati(int id, int kolicina){
            try
            {
                var Zahtev = await Context.ZahteviKlijenta.Include(a=>a.Podnosilac).Where(p=> p.ID == id).FirstOrDefaultAsync();
                Zahtev.Podnosilac.Krediti+=kolicina;
                Context.ZahteviKlijenta.Remove(Zahtev);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

        [Route("Odbij/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Odbij(int id){
            try
            {
                var Zahtev = await Context.ZahteviKlijenta.Include(a=>a.Podnosilac).Where(p=> p.ID == id).FirstOrDefaultAsync();
                Context.ZahteviKlijenta.Remove(Zahtev);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }

        [Route("VratiZahteveKlijenta")]
        [HttpGet]
        public async Task<ActionResult> VratiZahteveKlijenta(){
            try
            {
                var ZahteviKl = await Context.ZahteviKlijenta
                                    .Include(a => a.Podnosilac)
                                    .Select(b => new {
                                        id = b.ID,
                                        kolicina = b.Kolicina,
                                        slika = b.Slika,
                                        korKlijenta = b.Podnosilac.Username,
                                        ime = b.Podnosilac.Ime,
                                        prezime = b.Podnosilac.Prezime,
                                        idKlijenta = b.Podnosilac.ID
                                    })
                                    .ToListAsync();

                return Ok(ZahteviKl);
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }


        
    }
}