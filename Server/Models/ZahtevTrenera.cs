using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("ZahtevTrenera")]
    public class ZahtevTrenera{

        public int ID { get; set; }

        public Trener Podnosilac { get; set; }
        public int Kolicina { get; set; }
        public String BrojRacuna { get; set; }

    }
}