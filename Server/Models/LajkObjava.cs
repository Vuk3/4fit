using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("LajkObjava")]
    public class LajkObjava{

        //vise na vise
        
        [Key]
        public int ID { get; set; }

        public Objava Objava { get; set; }

        public Korisnik Korisnik { get; set; }
     
    }
}