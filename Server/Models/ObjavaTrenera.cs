using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    
    [Table("ObjavaTrenera")]
    public class ObjavaTrenera : Objava{


        [Column("Slika")]
        public byte[] Slika { get; set; }


        public Trener Trener { get; set; }
        
    }
}