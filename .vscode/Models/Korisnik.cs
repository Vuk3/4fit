using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Korisnik")]
    public abstract class Korisnik{

        [Key]
        public int ID { get; set; }

        [Required]
        [MaxLength(50)]
        [RegularExpression(@"^[a-zA-Z]+$")]
        public String Ime { get; set; }

        [Required]
        [MaxLength(50)]
        [RegularExpression(@"^[a-zA-Z]+$")]
        public String Prezime { get; set; }

        [Required]
        [RegularExpression(@"^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$")]
        public String Email { get; set; }

        [Required]
        [MaxLength(50)]
        
        public String Username { get; set; }

        [Required]
        [MinLength(8)]
        [MaxLength(40)]
        public String Password { get; set; }

        [Required]
        [MaxLength(50)]
        [RegularExpression(@"^[a-zA-Z]+$")]
        public String Grad { get; set; }

        [Required]
        [MaxLength(50)]
        [RegularExpression(@"^[a-zA-Z]+$")]
        public String Drzava { get; set; }

        public char Fleg { get; set; }

        [Required]
        public DateTime DatumRodjenja { get; set; }

        [JsonIgnore]
        public List<NovaObjava> ObjaveNaForumu { get; set; }

        [JsonIgnore]
        public List<OdgovorNaObjavu> Odgovori { get; set; }




    }
}