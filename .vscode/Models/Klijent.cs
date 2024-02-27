using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Klijent")]
    public class Klijent : Korisnik{
        
        [Required]
        public String Zanimanje { get; set; }

        public List<Pretplata> Paketi { get; set; }

        public Klijent(){
            this.Fleg = 'k';
        }
    }
}