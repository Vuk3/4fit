using Microsoft.EntityFrameworkCore.Migrations;

namespace _4fit.Migrations
{
    public partial class v3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Sertifikat",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Opis",
                table: "Sertifikat",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ObjavaID",
                table: "Korisnik",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pol",
                table: "Korisnik",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Korisnik_ObjavaID",
                table: "Korisnik",
                column: "ObjavaID");

            migrationBuilder.AddForeignKey(
                name: "FK_Korisnik_Objava_ObjavaID",
                table: "Korisnik",
                column: "ObjavaID",
                principalTable: "Objava",
                principalColumn: "ID",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Korisnik_Objava_ObjavaID",
                table: "Korisnik");

            migrationBuilder.DropIndex(
                name: "IX_Korisnik_ObjavaID",
                table: "Korisnik");

            migrationBuilder.DropColumn(
                name: "Opis",
                table: "Sertifikat");

            migrationBuilder.DropColumn(
                name: "ObjavaID",
                table: "Korisnik");

            migrationBuilder.DropColumn(
                name: "Pol",
                table: "Korisnik");

            migrationBuilder.AlterColumn<string>(
                name: "Naziv",
                table: "Sertifikat",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }
    }
}
