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

        public DbSet<LajkObjava> LajkoviObjave { get; set; }

        public DbSet<ChatVeza> ChatVeze { get; set; }

        public DbSet<Poruka> Poruke { get; set; }
        public DbSet<Admin> Admini { get; set; }

        public DbSet<ZahtevKlijenta> ZahteviKlijenta { get; set; }

        
        public DbSet<ZahtevTrenera> ZahteviTrenera { get; set; }

        public DbSet<Ban> Banovi { get; set; }
        
        public _4fitContext(DbContextOptions options) : base(options)
        {


        }

        protected override void OnModelCreating(ModelBuilder modelBuilder){
             base.OnModelCreating(modelBuilder);
             modelBuilder.Entity<Korisnik>()
             .HasOne(p=>p.Ban)
             .WithOne(b=>b.Korisnik)
             .HasForeignKey<Ban>(c=>c.ID);
        }
    }
}