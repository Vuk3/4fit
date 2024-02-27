using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Trener")]
    public class Trener : Korisnik{
        
        [Required]
        [MaxLength(1000)]
        public String Biografija { get; set; }

        public List<ObjavaTrenera> Objave { get; set; }

        public List<Paket> Paketi { get; set; }

        public List<SertifikatiTrenera> Sertifikati { get; set; }

        public Trener(){
            this.Fleg = 't';
        }

        
    }
}