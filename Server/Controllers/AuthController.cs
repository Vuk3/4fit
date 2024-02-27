using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Models;


namespace _4fit.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {
        public _4fitContext Context { get; set; }
        private readonly IConfiguration _configuration;

        public AuthController(_4fitContext context, IConfiguration configuration)
        {
            Context = context;
            _configuration = configuration;
        }

        [Route("Provera")]
        [HttpGet]
        // [Authorize]
        public ActionResult Provera(){
            if(User.Identity.IsAuthenticated)
                return Ok("ok");
            else
                return BadRequest();
        }


        [Route("RegistrujKlijenta/{Ime}/{Prezime}/{Email}/{Username}/{Password}/{Grad}/{Drzava}/{Datum}/{Pol}/{Zanimanje}")]
        [HttpPost]
        public async Task<ActionResult> RegistrujKlijenta(String Ime, String Prezime, String Email, String Username, String Password, String Grad, String Drzava, DateTime Datum,String Pol, String Zanimanje){
            if(Ime.Length > 50 || string.IsNullOrWhiteSpace(Ime))
            {
                return BadRequest("Nevalidan unos imena!");
            }

            if(Prezime.Length > 50 || string.IsNullOrWhiteSpace(Prezime))
            {
                return BadRequest("Nevalidan unos prezimena!");
            }

            if(string.IsNullOrWhiteSpace(Email))
            {
                return BadRequest("Unesi email!");
            }

            if(Username.Length > 50 || string.IsNullOrWhiteSpace(Username))
            {
                return BadRequest("Predugacko korisnicko ime!");
            }


            if(string.IsNullOrWhiteSpace(Password))
            {
                return BadRequest("Unesi lozinku!");
            }

            if(Password.Length > 40)
            {
                return BadRequest("Predugacka lozinka!");
            }

            if(Password.Length < 8)
            {
                return BadRequest("Prekratka lozinka!");
            }

            if(Drzava.Length > 50 || string.IsNullOrWhiteSpace(Drzava))
            {
                return BadRequest("Nevalidan unos drzave!");
            }

            if(Grad.Length > 50 || string.IsNullOrWhiteSpace(Grad))
            {
                return BadRequest("Nevalidan unos grada!");
            }

            if(string.IsNullOrWhiteSpace(Zanimanje))
            {
                return BadRequest("Unesite zanimanje!");
            }

            if(Zanimanje.Length > 1000 || string.IsNullOrWhiteSpace(Zanimanje))
            {
                return BadRequest("Nevalidan unos zanimanja!");
            }

            try
            {
                var k = Context.Korisnici.Where(p => p.Username == Username).FirstOrDefault();
                if(k != null)
                    return BadRequest("Korisnicko ime je zauzeto!");
                k = Context.Korisnici.Where(p => p.Email == Email).FirstOrDefault();
                if(k != null)
                    return BadRequest("Vec postoji registracija sa unetom email adresom!");
                
                CreatePasswordHash(Password, out byte[] PasswordHash, out byte[] PasswordSalt);
                
                Klijent t = new Klijent{
                    Ime=Ime,
                    Prezime=Prezime,
                    Email=Email,
                    Username=Username,
                    PasswordHash=PasswordHash,
                    PasswordSalt = PasswordSalt,
                    Grad=Grad,
                    Drzava=Drzava,
                    DatumRodjenja=Datum,
                    Pol = Pol,
                    Zanimanje=Zanimanje
                };
                Context.Klijenti.Add(t);
                await Context.SaveChangesAsync();
                return Ok(t); //PROMENI NAZAD

                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("RegistrujTrenera/{Ime}/{Prezime}/{Email}/{Username}/{Password}/{Grad}/{Drzava}/{Datum}/{Pol}/{Biografija}")]
        [HttpPost]
        public async Task<ActionResult> RegistrujTrenera(String Ime, String Prezime, String Email, String Username, String Password, String Grad, String Drzava, DateTime Datum,String Pol, String Biografija ){
            if(Ime.Length > 50 || string.IsNullOrWhiteSpace(Ime))
            {
                return BadRequest("Nevalidan unos imena!");
            }

            if(Prezime.Length > 50 || string.IsNullOrWhiteSpace(Prezime))
            {
                return BadRequest("Nevalidan unos prezimena!");
            }

            if(string.IsNullOrWhiteSpace(Email))
            {
                return BadRequest("Unesi email!");
            }

            if(Username.Length > 50 || string.IsNullOrWhiteSpace(Username))
            {
                return BadRequest("Predugacko korisnicko ime!");
            }


            if(string.IsNullOrWhiteSpace(Password))
            {
                return BadRequest("Unesi lozinku!");
            }

            if(Password.Length > 40)
            {
                return BadRequest("Predugacka lozinka!");
            }

            if(Password.Length < 8)
            {
                return BadRequest("Prekratka lozinka!");
            }

            if(Drzava.Length > 50 || string.IsNullOrWhiteSpace(Drzava))
            {
                return BadRequest("Nevalidan unos drzave!");
            }

            if(Grad.Length > 50 || string.IsNullOrWhiteSpace(Grad))
            {
                return BadRequest("Nevalidan unos grada!");
            }

            if(Biografija.Length > 1000 || string.IsNullOrWhiteSpace(Biografija))
            {
                return BadRequest("Nevalidan unos biografija!");
            }


            try
            {
                var k = Context.Korisnici.Where(p => p.Username == Username).FirstOrDefault();
                if(k != null)
                    return BadRequest("Korisnicko ime je zauzeto!");
                k = Context.Korisnici.Where(p => p.Email == Email).FirstOrDefault();
                if(k != null)
                    return BadRequest("Vec postoji registracija sa unetom email adresom!");

                CreatePasswordHash(Password, out byte[] PasswordHash, out byte[] PasswordSalt);

                Trener t = new Trener{
                    Ime=Ime,
                    Prezime=Prezime,
                    Email=Email,
                    Username=Username,
                    PasswordHash=PasswordHash,
                    PasswordSalt = PasswordSalt,
                    Grad=Grad,
                    Drzava=Drzava,
                    DatumRodjenja=Datum,
                    Pol = Pol,
                    Biografija=Biografija
                };
                Context.Treneri.Add(t);
                await Context.SaveChangesAsync();
                return Ok(t);

                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Authorize]
        [Route("LogOut")]
        [HttpPost]

        public async Task<IActionResult> LogOut(){
            await HttpContext.SignOutAsync();
            return RedirectToPage("/index");
        }


        [Route("PrijaviSe/{username}/{password}")]
        [HttpGet]
        public async Task<ActionResult> PrijaviSe(String username,String password){
            if(username.Length > 50 || string.IsNullOrWhiteSpace(username))
            {
                return BadRequest("Predugacko korisnicko ime!");
            }

            if(username=="-" && password=="-"){
                return BadRequest("Unesite korisnicko ime i lozinku.");
            }

            if(username=="-"){
                return BadRequest("Unesite korisnicko ime.");
            }

            if(password=="-"){
                return BadRequest("Unesite lozinku.");
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
                var adm = await Context.Admini.Where(p => p.Username == username)
                            .FirstOrDefaultAsync();

                
                

                if(adm != null){
                    if(!VerifyPasswordHash(password, adm.PasswordHash, adm.PasswordSalt))
                    return BadRequest("Pogresna sifra");

                    var token1 = CreateTokenAdmin(adm);
                        
                    return Ok(new{
                        token = token1,
                        id=adm.ID,
                        username=adm.Username,
                        fleg=adm.Fleg
                    });
                }
                var kor = await Context.Korisnici.Where(p => p.Username == username)
                            .FirstOrDefaultAsync();
                if(kor == null){
                    return BadRequest("Korisnik sa unetim korisnickim imenom ne postoji!");
                }

                if(!VerifyPasswordHash(password, kor.PasswordHash, kor.PasswordSalt))
                    return BadRequest("Pogresna sifra");

                var banovi = await Context.Banovi.Include(a=>a.Korisnik).Where(p => p.Korisnik.Username == username).FirstOrDefaultAsync();
                if(banovi != null)
                {
                    return BadRequest("Korisnik je banovan, javite se na mail o statusu vaseg bana");
                }  

                ProveriPretplate(kor.ID);

                var token2 = CreateToken(kor);
                    
                return Ok(new{
                    token = token2,
                    id=kor.ID,
                    username=kor.Username,
                    fleg=kor.Fleg
                });

            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Authorize(Roles = "k,a")]
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
                if(VerifyPasswordHash(password, k.PasswordHash, k.PasswordSalt))
                    return BadRequest("Probali ste da izmenite istu sifru");
                CreatePasswordHash(password, out byte[] PasswordHash, out byte[] PasswordSalt);
                k.PasswordHash = PasswordHash;
                k.PasswordSalt = PasswordSalt;
                await Context.SaveChangesAsync();
                return Ok("Lozinka je uspesno izmenjena!");
                
            }
            catch (Exception e)
            { 
                return Ok(e.Message);
            }

            
        }

        private void ProveriPretplate (int id) {
            var p =  Context.Pretplate
                        .Include(p=>p.Klijent)
                        .Include(p=>p.Paket)
                        .ThenInclude(p=>p.Trener)
                        .Where(p=>p.Klijent.ID==id || p.Paket.Trener.ID==id)
                        .ToList();

            if(p!=null){
                p.ForEach(s=>{
                    if(s.DatumDo<=DateTime.Now){
                        Context.Pretplate.Remove(s);
                    }
                });

                Context.SaveChanges();
            }
        }



        private async Task<ActionResult<string>> CreateTokenAdmin(Admin kor)
        {
            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Role , kor.Fleg.ToString()),
                new Claim(ClaimTypes.NameIdentifier, kor.ID.ToString()),
                new Claim(ClaimTypes.Name, kor.Username)

            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(8),
                signingCredentials: cred
            );

