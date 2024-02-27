using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("ChatVeza")]
    public class ChatVeza{

        [Key]
        public int ID { get; set; }   

        public Klijent Klijent { get; set; }

        public Trener Trener { get; set; }

        public List<Poruka> Poruke { get; set; }
    
    
    }
}