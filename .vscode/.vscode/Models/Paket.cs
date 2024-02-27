using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Paket")]
    public class Paket{

        [Key]
        public int ID { get; set; }

        [Required]
        public int Cena { get; set; }

        [Required]
        [MaxLength(1000)]
        public String Opis { get; set; }

        [Required]
        [MaxLength(200)]
        public String Naziv { get; set; }

        [Required]
        public int TrajanjePaketa { get; set; }  //u danima

        //slika

        public Trener Trener { get; set; }

        public List<Pretplata> Klijenti { get; set; }
    }
}