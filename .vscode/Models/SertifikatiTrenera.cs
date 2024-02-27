using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{

    [Table("SertifikatiTrenera")]
    public class SertifikatiTrenera{
        
        [Key]
        public int ID { get; set; }

        [Required]
        public int GodinaDobijanja { get; set; }

        public Trener Trener { get; set; }

        public Sertifikat Sertifikat { get; set; }

        

        
    }
}