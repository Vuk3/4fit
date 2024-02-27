using Microsoft.EntityFrameworkCore.Migrations;

namespace _4fit.Migrations
{
    public partial class v2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Fleg",
                table: "Korisnik",
                type: "nvarchar(1)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Sertifikat",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Naziv = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sertifikat", x => x.ID);
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

            migrationBuilder.CreateIndex(
                name: "IX_SertifikatiTrenera_SertifikatID",
                table: "SertifikatiTrenera",
                column: "SertifikatID");

            migrationBuilder.CreateIndex(
                name: "IX_SertifikatiTrenera_TrenerID",
                table: "SertifikatiTrenera",
                column: "TrenerID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SertifikatiTrenera");

            migrationBuilder.DropTable(
                name: "Sertifikat");

            migrationBuilder.DropColumn(
                name: "Fleg",
                table: "Korisnik");
        }
    }
}
