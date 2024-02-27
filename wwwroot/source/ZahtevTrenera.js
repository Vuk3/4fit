import { MojePretplate } from "./MojePretplate.js";
import { parseJwt } from "./ParseJWT.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";

// import jwt_decode from './jwt-decode.js';


export class ZahtevTrenera{

    constructor(id, kolicina, brracuna, username, ime, prezime, idTrenera){
        this.id = id;
        this.kolicina = kolicina;
        this.username = username;
        this.brracuna = brracuna;
        this.idTrenera = idTrenera;
        this.ime = ime;
        this.prezime = prezime;
      }
    
    crtaj(host){
        let divGlZahTR = document.createElement("div");
        divGlZahTR.className = "divGlZahTR";
        host.appendChild(divGlZahTR);

            let divLevo = document.createElement("div");
            divLevo.className = "divLevo";
            divGlZahTR.appendChild(divLevo);

                let labUsername = document.createElement("label");
                labUsername.className = "labUsername";
                labUsername.innerHTML = this.username;
                divLevo.appendChild(labUsername);

                let labImeIP= document.createElement("label");
                labImeIP.className = "labImeIP";
                labImeIP.innerHTML = this.ime + " " + this.prezime;
                divLevo.appendChild(labImeIP);

                let labBrRac = document.createElement("label");
                labBrRac.className = "labBrRac";
                labBrRac.innerHTML = "Broj racuna : " + this.brracuna;
                divLevo.appendChild(labBrRac);

                let labKol = document.createElement("label");
                labKol.className = "labKol";
                labKol.innerHTML = "Kolicina za isplatu : "+this.kolicina;
                divLevo.appendChild(labKol);

            let divDesno = document.createElement("div");
            divDesno.className = "divDesno";
            divGlZahTR.appendChild(divDesno);

                let buttonIsplati = document.createElement("button");
                buttonIsplati.className = "buttonIsplati";
                buttonIsplati.innerHTML = "Isplaceno";
                divDesno.appendChild(buttonIsplati);

                buttonIsplati.onclick=()=>{
                    fetch("https://localhost:5001/Admin/Isplati/"+this.id,{
                            method:"DELETE",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                alert("Uspesno ste isplatili kredite treneru");
                                divGlZahTR.style.display = "none";
                            }
                            else{
                                s.text().then(p=>{
                                    console.log(p);
                                })
                                }
                            })

                }
    }
}