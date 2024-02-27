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
    public class ObjavaController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public ObjavaController(_4fitContext context)
        {
            Context = context;
        }

		[Authorize(Roles = "k,t")]
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
                        .ThenInclude(p=>p.Ban)
                        .Include(p => p.Odgovori)
                        .Where(p=>p.Korisnik.Ban==null)
                        .Select(p => 
                            new{
                                id = p.ID,
                                naslov = p.Naslov,
                                sadrzaj = p.Sadrzaj,
                                datumObjave = p.DatumObjave.ToString("dd/MM/yyyy"),
                                brojLajkova = p.BrojLajkova,
                                brojKomentara = p.BrojKomentara,
                                username = p.Korisnik.Username 
                        })
                        .ToListAsync();
                var rev = Enumerable.Reverse(o).ToList();
                return Ok(rev);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("VratiTemu/{idTeme}")]
        [HttpGet]
        public async Task<ActionResult> VratiTemu(int idTeme){
            try
            {
                var tema = await Context.NoveObjave
                            .Include(p => p.Korisnik)
                            .Include(p => p.Odgovori)
                            .Where(p => p.ID == idTeme)
                            .Select(p => 
                                new{
                                    id = p.ID,
                                    naslov = p.Naslov,
                                    sadrzaj = p.Sadrzaj,
                                    datumObjave = p.DatumObjave.ToString("dd/MM/yyyy"),
                                    brojLajkova = p.BrojLajkova,
                                    brojKomentara = p.BrojKomentara,
                                    Korisnik = p.Korisnik.Username,
                                    odgovori = p.Odgovori.Select(q => 
                                        new{
                                            sadrzaj = q.Sadrzaj,
                                            korisnik = q.Korisnik.Username,
                                            datumObjave = q.DatumObjave.ToString("dd/MM/yyyy"),
                                            brojLajkova = q.BrojLajkova
                                    }),
                                    korisniciKojiSuLajkovali = p.KorisniciKojiSuLajkovali.Select(q => 
                                        new{
                                            korisnik = q.Korisnik.Username
                                        })
                                    

                             })
                            .FirstOrDefaultAsync();
                return Ok(tema);
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

		[Authorize(Roles = "k,t")]
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
                obj.BrojKomentara++;
                Context.OdgovoriNaObjavu.Add(kom);
                await Context.SaveChangesAsync();
                return Ok("Odgovor je uspesno dodat");
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }

		[Authorize(Roles = "t")]
        [Route("BrisiObjTrenera/{idObjave}/{idTrenera}")]
        [HttpDelete]
        public async Task<ActionResult> BrisiObjTrenera(int idObjave, int idTrenera){
            try
            {
                var tema = await Context.ObjaveTrenera.Include(a=>a.KorisniciKojiSuLajkovali).Include(b=>b.Trener).Where(p=> p.ID == idObjave
                && p.Trener.ID == idTrenera).FirstOrDefaultAsync();
                if(tema == null){
                    return BadRequest("Nije vasa objava");
                }
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

		[Authorize(Roles = "k,t")]
        [Route("BrisiTemu/{idKorisnika}/{idTeme}")]
        [HttpDelete]
        public async Task<ActionResult> BrisiTemu(int idKorisnika,int idTeme){
            try
            {
                var kor = await Context.Korisnici.FindAsync(idKorisnika);
                var tema = await Context.NoveObjave.Include(p=>p.KorisniciKojiSuLajkovali).Where(p=>p.ID==idTeme).FirstOrDefaultAsync();
                if(tema.Korisnik.ID != kor.ID)
                    return BadRequest("Mozete brisati samo svoje objave!");
                var odgovori = await Context.OdgovoriNaObjavu.Include(p=>p.KorisniciKojiSuLajkovali).Where(p => p.Objava.ID == idTeme).ToListAsync();
                odgovori.ForEach(p => {
                     p.KorisniciKojiSuLajkovali.ForEach(s=>{
                        Context.LajkoviObjave.Remove(s);
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

		[Authorize(Roles = "k,t")]
        [Route("BrisiOdgovor/{idKorisnika}/{idOdgovora}")]
        [HttpDelete]
        public async Task<ActionResult> BrisiOdgovor(int idKorisnika,int idOdgovora){
            try
            {
                var kor = await Context.Korisnici.FindAsync(idKorisnika);
                var odg = await Context.OdgovoriNaObjavu
                            .Include(p=>p.KorisniciKojiSuLajkovali)
                            .Include(p => p.Korisnik)
                            .Include(p => p.Objava)
                            .Where(p => p.ID == idOdgovora).FirstOrDefaultAsync();
                if(odg.Korisnik.ID != kor.ID)
                    return BadRequest("Mozete brisati samo svoje objave!");

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

        
        [Route("VratiOdgovore/{idObjave}/{smer}")]
        [HttpGet]
        public async Task<ActionResult> VratiOdgovore(int idObjave,int smer){

            try
            {
                var obj = await Context.OdgovoriNaObjavu.Where(p => p.Objava.ID == idObjave)
                                .Include(p=>p.KorisniciKojiSuLajkovali)
                                .ThenInclude(p=>p.Korisnik)
                                .ThenInclude(p=>p.Ban)
                                .Include(p => p.Korisnik)
                                .ThenInclude(p=>p.Ban)
                                .Where(p=>p.Korisnik.Ban==null)
                                // .Select(p => new{
                                //     id = p.ID,
                                //     sadrzaj = p.Sadrzaj,
                                //     datumObjave = p.DatumObjave.ToString("dd/MM/yyyy"),
                                //     brojLajkova = p.BrojLajkova,
                                //     korisnik = p.Korisnik.Username,
                                //     idKorisnika = p.Korisnik.ID
                                // })
                                .ToListAsync();
                obj.ForEach(p=>{
                    p.KorisniciKojiSuLajkovali.ForEach(s=>{
                        if(s.Korisnik.Ban!=null){
                            p.BrojLajkova--;
                        }
                    });
                });

                if(smer == 1)
                    return Ok(obj.Select(p => new{
                                    id = p.ID,
                                    sadrzaj = p.Sadrzaj,
                                    datumObjave = p.DatumObjave.ToString("dd/MM/yyyy"),
                                    brojLajkova = p.BrojLajkova,
                                    korisnik = p.Korisnik.Username,
                                    idKorisnika = p.Korisnik.ID
                                }));
                else return Ok(Enumerable.Reverse(obj.Select(p => new{
                                    id = p.ID,
                                    sadrzaj = p.Sadrzaj,
                                    datumObjave = p.DatumObjave.ToString("dd/MM/yyyy"),
                                    brojLajkova = p.BrojLajkova,
                                    korisnik = p.Korisnik.Username,
                                    idKorisnika = p.Korisnik.ID
                                })).ToList());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

        }

        [Route("VratiBrojObjava")]
        [HttpGet]
        public async Task<ActionResult> VratiBrojObjava(){
            try
            {
                var objave = await Context.NoveObjave.Include(p=>p.Korisnik).ThenInclude(p=>p.Ban).Where(p=>p.Korisnik.Ban==null).ToListAsync();
                var n = 0;
                objave.ForEach(p => {
                    n++;
                });
                return Ok(n);
            }
            catch (Exception e)
            {    
                return BadRequest(e.Message);
            }
        }

        [Route("VratiBrojObjavaString/{pattern}")]
        [HttpGet]
        public async Task<ActionResult> VratiBrojObjavaString(string pattern){
            try
            {
                var objave = await Context.NoveObjave
                                .Include(p=>p.Korisnik)
                                .ThenInclude(p=>p.Ban)
                                .Where(p=>p.Korisnik.Ban==null && p.Naslov.Contains(pattern)).ToListAsync();
                var n = 0;
                objave.ForEach(p => {
                    n++;
                });
                return Ok(n);
            }
            catch (Exception e)
            {    
                return BadRequest(e.Message);
            }
        }

		[Authorize(Roles = "k,t")]
        [Route("LajkujObjavu/{idObjave}/{idKorisnika}")]
        [HttpPut]
        public async Task<ActionResult> LajkujObjavu(int idObjave,int idKorisnika){
            try
            {
                var obj = await Context.Objave
                        .Include(p => p.KorisniciKojiSuLajkovali)
                        .ThenInclude(p => p.Korisnik)
                        .Where(p => p.ID == idObjave)
                        .FirstOrDefaultAsync();
                var kor = await Context.Korisnici.FindAsync(idKorisnika);

                obj.KorisniciKojiSuLajkovali.ForEach(p => {
                    if(p.Korisnik.ID == idKorisnika)
                         throw new Exception("Korisnik je vec lajkovao!");
                });

                var pom = new LajkObjava{
                    Korisnik = kor,
                    Objava = obj
                };

                Context.LajkoviObjave.Add(pom);

                obj.BrojLajkova++;
                await Context.SaveChangesAsync();
                return Ok(obj.BrojLajkova);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

		[Authorize(Roles = "k,t")]
        [Route("OdlajkujObjavu/{idObjave}/{idKorisnika}")]
        [HttpPut]
        public async Task<ActionResult> OdlajkujObjavu(int idObjave,int idKorisnika){
            try
            {
                var obj = await Context.Objave.Include(p => p.KorisniciKojiSuLajkovali)
                            .Where(p => p.ID == idObjave)
                            .Include(p => p.KorisniciKojiSuLajkovali)
                            .ThenInclude(p => p.Korisnik)
                            .FirstOrDefaultAsync();
                var kor = await Context.Korisnici.FindAsync(idKorisnika);
                var pom = await Context.LajkoviObjave.Where(p => p.Korisnik == kor && p.Objava == obj).FirstOrDefaultAsync();
                var i = 0;
                obj.KorisniciKojiSuLajkovali.ForEach(p => {
                    if(p.Korisnik == kor){
                        obj.BrojLajkova--;
                        Context.LajkoviObjave.Remove(pom);
                        i = 1;
                    }
                });
                /*if(obj.KorisniciKojiSuLajkovali.Contains(kor)){
                    obj.BrojLajkova--;
                    obj.KorisniciKojiSuLajkovali.Remove(kor);
                    await Context.SaveChangesAsync();
                    return Ok("Odlajkovali ste objavu!");
                }*/
                if(i == 1){
                    await Context.SaveChangesAsync();
                    return Ok(obj.BrojLajkova);
                }
                return BadRequest("Korisnik nije lajkovao poruku");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

		[Authorize(Roles = "k,t")]
        [Route("ProveriLajk/{idObjave}/{idKorisnika}")]
        [HttpGet]
        public async Task<ActionResult> ProveriLajk(int idObjave,int idKorisnika){
            try
            {
                var obj = await Context.Objave.FindAsync(idObjave);
                var kor = await Context.Korisnici.FindAsync(idKorisnika);

                var pom = await Context.LajkoviObjave.Where(p => p.Objava == obj && p.Korisnik == kor).FirstOrDefaultAsync();

                if(pom != null) return Ok(true);
                else return Ok(false);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        /*[Route("VratiBrojLajkova/{idObjave}")]
        [HttpGet]
        public async Task<ActionResult> VratiBrojLajkova(int idObjave){
            try
            {
                var obj = await Context.Objave.FindAsync(idObjave);
                return Ok(obj.BrojLajkova);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);               
            }
        }*/

        [Route("VratiTeme/{idStranice}")]
        [HttpGet]
        public async Task<ActionResult> VratiTeme(int idStranice){
            try
            {
                var o = await Context.NoveObjave
                .AsNoTracking()
                .Include(p=>p.KorisniciKojiSuLajkovali)
                .ThenInclude(p=>p.Korisnik)
                .ThenInclude(p=>p.Ban)
                .Include(p => p.Korisnik)
                .ThenInclude(p=>p.Ban)
                .Include(p => p.Odgovori)
                .ThenInclude(p=>p.Korisnik)
                .ThenInclude(p=>p.Ban)
    

                .Where(p=>p.Korisnik.Ban==null)
                .AsSplitQuery()

                .ToListAsync();

                var rev = Enumerable.Reverse(o).ToList();
                
                rev.ForEach(p=>{
                    p.Odgovori.ForEach(s=>{
                        if(s.Korisnik.Ban!=null){
                            p.BrojKomentara--;
                        }
                    });

                    p.KorisniciKojiSuLajkovali.ForEach(s=>{
                        if(s.Korisnik.Ban!=null){
                            p.BrojLajkova--;
                        }
                    });
                });



                //Logika za 10 po 10, moz se doda nova tipa ako imamo izbor koliko tema po stranici
                var k = (idStranice-1)*10;
                var s=0;
                rev.ForEach(p => s++);
                var ss=0;
                if(s-k > 10)
                    ss = 10;
                else ss = s-k;
    
                var lista = new List<NovaObjava>();
                for(var i = k; i<k+ss; i++){
                    lista.Add(rev[i]);
                }
                
                return Ok(lista.Select(p=>
                new{
                    id = p.ID,
                    naslov = p.Naslov,
                    sadrzaj = p.Sadrzaj,
                    datumObjave = p.DatumObjave.ToString("dd/MM/yyyy"),
                    brojLajkova = p.BrojLajkova,
                    brojKomentara = p.BrojKomentara,
                    username = p.Korisnik.Username,
                    idKorisnika = p.Korisnik.ID
                }));
            }
            catch (Exception e)
            {
            return BadRequest(e.Message);
            }



        }

        [Route("VratiTemeString/{idStranice}/{pattern}")]
        [HttpGet]
        public async Task<ActionResult> VratiTemeString(int idStranice, string pattern){
            try
            {
                var o = await Context.NoveObjave
                .AsNoTracking()
                .Include(p=>p.KorisniciKojiSuLajkovali)
                .ThenInclude(p=>p.Korisnik)
                .ThenInclude(p=>p.Ban)
                .Include(p => p.Korisnik)
                .ThenInclude(p=>p.Ban)
                .Include(p => p.Odgovori)
                .ThenInclude(p=>p.Korisnik)
                .ThenInclude(p=>p.Ban)
    

                .Where(p=>p.Korisnik.Ban==null && p.Naslov.Contains(pattern))
                .AsSplitQuery()

                .ToListAsync();

                var rev = Enumerable.Reverse(o).ToList();
                
                rev.ForEach(p=>{
                    p.Odgovori.ForEach(s=>{
                        if(s.Korisnik.Ban!=null){
                            p.BrojKomentara--;
                        }
                    });

                    p.KorisniciKojiSuLajkovali.ForEach(s=>{
                        if(s.Korisnik.Ban!=null){
                            p.BrojLajkova--;
                        }
                    });
                });



                //Logika za 10 po 10, moz se doda nova tipa ako imamo izbor koliko tema po stranici
                var k = (idStranice-1)*10;
                var s=0;
                rev.ForEach(p => s++);
                var ss=0;
                if(s-k > 10)
                    ss = 10;
                else ss = s-k;
    
                var lista = new List<NovaObjava>();
                for(var i = k; i<k+ss; i++){
                    lista.Add(rev[i]);
                }
                
                return Ok(lista.Select(p=>
                new{
                    id = p.ID,
                    naslov = p.Naslov,
                    sadrzaj = p.Sadrzaj,
                    datumObjave = p.DatumObjave.ToString("dd/MM/yyyy"),
                    brojLajkova = p.BrojLajkova,
                    brojKomentara = p.BrojKomentara,
                    username = p.Korisnik.Username,
                    idKorisnika = p.Korisnik.ID
                }));
            }
            catch (Exception e)
            {
            return BadRequest(e.Message);
            }



        }

		[Authorize]
        [Route("VratiObjavePocetna")]
        [HttpGet]
        public async Task<ActionResult> VratiObjavePocetna(){
            var ObjaveTrenera = await Context.ObjaveTrenera
                                        .Include(p => p.Trener)
                                        .ThenInclude(p=>p.Ban)
                                        .Where(p=>p.Trener.Ban==null)
                                        .Select(a => new{
                                            id = a.ID,
                                            slika = a.Slika,
                                            trenerid = a.Trener.ID,
                                            trenerusername = a.Trener.Username,
                                            datum = a.DatumObjave.ToString("dd/MM/yyyy"),
                                            brojlajkova = a.BrojLajkova,
                                            opis = a.Sadrzaj
                                        }).ToListAsync();
            return Ok(Enumerable.Reverse(ObjaveTrenera).ToList());
        }
      


    }

   
}