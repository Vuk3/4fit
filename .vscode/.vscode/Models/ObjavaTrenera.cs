using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    
    [Table("ObjavaTrenera")]
    public class ObjavaTrenera : Objava{


        public String Link { get; set; }

        public Trener Trener { get; set; }
        
    }
}