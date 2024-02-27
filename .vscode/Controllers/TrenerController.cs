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
    public class TrenerController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public TrenerController(_4fitContext context)
        {
            Context = context;
        }

        [Route("RegistrujTrenera")]
        [HttpPost]
        public async Task<ActionResult> RegistrujTrenera([FromBody] Trener t){
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

            try
            {
                var k = Context.Korisnici.Where(p => p.Username == t.Username).FirstOrDefault();
                if(k != null)
                    return BadRequest("Korisnicko ime je zauzeto!");
                k = Context.Korisnici.Where(p => p.Email == t.Email).FirstOrDefault();
                if(k != null)
                    return BadRequest("Vec postoji registracija sa unetom email adresom!");
                Context.Treneri.Add(t);
                await Context.SaveChangesAsync();
                return Ok("Uspesno ste se registrovali!");

                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

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

                k.Biografija = biografija;
                await Context.SaveChangesAsync();
                return Ok("Biografija je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

        
        

        

        
    }
}