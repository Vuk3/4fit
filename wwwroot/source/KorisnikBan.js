import { MojePretplate } from "./MojePretplate.js";
import { parseJwt } from "./ParseJWT.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";
import { Trener } from "./Trener.js";
import { Klijent } from "./Klijent.js";

// import jwt_decode from './jwt-decode.js';


export class KorisnikBan{

    constructor(id, username, ime, prezime, razlog, idKorisnika){
        this.id = id;
        this.username = username;
        this.razlog = razlog;
        this.ime = ime;
        this.prezime = prezime;
        this.idKorisnika = idKorisnika;
      }
    
    crtaj(host){
        
        let divGlBan = document.createElement("div");
        divGlBan.className = "divGlBan";
        host.appendChild(divGlBan);

            let divLevo = document.createElement("div");
            divLevo.className = "divLevo";
            divGlBan.appendChild(divLevo);

                let labUsername = document.createElement("label");
                labUsername.className = "labUsername";
                labUsername.innerHTML = this.username;

                labUsername.onclick=()=>{
                    fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+this.id,{
                        method:"GET",
                         headers: {
                             'Authorization' : 'Bearer ' + localStorage.getItem("token")
                         }
                    }).then(s=>{
                        if(s.ok){
                            document.body.querySelector(".Search").style.display = "none";
                            s.json().then(data=>{ 
                                if (data.fleg == "k"){
                                    var k = new Klijent(data.id, data.ime, data.prezime,
                                        data.email, data.username, data.grad, data.drzava, 
                                        data.fleg, data.pol, data.datumRodjenja, data.zanimanje, data.krediti);
                                    k.crtajProfKlijenta(document.body.querySelector(".Prikaz"));
                                }
                                else if(data.fleg == "t"){
                                    var t = new Trener(data.id, data.ime, data.prezime,
                                        data.email, data.username, data.grad, data.drzava, 
                                        data.fleg, data.pol, data.datumRodjenja, data.biografija, data.krediti);
                                    t.crtajProfTrenera(document.body.querySelector(".Prikaz"));
                                }
                            });
                        }
                        else{

                        }
                    })
                }

                divLevo.appendChild(labUsername);

                let labImeIP= document.createElement("label");
                labImeIP.className = "labImeIP";
                labImeIP.innerHTML = this.ime + " " + this.prezime;
                divLevo.appendChild(labImeIP);

                let labRazlog = document.createElement("label");
                labRazlog.className = "labRazlog";
                labRazlog.innerHTML = this.razlog;
                divLevo.appendChild(labRazlog);

            let divDesno = document.createElement("div");
            divDesno.className = "divDesno";
            divGlBan.appendChild(divDesno);

                let buttonUnban = document.createElement("button");
                buttonUnban.className = "buttonUnban";
                buttonUnban.innerHTML = "Odbanuj";
                divDesno.appendChild(buttonUnban);

                buttonUnban.onclick=()=>{
                    fetch("https://localhost:5001/Admin/Odbanuj/"+this.id,{
                            method:"PUT",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                alert("Uspesno ste odbanovali korisnika");
                                divGlBan.style.display = "none";
                            }
                            else{
                                s.text().then(p=>{
                                    alert(p);
                                })
                                }
                            })

                }
    }
}