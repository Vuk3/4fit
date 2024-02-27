using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _4fit.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Fleg = table.Column<string>(type: "nvarchar(1)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Korisnik",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Ime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Prezime = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Drzava = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Fleg = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    Pol = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Krediti = table.Column<int>(type: "int", nullable: false),
                    DatumRodjenja = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Korisnik", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Objava",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Sadrzaj = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    DatumObjave = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BrojLajkova = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Objava", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Sertifikat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sertifikat", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Ban",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Razlog = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ban", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Ban_Korisnik_ID",
                        column: x => x.ID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Klijent",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Zanimanje = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Klijent", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Klijent_Korisnik_ID",
                        column: x => x.ID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Trener",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Biografija = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Trener", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Trener_Korisnik_ID",
                        column: x => x.ID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "LajkObjava",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ObjavaID = table.Column<int>(type: "int", nullable: true),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LajkObjava", x => x.ID);
                    table.ForeignKey(
                        name: "FK_LajkObjava_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_LajkObjava_Objava_ObjavaID",
                        column: x => x.ObjavaID,
                        principalTable: "Objava",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "NovaObjava",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Naslov = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    BrojKomentara = table.Column<int>(type: "int", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NovaObjava", x => x.ID);
                    table.ForeignKey(
                        name: "FK_NovaObjava_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_NovaObjava_Objava_ID",
                        column: x => x.ID,
                        principalTable: "Objava",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ZahtevKlijenta",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PodnosilacID = table.Column<int>(type: "int", nullable: true),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    Slika = table.Column<byte[]>(type: "varbinary(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZahtevKlijenta", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ZahtevKlijenta_Klijent_PodnosilacID",
                        column: x => x.PodnosilacID,
                        principalTable: "Klijent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ChatVeza",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    KlijentID = table.Column<int>(type: "int", nullable: true),
                    TrenerID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ChatVeza", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ChatVeza_Klijent_KlijentID",
                        column: x => x.KlijentID,
                        principalTable: "Klijent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ChatVeza_Trener_TrenerID",
                        column: x => x.TrenerID,
                        principalTable: "Trener",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ObjavaTrenera",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Slika = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    TrenerID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ObjavaTrenera", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ObjavaTrenera_Objava_ID",
                        column: x => x.ID,
                        principalTable: "Objava",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ObjavaTrenera_Trener_TrenerID",
                        column: x => x.TrenerID,
                        principalTable: "Trener",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Paket",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Cena = table.Column<int>(type: "int", nullable: false),
                    Opis = table.Column<string>(type: "nvarchar(1000)", maxLength: 1000, nullable: false),
                    Naziv = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    TrajanjePaketa = table.Column<int>(type: "int", nullable: false),
                    TrenerID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Paket", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Paket_Trener_TrenerID",
                        column: x => x.TrenerID,
                        principalTable: "Trener",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SertifikatiTrenera",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GodinaDobijanja = table.Column<int>(type: "int", nullable: false),
                    TrenerID = table.Column<int>(type: "int", nullable: true),
                    SertifikatID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SertifikatiTrenera", x => x.ID);
                    table.ForeignKey(
                        name: "FK_SertifikatiTrenera_Sertifikat_SertifikatID",
                        column: x => x.SertifikatID,
                        principalTable: "Sertifikat",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_SertifikatiTrenera_Trener_TrenerID",
                        column: x => x.TrenerID,
                        principalTable: "Trener",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ZahtevTrenera",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PodnosilacID = table.Column<int>(type: "int", nullable: true),
                    Kolicina = table.Column<int>(type: "int", nullable: false),
                    BrojRacuna = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ZahtevTrenera", x => x.ID);
                    table.ForeignKey(
                        name: "FK_ZahtevTrenera_Trener_PodnosilacID",
                        column: x => x.PodnosilacID,
                        principalTable: "Trener",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OdgovorNaObjavu",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    KorisnikID = table.Column<int>(type: "int", nullable: true),
                    ObjavaID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OdgovorNaObjavu", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OdgovorNaObjavu_Korisnik_KorisnikID",
                        column: x => x.KorisnikID,
                        principalTable: "Korisnik",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OdgovorNaObjavu_NovaObjava_ObjavaID",
                        column: x => x.ObjavaID,
                        principalTable: "NovaObjava",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_OdgovorNaObjavu_Objava_ID",
                        column: x => x.ID,
                        principalTable: "Objava",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Poruka",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ChatVezaID = table.Column<int>(type: "int", nullable: true),
                    Fleg = table.Column<string>(type: "nvarchar(1)", nullable: false),
                    Sadrzaj = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Vreme = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Poruka", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Poruka_ChatVeza_ChatVezaID",
                        column: x => x.ChatVezaID,
                        principalTable: "ChatVeza",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Pretplata",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DatumOd = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DatumDo = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PaketID = table.Column<int>(type: "int", nullable: true),
                    KlijentID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Pretplata", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Pretplata_Klijent_KlijentID",
                        column: x => x.KlijentID,
                        principalTable: "Klijent",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Pretplata_Paket_PaketID",
                        column: x => x.PaketID,
                        principalTable: "Paket",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ChatVeza_KlijentID",
                table: "ChatVeza",
                column: "KlijentID");

            migrationBuilder.CreateIndex(
                name: "IX_ChatVeza_TrenerID",
                table: "ChatVeza",
                column: "TrenerID");

            migrationBuilder.CreateIndex(
                name: "IX_LajkObjava_KorisnikID",
                table: "LajkObjava",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_LajkObjava_ObjavaID",
                table: "LajkObjava",
                column: "ObjavaID");

            migrationBuilder.CreateIndex(
                name: "IX_NovaObjava_KorisnikID",
                table: "NovaObjava",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_ObjavaTrenera_TrenerID",
                table: "ObjavaTrenera",
                column: "TrenerID");

            migrationBuilder.CreateIndex(
                name: "IX_OdgovorNaObjavu_KorisnikID",
                table: "OdgovorNaObjavu",
                column: "KorisnikID");

            migrationBuilder.CreateIndex(
                name: "IX_OdgovorNaObjavu_ObjavaID",
                table: "OdgovorNaObjavu",
                column: "ObjavaID");

            migrationBuilder.CreateIndex(
                name: "IX_Paket_TrenerID",
                table: "Paket",
                column: "TrenerID");

            migrationBuilder.CreateIndex(
                name: "IX_Poruka_ChatVezaID",
                table: "Poruka",
                column: "ChatVezaID");

            migrationBuilder.CreateIndex(
                name: "IX_Pretplata_KlijentID",
                table: "Pretplata",
                column: "KlijentID");

            migrationBuilder.CreateIndex(
                name: "IX_Pretplata_PaketID",
                table: "Pretplata",
                column: "PaketID");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikatiTrenera_SertifikatID",
                table: "SertifikatiTrenera",
                column: "SertifikatID");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikatiTrenera_TrenerID",
                table: "SertifikatiTrenera",
                column: "TrenerID");

            migrationBuilder.CreateIndex(
                name: "IX_ZahtevKlijenta_PodnosilacID",
                table: "ZahtevKlijenta",
                column: "PodnosilacID");

            migrationBuilder.CreateIndex(
                name: "IX_ZahtevTrenera_PodnosilacID",
                table: "ZahtevTrenera",
                column: "PodnosilacID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "Ban");

            migrationBuilder.DropTable(
                name: "LajkObjava");

            migrationBuilder.DropTable(
                name: "ObjavaTrenera");

            migrationBuilder.DropTable(
                name: "OdgovorNaObjavu");

            migrationBuilder.DropTable(
                name: "Poruka");

            migrationBuilder.DropTable(
                name: "Pretplata");

            migrationBuilder.DropTable(
                name: "SertifikatiTrenera");

            migrationBuilder.DropTable(
                name: "ZahtevKlijenta");

            migrationBuilder.DropTable(
                name: "ZahtevTrenera");

            migrationBuilder.DropTable(
                name: "NovaObjava");

            migrationBuilder.DropTable(
                name: "ChatVeza");

            migrationBuilder.DropTable(
                name: "Paket");

            migrationBuilder.DropTable(
                name: "Sertifikat");

            migrationBuilder.DropTable(
                name: "Objava");

            migrationBuilder.DropTable(
                name: "Klijent");

            migrationBuilder.DropTable(
                name: "Trener");

            migrationBuilder.DropTable(
                name: "Korisnik");
        }
    }
}
