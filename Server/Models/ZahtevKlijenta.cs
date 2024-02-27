using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("ZahtevKlijenta")]
    public class ZahtevKlijenta{

        public int ID { get; set; }

        public Klijent Podnosilac { get; set; }
        public int Kolicina { get; set; }

        public byte[] Slika { get; set; }
    }
}