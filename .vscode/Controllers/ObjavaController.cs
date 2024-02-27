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
    public class ObjavaController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public ObjavaController(_4fitContext context)
        {
            Context = context;
        }

        
        [Route("DodajTemu/{idKorisnika}/{naslov}/{sadrzaj}")]
        [HttpPost]
        public async Task<ActionResult> DodajTemu(int idKorisnika,String naslov, String sadrzaj){

            if(naslov.Length > 200 || string.IsNullOrWhiteSpace(naslov))
            {
                return BadRequest("Nevalidan naslov!");
            }

            if(sadrzaj.Length > 1000 || string.IsNullOrWhiteSpace(sadrzaj))
            {
                return BadRequest("Nevalidan sadrzaj!");
            }

            try
            {
                NovaObjava n = new NovaObjava();
                n.Sadrzaj=sadrzaj;
                n.Naslov=naslov;
                var kor = await Context.Korisnici.FindAsync(idKorisnika);
                n.Korisnik = kor;
                Context.NoveObjave.Add(n);
                await Context.SaveChangesAsync();

                return Ok("Objava je dodata");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }
        

        
        [Route("VratiTeme")]
        [HttpGet]
        public async Task<ActionResult> VratiTeme(){

            try
            {
                var o = await Context.NoveObjave
                        .Include(p => p.Korisnik)
                        .Include(p => p.Odgovori)
                        .ToListAsync();
                var rev = Enumerable.Reverse(o).ToList();
                return Ok(rev);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("DodajOdgovorNaTemu/{idTeme}/{idKorisnika}/{sadrzaj}")]
        [HttpPost]
        public async Task<ActionResult> DodajOdgovorNaTemu(int idTeme,int idKorisnika,string sadrzaj){
            if(sadrzaj.Length > 1000){
                return BadRequest("Predugacak odgovor!");
            }

            try
            {
                var kor = await Context.Korisnici.FindAsync(idKorisnika);
                var obj = await Context.NoveObjave.FindAsync(idTeme);

                var kom = new OdgovorNaObjavu();
                kom.Korisnik=kor;
                kom.Objava=obj;
                kom.Sadrzaj=sadrzaj;
                //obj.Odgovori.Add(kom);
                Context.OdgovoriNaObjavu.Add(kom);
                await Context.SaveChangesAsync();
                return Ok("Odgovor je uspesno dodat");
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }


    }
}