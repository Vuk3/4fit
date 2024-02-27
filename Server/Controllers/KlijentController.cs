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
    [Authorize(Roles = "k")]
    public class KlijentController : ControllerBase
    {
        

        public _4fitContext Context { get; set; }

        public KlijentController(_4fitContext context)
        {
            Context = context;
        }

        [Route("IzmeniZanimanje/{id}/{zanimanje}")]
        [HttpPut]
        public async Task<ActionResult> IzmeniZanimanje(int id,String zanimanje){

            try
            {
                var k = await Context.Klijenti.FindAsync(id);

                if (k == null){
                    return BadRequest("Ne postoji klijent");
                }

                k.Zanimanje = zanimanje;
                await Context.SaveChangesAsync();
                return Ok("Zanimanje je uspesno izmenjeno!");
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }

        [Route("DodajKredite/{id}/{krediti}")]
        [HttpPut]
        public async Task<ActionResult> DodajKredite(int id,int krediti){

            try
            {
                var k = await Context.Klijenti.FindAsync(id);

                if (k == null){
                    return BadRequest("Ne postoji klijent");
                }

                k.Krediti+=krediti;

                await Context.SaveChangesAsync();
                return Ok(k.Krediti);
                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }

            
        }


        [Route("VratiMojePakete/{id}")]
        [HttpGet]
        public async Task<ActionResult> VratiMojePakete(int id){
            try
            {
                var k = await Context.Klijenti
                                    .Include(k => k.Paketi)
                                    .Where(p => p.ID == id)
                                    .ToListAsync();
                return Ok(k);

                
            }
            catch (Exception e)
            { 
                return BadRequest(e.Message);
            }
        }
        

        

        
    }
}