            var ci = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
            var cp = new ClaimsPrincipal(ci);
            await HttpContext.SignInAsync(cp);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private async Task<ActionResult<string>> CreateToken(Korisnik kor)
        {
            List<Claim> claims = new List<Claim>{
                new Claim(ClaimTypes.Role , kor.Fleg.ToString()),
                new Claim(ClaimTypes.NameIdentifier, kor.ID.ToString()),
                new Claim(ClaimTypes.Name, kor.Username)

            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                _configuration.GetSection("AppSettings:Token").Value));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddHours(8),
                signingCredentials: cred
            );

            var ci = new ClaimsIdentity(claims,CookieAuthenticationDefaults.AuthenticationScheme);
            var cp = new ClaimsPrincipal(ci);
            await HttpContext.SignInAsync(cp);
            
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash,  byte[] passwordSalt)
        {
             using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                return computedHash.SequenceEqual(passwordHash);
            }
        }

        private void CreatePasswordHash(string Password, out byte[] PasswordHash, out byte[] PasswordSalt){
            using (var hmac = new HMACSHA512())
            {
                PasswordSalt = hmac.Key;
                PasswordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(Password));
            }
        }

        
    

        [Route("RegistrujAdmina/{Username}/{Password}")]
        [HttpPost]
        public async Task<ActionResult> RegistrujAdmina(String Username, String Password){

            try
            {
                
                CreatePasswordHash(Password, out byte[] PasswordHash, out byte[] PasswordSalt);
                
                Admin t = new Admin{
                    Username=Username,
                    PasswordHash=PasswordHash,
                    PasswordSalt = PasswordSalt   
                };
                Context.Admini.Add(t);
                await Context.SaveChangesAsync();
                return Ok(t); //PROMENI NAZAD

                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
    }
}