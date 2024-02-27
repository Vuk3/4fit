using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Models{
    
    [Table("Objava")]
    public abstract class Objava{

        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(1000)]
        public String Sadrzaj { get; set; }  //tekst na forumu / opis na postu

        [Required]
        public DateTime DatumObjave { get; set; }

        [Required]
        public int BrojLajkova { get; set; }

        public Objava(){
            this.BrojLajkova = 0;
            this.DatumObjave = DateTime.Now;
        }




    }
}