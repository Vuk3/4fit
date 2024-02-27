using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Models{

    [Table("Admin")]
    public class Admin{

        [Key]
        public int ID { get; set; }
        [Required]
        [MaxLength(50)]
        
        public String Username { get; set; }

        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }

        public char Fleg { get; set; }

        public Admin(){
            Fleg = 'a';
        }
    }
}
    