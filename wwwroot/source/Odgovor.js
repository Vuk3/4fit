import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";
import { Trener } from "./Trener.js";
import { Klijent } from "./Klijent.js";

export class Odgovor{
    constructor(id,sadrzaj,brojLajkova,datumObjave,korisnik,idKorisnika){
        this.id = id;
        this.sadrzaj = sadrzaj;
        this.datumObjave = datumObjave;
        this.brojLajkova = brojLajkova;
        this.korisnik = korisnik;
        this.idKorisnika = idKorisnika
    }

    crtajOdgovor(host){


        let odgovorDiv = document.createElement("div");
        odgovorDiv.className="odgovorDiv";
        host.appendChild(odgovorDiv);

        let naslovDiv1 = document.createElement("div");
        naslovDiv1.className="naslovDiv1";
        odgovorDiv.appendChild(naslovDiv1);

            let usr = document.createElement("label");
            usr.className="objavaNaForumuUsrLbl";
            usr.innerHTML = this.korisnik;
            naslovDiv1.appendChild(usr);

            if(vratiUsername() == this.korisnik || vratiFleg()=='a'){
                let btnDel = document.createElement("button");
                btnDel.className="brisiOdgovorBtn";
                btnDel.innerHTML = "Obrisi";
                naslovDiv1.appendChild(btnDel);

                btnDel.onclick = (ev) => this.brisiObjavu(host,odgovorDiv);
            }

            usr.onclick=()=>{
                fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+this.idKorisnika,{
                    method:"GET",
                     headers: {
                         'Authorization' : 'Bearer ' + localStorage.getItem("token")
                     }
                }).then(s=>{
                    if(s.ok){
                        document.body.querySelector(".Search").style.display = "none";
                        s.json().then(p=>{
                            if(p.fleg == "t"){
                                let trener = new Trener(p.id, p.ime, p.prezime, p.email, p.username, p.grad, p.drzava, p.fleg, p.pol, p.datumRodjenja, p.biografija, p.krediti, null, null);
                                trener.crtajProfTrenera(document.body.querySelector(".Prikaz"));
                            }
                            else if(p.fleg == "k"){
                                let klijent = new Klijent(p.id, p.ime, p.prezime, p.email, p.username, p.grad, p.drzava, p.fleg, p.pol, p.datumRodjenja, p.zanimanje, p.krediti)
                                klijent.crtajProfKlijenta(document.body.querySelector(".Prikaz"));
                            }
                        })
                    }
                    else{

                    }
                })
            }

        let sadrzajDiv = document.createElement("div");
        sadrzajDiv.className="sadrzajDiv";
        odgovorDiv.appendChild(sadrzajDiv);

            let sad = document.createElement("div");
            sad.className="objavaNaForumuSadLbl";
            sad.innerHTML=this.sadrzaj;
            sadrzajDiv.appendChild(sad);

        let infoDiv1 = document.createElement("div");
        infoDiv1.className="infoDiv1";
        odgovorDiv.appendChild(infoDiv1);

            let likeDiv3 = document.createElement("div");
            likeDiv3.className="likeDiv3";
            infoDiv1.appendChild(likeDiv3);

                if(vratiID() && !isNaN(vratiID()) && vratiUsername() != this.korisnik && vratiFleg()!='a')
                {
                    let pom;


                    fetch("https://localhost:5001/Objava/ProveriLajk/"+this.id+"/"+vratiID(),{
                        method:"GET",
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                        }
                    }).then(s=>{
                        if(s.ok){
                            s.json().then(data =>{
                                pom=data;
                                if(pom == false)
                                {
                                    let s = document.createElement("img");
                                    s.src="assets/svidjaMiSe.png";
                                    s.className="imgLike";
                                    likeDiv3.appendChild(s);

                                    s.onclick = (ev) =>{
                                        this.like(infoDiv1);
                                    }
                                }

                                if(pom == true)
                                {
                                    let s = document.createElement("img");
                                    s.src="assets/unlike.png";
                                    s.className="imgLike";
                                    likeDiv3.appendChild(s);

                                    s.onclick = (ev) =>{
                                        this.unlike(infoDiv1);
                                    }
                                }
                            })  
                        }
                        
                    })
                }
                else{
                    let s = document.createElement("img");
                    s.src="assets/like.png";
                    s.className="imgLike2";
                    likeDiv3.appendChild(s);
                }



                let like = document.createElement("label");
                like.className="objavaNaForumuLikeLbl";
                like.innerHTML = "Broj sviđanja: "+this.brojLajkova;
                likeDiv3.appendChild(like);


                let date = document.createElement("label");
                date.className="objavaNaForumuDateLbl1";
                date.innerHTML = this.datumObjave;
                infoDiv1.appendChild(date);
    }

    like(host){
        fetch("https://localhost:5001/Objava/LajkujObjavu/"+this.id+"/"+vratiID(),{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                s.json().then(data => {
                    this.brojLajkova=data;
                    host.querySelector(".objavaNaForumuLikeLbl").innerHTML="Broj sviđanja: "+data;
                })
            }
        })

        let s = host.querySelector(".imgLike")
        s.src="assets/unlike.png";

        s.onclick = (ev) => this.unlike(host);
        
    }

    unlike(host){
        fetch("https://localhost:5001/Objava/OdlajkujObjavu/"+this.id+"/"+vratiID(),{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                s.json().then(data => {
                    this.brojLajkova=data;
                    host.querySelector(".objavaNaForumuLikeLbl").innerHTML="Broj sviđanja: "+data;
                })
            }
        })


        let s = host.querySelector(".imgLike")
        s.src="assets/svidjaMiSe.png";

        s.onclick = (ev) => this.like(host);
    }

    brisiObjavu(host, odgDiv){
        if(vratiFleg()=='a'){
            fetch("https://localhost:5001/Admin/BrisiOdgovorAdmin/"+this.id,{
                method:"DELETE",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    host.removeChild(odgDiv);
                    let pom = host.parentNode.parentNode.querySelector(".objavaNaForumuCommLbl");
                    let pom2 = pom.innerHTML.toString().split(" ")[2];                    
                    pom.innerHTML="Broj komentara: "+(parseInt(pom2) - 1);
                    
                }
            })
        }else{
            fetch("https://localhost:5001/Objava/BrisiOdgovor/"+vratiID()+"/"+this.id,{
                method:"DELETE",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    host.removeChild(odgDiv);
                    let pom = host.parentNode.parentNode.querySelector(".objavaNaForumuCommLbl");
                    let pom2 = pom.innerHTML.toString().split(" ")[2];                    
                    pom.innerHTML="Broj komentara: "+(parseInt(pom2) - 1);
                    
                }
            })
        }
    }
}