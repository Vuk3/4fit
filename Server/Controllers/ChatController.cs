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
    public class ChatController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public ChatController(_4fitContext context)
        {
            Context = context;
        }


        [Authorize]
        [Route("NadjiTrenera/{id}/{username}")]
        [HttpGet]
        public async Task<ActionResult> NadjiTrenera(int id, string username){

            try
            {

                var k = await Context.Klijenti.FindAsync(id);
                var t = await Context.Treneri.Where(p=>p.Username==username).FirstOrDefaultAsync();

                if(t==null){
                    return BadRequest("Trener ne postoji");
                }

                var proba = await Context.Pretplate
                            .Include(p=>p.Klijent)
                            .Include(p=>p.Paket)
                            .ThenInclude(p=>p.Trener)
                            .Where(p=> p.Klijent.ID==id && p.Paket.Trener.ID==t.ID).FirstOrDefaultAsync();

                if(proba == null){
                    return BadRequest("Nisi pretplacen");
                }
                else{
                    return Ok(t);
                }
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }



        [Authorize]
        [Route("NadjiKlijenta/{id}/{username}")]
        [HttpGet]
        public async Task<ActionResult> NadjiKlijenta(int id, string username){

            try
            {

                var t = await Context.Treneri.FindAsync(id);
                var k = await Context.Klijenti.Where(p=>p.Username==username).FirstOrDefaultAsync();

                if(k==null){
                    return BadRequest("Klijent ne postoji");
                }

                var proba = await Context.Pretplate
                            .Include(p=>p.Klijent)
                            .Include(p=>p.Paket)
                            .ThenInclude(p=>p.Trener)
                            .Where(p=> p.Klijent.Username==username && p.Paket.Trener.ID==t.ID).FirstOrDefaultAsync();

                if(proba == null){
                    return BadRequest("Ovaj korisnik nije pretplacen kod vas");
                }
                else{
                    return Ok(k);
                }
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }


        [Authorize(Roles = "t")]
        [Route("PosaljiPorukuKaoTrener/{id}/{username}/{poruka}")]
        [HttpPost]
        public async Task<ActionResult> PosaljiPorukuKaoTrener(int id, string username, string poruka){

            try
            {

                var t = await Context.Treneri.FindAsync(id);
                var k = await Context.Klijenti.Where(p=>p.Username==username).FirstOrDefaultAsync();

                var veza = await Context.ChatVeze
                            .Include(p=>p.Klijent)
                            .Include(p=>p.Trener)
                            .Include(p=>p.Poruke)
                            .Where(p=>p.Klijent.ID==k.ID && p.Trener.ID==t.ID).FirstOrDefaultAsync();


                var p = new Poruka{
                    Fleg='t',
                    Sadrzaj=poruka,
                    Vreme=DateTime.Now
                };

                
                if (veza==null){
                    var v = new ChatVeza{
                        Klijent=k,
                        Trener=t,
                        Poruke=null
                    };

                    Context.ChatVeze.Add(v);

                    v.Poruke.Add(p);

                    p.ChatVeza=v;
                    await Context.SaveChangesAsync();

                    return Ok(Enumerable.Reverse(v.Poruke).ToList());
                }
                else{
                    veza.Poruke.Add(p);
                    p.ChatVeza=veza;
                    await Context.SaveChangesAsync();


                    return Ok(Enumerable.Reverse(veza.Poruke).ToList());
                }

            

            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

        [Authorize(Roles = "k")]
        [Route("PosaljiPorukuKaoKlijent/{id}/{username}/{poruka}")]
        [HttpPost]
        public async Task<ActionResult> PosaljiPorukuKaoKlijent(int id, string username, string poruka){

            try
            {

                var k = await Context.Klijenti.FindAsync(id);
                var t = await Context.Treneri.Where(p=>p.Username==username).FirstOrDefaultAsync();

                var veza = await Context.ChatVeze
                            .Include(p=>p.Klijent)
                            .Include(p=>p.Trener)
                            .Include(p=>p.Poruke)
                            .Where(p=>p.Klijent.ID==k.ID && p.Trener.ID==t.ID).FirstOrDefaultAsync();
                            


                var p = new Poruka{
                    Fleg='k',
                    Sadrzaj=poruka,
                    Vreme=DateTime.Now
                };

                
                if (veza==null){
                    var v = new ChatVeza{
                        Klijent=k,
                        Trener=t,
                        Poruke=null
                    };

                    // return Ok(v);

                    Context.ChatVeze.Add(v);

                    v.Poruke.Add(p);

                    p.ChatVeza=v;
                    await Context.SaveChangesAsync();

                    return Ok(Enumerable.Reverse(v.Poruke).ToList());

                }
                else{

                    veza.Poruke.Add(p);

                    p.ChatVeza=veza;

                    await Context.SaveChangesAsync();


                    return Ok(Enumerable.Reverse(veza.Poruke).ToList());
                }

                




            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

        [Authorize]
        [Route("VratiPoruke/{id}/{username}")]
        [HttpGet]
        public async Task<ActionResult> VratiPoruke(int id, string username){

            try
            {

                var a = await Context.ChatVeze
                            .Include(p=>p.Klijent)
                            .Include(p=>p.Trener)
                            .Include(p=>p.Poruke)
                            .Where(p=> (p.Klijent.ID==id && p.Trener.Username==username) || (p.Klijent.Username==username && p.Trener.ID==id))
                            .FirstOrDefaultAsync();


                var pom = await Context.Treneri.FindAsync(id);

                
                if (a==null){
                    if(pom==null){
                        var v = new ChatVeza{
                            Klijent= await Context.Klijenti.FindAsync(id),
                            Trener= await Context.Treneri.Where(p=>p.Username==username).FirstOrDefaultAsync(),
                            Poruke=null
                        };
                        Context.ChatVeze.Add(v);

                        await Context.SaveChangesAsync();
                    }
                    else{
                        var v = new ChatVeza{
                            Klijent= await Context.Klijenti.Where(p=>p.Username==username).FirstOrDefaultAsync(),
                            Trener= pom,
                            Poruke=null
                        };

                        Context.ChatVeze.Add(v);

                        await Context.SaveChangesAsync();
                    }



                    return Ok(null);
                }
                else if(a.Poruke==null){
                    return Ok(null);

                }
                else{
                    return Ok(Enumerable.Reverse(a.Poruke).ToList());

                }



            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }



        [Authorize]
        [Route("VratiSve")]
        [HttpGet]
        public async Task<ActionResult> VratiSve(){

            try
            {

                var a = await Context.ChatVeze
                            .Include(p=>p.Klijent)
                            .Include(p=>p.Trener)
                            .Include(p=>p.Poruke)
                            .ToListAsync();

                return Ok(a);
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }


        
    }
}