using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Trener")]
    public class Trener : Korisnik{
        
        [Required]
        [MaxLength(1000)]
        public String Biografija { get; set; }

        public List<ObjavaTrenera> Objave { get; set; }

        [JsonIgnore]
        public List<Paket> Paketi { get; set; }


        [JsonIgnore]
        public List<ChatVeza> ChatVeze { get; set; }


        public List<SertifikatiTrenera> Sertifikati { get; set; }


        public Trener(){
            this.Fleg = 't';
            this.Krediti=0;
        }

        
    }
}