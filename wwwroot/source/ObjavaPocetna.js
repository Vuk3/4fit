import { Trener } from "./Trener.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";


export class ObjavaPocetna{
    constructor(idObjave, idTrenera, slika, opis, datum, brojLajkova, usernameTrenera){
        this.idObjave=idObjave;
        this.idTrenera=idTrenera;
        this.slika=slika;
        this.opis=opis;
        this.datum=datum;
        this.brojLajkova=brojLajkova;
        this.usernameTrenera=usernameTrenera;
    }


    crtajObjavu(host){
        let divObjave = document.createElement("div");
        divObjave.className = "divObjavePocetna";
        host.appendChild(divObjave);

            let username = document.createElement("label");
            username.innerHTML=this.usernameTrenera;
            username.className="lblUsernamePocetna";
            divObjave.appendChild(username);

            username.onclick=()=>{
                
                fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+this.idTrenera,{
                        method:"GET",
                         headers: {
                             'Authorization' : 'Bearer ' + localStorage.getItem("token")
                         }
                    }).then(s=>{
                        if(s.ok){
                            document.body.querySelector(".Search").style.display = "none";
                            s.json().then(p=>{
                                let trener = new Trener(p.id, p.ime, p.prezime, p.email, p.username, p.grad, p.drzava, p.fleg, p.pol, p.datumRodjenja, p.biografija, p.krediti, null, null);
                                trener.crtajProfTrenera(document.body.querySelector(".Prikaz"));
                            })
                        }
                        else{

                        }
                    })
            }

            

            let slika = document.createElement("img");
            slika.src="data:image/*;base64,"+this.slika;
            slika.className = "objaveTreneraPocetna";
            divObjave.appendChild(slika);

            let opis = document.createElement("label");
            opis.className = "opisSlikaPocetna";
            opis.innerHTML = this.opis;
            divObjave.appendChild(opis);


            let likeDiv = document.createElement("div");
            likeDiv.className="likeDiv";
            divObjave.appendChild(likeDiv);

                if(vratiUsername() != this.usernameTrenera && vratiID() && !isNaN(vratiID()) && vratiFleg()!= "a")
                {
                    let pom;

                    fetch("https://localhost:5001/Objava/ProveriLajk/"+this.idObjave+"/"+vratiID(),{
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
                                    likeDiv.appendChild(s);

                                    s.onclick = (ev) =>{
                                        this.like(divObjave);
                                    }
                                }

                                if(pom == true)
                                {
                                    let s = document.createElement("img");
                                    s.src="assets/unlike.png";
                                    s.className="imgLike";
                                    likeDiv.appendChild(s);

                                    s.onclick = (ev) =>{
                                        this.unlike(divObjave);
                                    }
                                }
                            })  
                        }
                        
                    })
                }else{
                    let s = document.createElement("img");
                    s.src="assets/like.png";
                    s.className="imgLike2";
                    likeDiv.appendChild(s);
                }

                


                let like = document.createElement("label");
                like.className="objavaNaPocetnojLikelbl";
                like.innerHTML = "Broj sviđanja: "+this.brojLajkova;
                likeDiv.appendChild(like);
    }


    like(host){
        fetch("https://localhost:5001/Objava/LajkujObjavu/"+this.idObjave+"/"+vratiID(),{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                s.json().then(data => {
                    this.brojLajkova=data;
                    host.querySelector(".objavaNaPocetnojLikelbl").innerHTML="Broj sviđanja: "+ data;
                })
            }
        })

        let s = host.querySelector(".imgLike");
        s.src="assets/unlike.png";

        s.onclick = (ev) => this.unlike(host);
        
    }

    unlike(host){
        fetch("https://localhost:5001/Objava/OdlajkujObjavu/"+this.idObjave+"/"+vratiID(),{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                s.json().then(data => {
                    this.brojLajkova=data;
                    host.querySelector(".objavaNaPocetnojLikelbl").innerHTML="Broj sviđanja: "+data;
                })
            }
        })


        let s = host.querySelector(".imgLike");
        s.src="assets/svidjaMiSe.png";

        s.onclick = (ev) => this.like(host);
    }
}