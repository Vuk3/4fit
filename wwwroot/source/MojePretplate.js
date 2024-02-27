import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";

export class MojePretplate{

    constructor(id, naziv, opis, cena, trajanje, idTrenera, unTrenera, datumOd, datumDo){
        this.id = id;
        this.naziv = naziv;
        this.opis = opis;
        this.cena = cena;
        this.trajanje =trajanje;
        this.idTrenera = idTrenera;
        this.unTrenera = unTrenera,
        this.datumDo = datumDo,
        this.datumOd = datumOd
    }

    crtajMojePretplate(host){
        host.innerHTML = " ";
        let divGlavni = document.createElement("div");
        divGlavni.className = "divPaketGlavni";
        host.appendChild(divGlavni);

            let divImeTr = document.createElement("div");
            divImeTr.className = "divImeTr";
            divGlavni.appendChild(divImeTr);

                let labImeTr = document.createElement("label");
                labImeTr.innerHTML = this.naziv;
                labImeTr.className = "labelaPaketIme";
                divImeTr.appendChild(labImeTr);

                let divOpis = document.createElement("div");
                divOpis.className = "divOpis";
                divGlavni.appendChild(divOpis);

                    let labOpis = document.createElement("label");
                    labOpis.className = "labOpis";
                    labOpis.innerHTML = this.opis;
                    divOpis.appendChild(labOpis);
                
            
            let divDonji = document.createElement("div");
            divDonji.className = "divDonji";
            divGlavni.appendChild(divDonji);

                let divCenaTrajanje = document.createElement("div");
                divCenaTrajanje.className = "divCenaTrajanje";
                divDonji.appendChild(divCenaTrajanje);

                
                    let labCena = document.createElement("label");
                    labCena.className = "labCena";
                    labCena.innerHTML = "Cena : " + this.cena + " ";
                    divCenaTrajanje.appendChild(labCena);

                    let labTrajanje = document.createElement("label");
                    labTrajanje.className = "labTrajanje";
                        let pom;
                        if(this.trajanje == 1)
                            pom = "mesec";
                        else if(this.trajanje != 1 && this.trajanje < 5)
                            pom = "meseca"

                        else pom = "meseci";
                    labTrajanje.innerHTML = "Duzina paketa : " + this.trajanje + " "+ pom;
                    divCenaTrajanje.appendChild(labTrajanje);

                    let divPreVreme = document.createElement("div");
                    divPreVreme.className = "divPreVreme";
                    divGlavni.appendChild(divPreVreme);

                        let labPrVreme = document.createElement("label");
                        labPrVreme.className = "labPrVreme";
                        labPrVreme.innerHTML = "Paket istice: " +this.datumDo;
                        divPreVreme.appendChild(labPrVreme);

                    
                }
                

    prikaziManje(host){
        host.removeChild(document.querySelector(".labOpis"));
        
        host.removeChild(document.querySelector(".labCena"));

        if(vratiFleg() == 'k'){
            host.removeChild(document.querySelector(".btnDugmePretplatiSe"));
        }

        host.parentNode.querySelector(".labelPrikVise").innerHTML = "Prikazi vise";
    }

    prikaziVise(host){
            host.innerHTML = " ";


            let labOpis = document.createElement("label");
            labOpis.className = "labOpis";
            labOpis.innerHTML = this.opis;
            host.appendChild(labOpis);

            let labCena = document.createElement("label");
            labCena.className = "labCena";
            labCena.innerHTML = "Cena : " + this.cena + " ";
            host.appendChild(labCena);

            if(vratiFleg() == 'k')
                        {
                        let dugmePretplatiSe = document.createElement("button");
                        dugmePretplatiSe.className = "btnDugmePretplatiSe";
                        dugmePretplatiSe.innerHTML="Pretplati se";
                        host.appendChild(dugmePretplatiSe);

                        dugmePretplatiSe.onclick=()=>{
                            fetch("https://localhost:5001/Pretplata/PretplatiSe/"+this.id+"/"+vratiID(),{
                                method:"POST",
                                headers: {
                                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                }
                            }).then(s=>{
                                if(s.ok){
                                    alert("Uspesno ste se pretplatili na paket");

                                }
                                else{
                                    s.text().then(p=>{
                                        alert(p);
                                    })
                                }
                            })
                        }
            }
            host.parentNode.querySelector(".labelPrikVise").innerHTML = "Prikazi manje";
        }

    prikFormaBrisanje(host){
        var result = confirm('Da li ste sigurni?');
        if (result == false){
            event.preventDefault();
        }
        else{
                fetch("https://localhost:5001/Paket/IzbrisiPaket/"+this.id,{
                    method:"DELETE",
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(s=>{
                    if(s.ok){
                            let l = host.parentNode;
                            l.removeChild(host);
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
        