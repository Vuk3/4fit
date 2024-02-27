using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Sertifikat")]
    public class Sertifikat{

        //vise na vise
        
        [Key]
        public int ID { get; set; }

        [Required]
        public String Naziv { get; set; }

        [Required]
        public String Opis { get; set; }

        // [Required]
        // public String Izdavac { get; set; }

        public List<SertifikatiTrenera> Treneri { get; set; }

        
    }
}