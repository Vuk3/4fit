import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";


export class Prijava{
    crtajPrijavu(host){
        let pom = document.body.querySelector(".Prikaz");
        pom.innerHTML = "";

        let miniKontejner = document.createElement("div");
        miniKontejner.className="divPrijava";
        host.appendChild(miniKontejner);

        //deo za naslov, Prijavi se

        let d = document.createElement("div");
        d.className="divPrijavaNaslov";
        d.innerHTML="Prijavi se";
        miniKontejner.appendChild(d);

        //deo za Username

        d = document.createElement("div");
        d.className="divPrijavaUsername";
        miniKontejner.appendChild(d);

        let l = document.createElement("label");
        l.className="lblPrijavaUsername";
        l.innerHTML="Korisnicko ime";
        d.appendChild(l);

        let i = document.createElement("input");
        i.className="inputPrijavaUsername";
        d.appendChild(i);


        //deo za Password

        d = document.createElement("div");
        d.className="divPrijavaPassword";
        miniKontejner.appendChild(d);

        l = document.createElement("label");
        l.className="lblPrijavaPassword";
        l.innerHTML="Lozinka";
        d.appendChild(l);

        i = document.createElement("input");
        i.type="password";
        i.className="inputPrijavaPassword";
        d.appendChild(i);



        //Deo za dugme Prijavi se

        d = document.createElement("div");
        d.className="divPrijavaDugme";
        miniKontejner.appendChild(d);


        let btn = document.createElement("button");
        btn.className="btnPrijava";
        btn.innerHTML="Prijavi se";
        d.appendChild(btn);

        //$ IMPLEMENTIRATI ONCLICK ZA PRIJAVLJIVANJE

        btn.onclick=(ev)=>{
            let username1=miniKontejner.querySelector(".inputPrijavaUsername").value;
            let sifra1=host.querySelector(".inputPrijavaPassword").value;

            fetch("https://localhost:5001/Korisnik/PrijaviSe/"+username1+"/"+sifra1,{
                method:"GET",
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        alert("Uspesna prijava");
                        window.location.href = "./prijavljen";
                        // localStorage.setItem("id", data.id);
                        // localStorage.setItem("username", data.username);
                        // localStorage.setItem("fleg", data.fleg);
                        
                        this.crtajMojProfil(this.kontejner.querySelector(".Prikaz"));
                    })
                }
                else{
        
                }
            })
        }


    }
}