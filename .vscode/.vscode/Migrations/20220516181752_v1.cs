using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace _4fit.Migrations
{
    public partial class v1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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
                    Password = table.Column<string>(type: "nvarchar(40)", maxLength: 40, nullable: false),
                    Grad = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Drzava = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
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
                name: "ObjavaTrenera",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false),
                    Link = table.Column<string>(type: "nvarchar(max)", nullable: true),
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
                name: "IX_Pretplata_KlijentID",
                table: "Pretplata",
                column: "KlijentID");

            migrationBuilder.CreateIndex(
                name: "IX_Pretplata_PaketID",
                table: "Pretplata",
                column: "PaketID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ObjavaTrenera");

            migrationBuilder.DropTable(
                name: "OdgovorNaObjavu");

            migrationBuilder.DropTable(
                name: "Pretplata");

            migrationBuilder.DropTable(
                name: "NovaObjava");

            migrationBuilder.DropTable(
                name: "Klijent");

            migrationBuilder.DropTable(
                name: "Paket");

            migrationBuilder.DropTable(
                name: "Objava");

            migrationBuilder.DropTable(
                name: "Trener");

            migrationBuilder.DropTable(
                name: "Korisnik");
        }
    }
}
