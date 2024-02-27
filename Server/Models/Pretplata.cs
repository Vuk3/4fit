using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Pretplata")]
    public class Pretplata{

        public int ID { get; set; }

        public DateTime DatumOd { get; set; }

        public DateTime DatumDo { get; set; }
        [JsonIgnore]
        public Paket Paket { get; set; }
        [JsonIgnore]
        public Klijent Klijent { get; set; }
    }
}