using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Poruka")]
    public class Poruka{

        [Key]
        public int ID { get; set; }   

        [JsonIgnore]
        public ChatVeza ChatVeza { get; set; }

        public char Fleg { get; set; }

        public string Sadrzaj { get; set; }

        public DateTime Vreme { get; set; }
    
    
    }
}