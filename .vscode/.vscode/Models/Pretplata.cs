using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("Pretplata")]
    public class Pretplata{

        public int ID { get; set; }

        public DateTime DatumOd { get; set; }

        public DateTime DatumDo { get; set; }

        public Paket Paket { get; set; }

        public Klijent Klijent { get; set; }
    }
}