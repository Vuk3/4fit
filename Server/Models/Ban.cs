using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Ban")]
    public class Ban{

        [Key]
        public int ID { get; set; }
        
       
        [Required]
        public String Razlog { get; set; }

        [JsonIgnore]
        public Korisnik Korisnik { get; set; }


    }
}
    