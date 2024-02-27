import { MojePretplate } from "./MojePretplate.js";
import { parseJwt } from "./ParseJWT.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";

// import jwt_decode from './jwt-decode.js';


export class ZahtevKlijenta{

    constructor(id, username, ime, prezime, slika, idKlijenta, kolicina){
        this.id = id;
        this.username = username;
        this.slika = slika;
        this.idKlijenta = idKlijenta
        this.ime = ime;
        this.prezime = prezime;
        this.kolicina = kolicina;
      }
    
    crtaj(host){
        let divGlZahKL = document.createElement("div");
        divGlZahKL.className = "divGlZahKL";
        host.appendChild(divGlZahKL);

            let divLevo = document.createElement("div");
            divLevo.className = "divLevo";
            divGlZahKL.appendChild(divLevo);

                let labUsername = document.createElement("label");
                labUsername.className = "labUsername";
                labUsername.innerHTML = this.username;
                divLevo.appendChild(labUsername);

                let labImeIP= document.createElement("label");
                labImeIP.className = "labImeIP";
                labImeIP.innerHTML = this.ime + " " + this.prezime;
                divLevo.appendChild(labImeIP);


                let labKol = document.createElement("label");
                labKol.className = "labKol";
                labKol.innerHTML = "Kolicina za uplatu : "+this.kolicina;
                divLevo.appendChild(labKol);

            let divSredina = document.createElement("div");
            divSredina.className = "divSredina";
            divGlZahKL.appendChild(divSredina);

                let slika = document.createElement("img");
                slika.src="data:image/*;base64,"+this.slika;
                slika.className = "ZahtevKlijenta";
                divSredina.appendChild(slika);

            let divDesno = document.createElement("div");
            divDesno.className = "divDesno";
            divGlZahKL.appendChild(divDesno);


                let inputUplata = document.createElement("input");
                inputUplata.className = "inputUplata";
                inputUplata.placeholder = "Kolicina za uplatu";
                divDesno.appendChild(inputUplata);
                
                let divDesnoButt = document.createElement("div");
                divDesnoButt.className = "divDesnoButt";
                divDesno.appendChild(divDesnoButt);

                let buttonUplati = document.createElement("button");
                buttonUplati.className = "buttonUplati";
                buttonUplati.innerHTML = "Uplati";
                divDesnoButt.appendChild(buttonUplati);

                buttonUplati.onclick=()=>{
                    let kol = inputUplata.value;

                    fetch("https://localhost:5001/Admin/Uplati/"+this.id+"/"+kol,{
                            method:"DELETE",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                alert("Uspesno ste uplatili kredite klijentu");
                                divGlZahKL.style.display = "none";
                            }
                            else{
                                s.text().then(p=>{
                                    console.log(p);
                                })
                                }
                            })

                }

                let buttonOdbij = document.createElement("button");
                buttonOdbij.className = "buttonOdbij";
                buttonOdbij.innerHTML = "Odbij";
                divDesnoButt.appendChild(buttonOdbij);

                buttonOdbij.onclick=()=>{

                    fetch("https://localhost:5001/Admin/Odbij/"+this.id,{
                            method:"DELETE",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                alert("Odbili ste zahtev");
                                divGlZahKL.style.display = "none";
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