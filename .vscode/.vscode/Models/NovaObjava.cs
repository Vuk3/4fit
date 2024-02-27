using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    
    [Table("NovaObjava")]
    public class NovaObjava : Objava{

        [Required]
        [MaxLength(200)]
        public String Naslov { get; set; }

        [Required]
        public int BrojKomentara { get; set; }

        public NovaObjava(){
            this.BrojKomentara = 0;
        }

        public Korisnik Korisnik { get; set; }

        public List<OdgovorNaObjavu> Odgovori { get; set; }
    }
}