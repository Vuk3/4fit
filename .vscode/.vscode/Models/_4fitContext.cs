using Microsoft.EntityFrameworkCore;

namespace Models
{
    public class _4fitContext : DbContext
    {
        public DbSet<Korisnik> Korisnici { get; set; }
        public DbSet<Klijent> Klijenti  { get; set; }
        public DbSet<Trener> Treneri { get; set; }
        public DbSet<Objava> Objave { get; set; }
        public DbSet<NovaObjava> NoveObjave { get; set; }
        public DbSet<OdgovorNaObjavu> OdgovoriNaObjavu { get; set; }
        public DbSet<Paket> Paketi { get; set; }
        public DbSet<Pretplata> Pretplate { get; set; }
        public DbSet<ObjavaTrenera> ObjaveTrenera { get; set; }
        
        public _4fitContext(DbContextOptions options) : base(options)
        {


        }
    }
}