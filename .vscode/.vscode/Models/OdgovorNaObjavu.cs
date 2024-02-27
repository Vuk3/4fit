using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{
    
    [Table("OdgovorNaObjavu")]
    public class OdgovorNaObjavu : Objava{

        
        public Korisnik Korisnik { get; set; }

        [JsonIgnore]
        public NovaObjava Objava { get; set; }
    }
}