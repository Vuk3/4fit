using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Slika")]
    public class Slika{

        //vise na vise
        
        [Key]
        public int ID { get; set; }

        public string url { get; set; }

        [JsonIgnore]
        public Trener Trener { get; set; }
     
    }
}