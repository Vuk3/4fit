using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Models;

namespace _4fit.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class KlijentController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public KlijentController(_4fitContext context)
        {
            Context = context;
        }

        [Route("RegistrujKlijenta")]
        [HttpPost]
        public async Task<ActionResult> RegistrujKlijenta([FromBody] Klijent t){
            if(t.Ime.Length > 50 || string.IsNullOrWhiteSpace(t.Ime))
            {
                return BadRequest("Nevalidan unos imena!");
            }

            if(t.Prezime.Length > 50 || string.IsNullOrWhiteSpace(t.Prezime))
            {
                return BadRequest("Nevalidan unos prezimena!");
            }

            if(string.IsNullOrWhiteSpace(t.Email))
            {
                return BadRequest("Unesi email!");
            }

            if(t.Username.Length > 50 || string.IsNullOrWhiteSpace(t.Username))
            {
                return BadRequest("Predugacko korisnicko ime!");
            }


            if(string.IsNullOrWhiteSpace(t.Password))
            {
                return BadRequest("Unesi lozinku!");
            }

            if(t.Password.Length > 40)
            {
                return BadRequest("Predugacka lozinka!");
            }

            if(t.Password.Length < 8)
            {
                return BadRequest("Prekratka lozinka!");
            }

            if(t.Drzava.Length > 50 || string.IsNullOrWhiteSpace(t.Drzava))
            {
                return BadRequest("Nevalidan unos drzave!");
            }

            if(t.Grad.Length > 50 || string.IsNullOrWhiteSpace(t.Grad))
            {
                return BadRequest("Nevalidan unos grada!");
            }

            if(string.IsNullOrWhiteSpace(t.Zanimanje))
            {
                return BadRequest("Unesite zanimanje!");
            }

            try
            {
                var k = Context.Korisnici.Where(p => p.Username == t.Username).FirstOrDefault();
                if(k != null)
                    return BadRequest("Korisnicko ime je zauzeto!");
                k = Context.Korisnici.Where(p => p.Email == t.Email).FirstOrDefault();
                if(k != null)
                    return BadRequest("Vec postoji registracija sa unetom email adresom!");
                Context.Klijenti.Add(t);
                await Context.SaveChangesAsync();
                return Ok("Uspesno ste se registrovali!");

                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("IzmeniZanimanje/{id}/{zanimanje}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniZanimanje(int id,String zanimanje){

            try
            {
                var k = await Context.Klijenti.FindAsync(id);

                k.Zanimanje = zanimanje;
                await Context.SaveChangesAsync();
                return Ok("Zanimanje je uspesno izmenjeno!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }
        

        

        
    }
}