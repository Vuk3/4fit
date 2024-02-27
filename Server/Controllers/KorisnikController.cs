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
    public class KorisnikController : ControllerBase
    {
        
        public _4fitContext Context { get; set; }

        public KorisnikController(_4fitContext context)
        {
            Context = context;
        }

        /*[Route("DodajKorisnika")]
        [HttpPost]
        public async Task<ActionResult> DodajKorisnika([FromBody] Trener k){
            Context.Treneri.Add(k);
            await Context.SaveChangesAsync();
            return Ok("Korisnik je uspešno izmenjen!");
        }*/


        //ZAKOMENTARISI PRE ODBRANU
        [Route("VratiKorisnike")]
        [HttpGet]
        public async Task<ActionResult> VratiKorisnike(){
            return Ok(await Context.Korisnici.Include(p=>p.Ban).Select(p => 
            new
            {ID = p.ID,
            Username = p.Username,
            Ime = p.Ime,
            Prezime=p.Prezime,
            Fleg = p.Fleg,
            Lozinkah = p.PasswordHash,
            Lozinkas = p.PasswordSalt,
            Pol = p.Pol, 
            Kredit = p.Krediti, 
            Ban=p.Ban}).ToListAsync());
        }

        
		[Authorize]
		[Route("VratiKorisnika/{id}")]
        [HttpGet]
         public async Task<ActionResult> VratiKorisnika(int id){
             try
             {
                 var k = await Context.Korisnici.FindAsync(id);
                 if(k != null){
                     return Ok(k);
                 }
                 else{
                     return BadRequest();
                 }
             }
             catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

        }

		[Authorize]
        [Route("VratiKorisnikePoStringu/{pattern}")]
        [HttpGet]
         public async Task<ActionResult> VratiKorisnikePoStringu(string pattern){
            try
            {

                var k = await Context.Korisnici.Include(a=>a.Ban)
                                                .Where(a=> a.Ban==null && (a.Username.Contains(pattern) 
                                                || a.Ime.Contains(pattern) 
                                                || a.Prezime.Contains(pattern))).ToListAsync();
                if(k != null){
                    return Ok(k);
                }
                else{
                    return BadRequest("Ne postoje korisnici.");
                }
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

        }



		[Authorize] 
        [Route("IzmeniGrad/{id}/{grad}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniGrad(int id,String grad){
            if(grad.Length > 50 || string.IsNullOrWhiteSpace(grad))
            {
                return BadRequest("Nevalidan unos grada!");
            }

            try
            {
                var k = await Context.Korisnici.FindAsync(id);
                if(k.Grad == grad){
                    return BadRequest("Uneli ste isti grad");
                }
                k.Grad = grad;
                await Context.SaveChangesAsync();
                return Ok("Grad je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }



		[Authorize]
        [Route("IzmeniDrzavu/{id}/{drzava}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniDrzavu(int id,String drzava){
            if(drzava.Length > 50 || string.IsNullOrWhiteSpace(drzava))
            {
                return BadRequest("Nevalidan unos drzave!");
            }

            try
            {
                var k = await Context.Korisnici.FindAsync(id);

                if(k.Drzava == drzava){
                    return BadRequest("Uneli ste istu drzavu");
                }

                k.Drzava = drzava;
                await Context.SaveChangesAsync();
                return Ok("Drzava je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }
		[Authorize]
        [Route("IzmeniEmail/{id}/{email}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniEmail(int id,String email){
            if(string.IsNullOrWhiteSpace(email))
            {
                return BadRequest("Unesi email!");
            }

            try
            {
                var k = await Context.Korisnici.Where(p => p.Email == email).FirstOrDefaultAsync();

                if(k != null)
                    return BadRequest("Vec postoji korisnik sa unetom email adresom!");

                k = await Context.Korisnici.FindAsync(id);

                if(k.Email == email){
                    return BadRequest("Uneli ste isti email");
                }

                k.Email = email;
                await Context.SaveChangesAsync();
                return Ok("Email je uspesno izmenjen!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }


        [Route("ProveriUsername/{Username}")]
        [HttpGet]
        public async Task<ActionResult> ProveriUsername(string Username){
            if(Username.Length > 50 || string.IsNullOrWhiteSpace(Username))
            {
                return BadRequest("Predugacko korisnicko ime!");
            }
            try
            {
                var k = await Context.Korisnici.Where(p => p.Username == Username).FirstOrDefaultAsync();

                if(k != null){
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }


        [Route("ProveriEmail/{Email}")]
        [HttpGet]
        public async Task<ActionResult> ProveriEmail(string Email){
            if(string.IsNullOrWhiteSpace(Email))
            {
                return BadRequest("Unesi email!");
            }
            try
            {
                var k = await Context.Korisnici.Where(p => p.Email == Email).FirstOrDefaultAsync();

                if(k != null){
                    return BadRequest();
                }
                return Ok();
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }


        
    }
}
