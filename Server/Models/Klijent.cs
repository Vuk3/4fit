using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Klijent")]
    public class Klijent : Korisnik{
        
        [Required]
        public String Zanimanje { get; set; }

        [JsonIgnore]
        public List<ChatVeza> ChatVeze { get; set; }
        public List<Pretplata> Paketi { get; set; }

        public Klijent(){
            this.Fleg = 'k';
            this.Krediti=0;
        }
    }
}