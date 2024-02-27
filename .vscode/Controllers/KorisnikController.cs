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
    public class KorisnikController : ControllerBase
    {
        /*private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<KorisnikController> _logger;

        public KorisnikController(ILogger<KorisnikController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
        }*/

        public _4fitContext Context { get; set; }

        public KorisnikController(_4fitContext context)
        {
            Context = context;
        }

        [Route("DodajKorisnika")]
        [HttpPost]
        public async Task<ActionResult> DodajKorisnika([FromBody] Trener k){
            Context.Treneri.Add(k);
            await Context.SaveChangesAsync();
            return Ok("Korisnik je uspešno izmenjen!");
        }

        [Route("VratiKorisnike")]
        [HttpGet]
        public async Task<ActionResult> VratiKorisnike(){
            return Ok(await Context.Korisnici.Select(p => new{ID = p.ID,Username = p.Username,Fleg = p.Fleg,Lozinka = p.Password}).ToListAsync());
        }

        [Route("PrijaviSe/{username}/{password}")]
        [HttpGet]
        public async Task<ActionResult> PrijaviSe(String username,String password){
            if(username.Length > 50 || string.IsNullOrWhiteSpace(username))
            {
                return BadRequest("Predugacko korisnicko ime!");
            }


            if(string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Unesi lozinku!");
            }

            if(password.Length > 40)
            {
                return BadRequest("Predugacka lozinka!");
            }

            if(password.Length < 8)
            {
                return BadRequest("Prekratka lozinka !");
            }

            try
            {
                var kor = await Context.Korisnici.Where(p => p.Username == username && p.Password == password)
                            .Select(p => new{Username = p.Username,Fleg = p.Fleg})
                            .FirstOrDefaultAsync();
                if(kor == null){
                    return BadRequest("Korisnik sa unetim korisnickim imenom i lozinkom ne postoji!");
                }

                return Ok(kor);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("IzmeniLozinku/{id}/{password}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniLozinku(int id,String password){
            if(string.IsNullOrWhiteSpace(password))
            {
                return BadRequest("Unesi lozinku!");
            }

            if(password.Length > 40)
            {
                return BadRequest("Predugacka lozinka!");
            }

            if(password.Length < 8)
            {
                return BadRequest("Prekratka lozinka !");
            }

            try
            {
                var k = await Context.Korisnici.FindAsync(id);

                k.Password = password;
                await Context.SaveChangesAsync();
                return Ok("Lozinka je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

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

                k.Grad = grad;
                await Context.SaveChangesAsync();
                return Ok("Grad je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

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

                k.Drzava = drzava;
                await Context.SaveChangesAsync();
                return Ok("Drzava je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

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

                k.Email = email;
                await Context.SaveChangesAsync();
                return Ok("Email je uspesno izmenjen!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }





        
    }
}
