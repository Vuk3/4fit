import { Klijent } from "./Klijent.js";
import { Odgovor } from "./Odgovor.js";
import { Trener } from "./Trener.js";
import { Sajt } from "./Sajt.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";


export class ObjavaNaForumu{
    constructor(id,sadrzaj,datumObjave,brojLajkova,naslov,brojKomentara,username,idKorisnika){
        this.id = id;
        this.sadrzaj = sadrzaj;
        this.datumObjave = datumObjave;
        this.brojKomentara = brojKomentara;
        this.brojLajkova = brojLajkova;
        this.naslov = naslov;
        this.username = username;
        this.fleg = 0;
        this.idKorisnika = idKorisnika; 
    }

    crtajObjavu(host, sajt){


        let celaObjavaDiv = document.createElement("div");
        celaObjavaDiv.className="celaObjavaNaForumuDiv";
        host.appendChild(celaObjavaDiv);

        let objavaDiv = document.createElement("div");
        objavaDiv.className="objavaNaForumuDiv";
        celaObjavaDiv.appendChild(objavaDiv);

        

        let odgovorDiv = document.createElement("div");
        odgovorDiv.className="odgovorNaObjavuDiv";
        celaObjavaDiv.appendChild(odgovorDiv);

        //odgovorDiv.style.border = "2px dotted black";

        let naslovDiv = document.createElement("div");
        naslovDiv.className="naslovDiv";
        objavaDiv.appendChild(naslovDiv);

        let usernameDiv1 = document.createElement("div");
        usernameDiv1.className="usernameDiv1";
        naslovDiv.appendChild(usernameDiv1);

            let usr = document.createElement("label");
            usr.className="objavaNaForumuUsrLbl";
            usr.innerHTML = this.username;
            usernameDiv1.appendChild(usr);

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

            let titleDiv1 = document.createElement("div");
            titleDiv1.className="titleDiv1";
            naslovDiv.appendChild(titleDiv1);

            let nas = document.createElement("label");
            nas.className="objavaNaForumuNaslovLbl";
            nas.innerHTML = this.naslov;
            titleDiv1.appendChild(nas);

            let brisiDiv1 = document.createElement("div");
            brisiDiv1.className="brisiDiv1";
            naslovDiv.appendChild(brisiDiv1);

            if(vratiUsername() == this.username || vratiFleg()=='a'){

                let btnDel = document.createElement("button");
                btnDel.className="brisiTemuBtn";
                btnDel.innerHTML = "Obrisi";
                brisiDiv1.appendChild(btnDel);

                btnDel.onclick = (ev) => this.brisiObjavu(host, sajt);
            }

        let sadrzajDiv = document.createElement("div");
        sadrzajDiv.className="sadrzajDiv";
        objavaDiv.appendChild(sadrzajDiv);

            let sad = document.createElement("div");
            sad.className="objavaNaForumuSadLbl";
            sad.innerHTML=this.sadrzaj;
            //sad.readOnly = true;
            sadrzajDiv.appendChild(sad);

        let infoDiv = document.createElement("div");
        infoDiv.className="infoDiv";
        objavaDiv.appendChild(infoDiv);

            let likeDiv = document.createElement("div");
            likeDiv.className="likeDiv2";
            infoDiv.appendChild(likeDiv);

                if(vratiUsername() != this.username && vratiID() && !isNaN(vratiID()) && vratiFleg()!='a')
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
                                    likeDiv.appendChild(s);

                                    s.onclick = (ev) =>{
                                        this.like(infoDiv);
                                    }
                                }

                                if(pom == true)
                                {
                                    let s = document.createElement("img");
                                    s.src="assets/unlike.png";
                                    s.className="imgLike";
                                    likeDiv.appendChild(s);

                                    s.onclick = (ev) =>{
                                        this.unlike(infoDiv);
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
                like.className="objavaNaForumuLikeLbl";
                like.innerHTML = "Broj sviđanja: "+this.brojLajkova;
                likeDiv.appendChild(like);




            let commDiv = document.createElement("div");
            commDiv.className="likeDiv2";
            infoDiv.appendChild(commDiv);

            let date = document.createElement("label");
            date.className="objavaNaForumuDateLbl";
            date.innerHTML = this.datumObjave;
            infoDiv.appendChild(date);


                

                let o = document.createElement("img");
                o.src="assets/kom.png";
                o.className="imgKom";
                commDiv.appendChild(o);

                o.onclick = (ev) => this.odgovori(odgovorDiv,this.fleg);

                let comm = document.createElement("label");
                comm.className="objavaNaForumuCommLbl";
                comm.innerHTML = "Broj komentara: "+this.brojKomentara;
                commDiv.appendChild(comm);

            



    }

    brisiObjavu(host, sajt){
        console.log(host);
        console.log(sajt);
        if(vratiFleg()=='a'){
            fetch("https://localhost:5001/Admin/BrisiTemuAdmin/"+this.id,{
                method:"DELETE",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    sajt.crtajForum(host.parentNode);
                }
            })
        }
        else{
            fetch("https://localhost:5001/Objava/BrisiTemu/"+vratiID()+"/"+this.id,{
                method:"DELETE",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    sajt.crtajForum(host.parentNode);
                }
            })
        }

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

    odgovori(host,f){
        host.innerHTML = "";
        if(f == 0)
        {
            
            host.classList.add("odgovoriDiv2");
            /*let dodajLbl = document.createElement("label");
            dodajLbl.className="dodajLbl";
            dodajLbl.innerHTML="Dodaj odgovor:";
            host.appendChild(dodajLbl);*/


            if(vratiID() && !isNaN(vratiID()) && vratiFleg()!='a'){

                let odg = document.createElement("input");
                odg.type="text";
                odg.className="odgovorTxt";
                odg.placeholder="Dodaj odgovor...";
                host.appendChild(odg);

                let buttonDodaj = document.createElement("button");
                buttonDodaj.className = "buttonDodajOdg";
                buttonDodaj.classList.add("DugmeDodObj");
                buttonDodaj.innerHTML = "Dodaj";
                host.appendChild(buttonDodaj);

                let pom = this.id;
                
                let pom2 = this;

                

                odg.addEventListener("keypress", function(event) {
                    if (event.key === "Enter") {
                        fetch("https://localhost:5001/Objava/DodajOdgovorNaTemu/"+pom+"/"+vratiID()+"/"+odg.value,{
                                method:"POST",
                                headers: {
                                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                }
                            }).then(s=>{
                                if(s.ok){
                                    this.fleg = 0;
                                    pom2.odgovori(host,0);
                                    let pom = host.parentNode.querySelector(".objavaNaForumuCommLbl");
                                    let pom3 = pom.innerHTML.toString().split(" ")[2];                    
                                    pom.innerHTML="Broj komentara: "+(parseInt(pom3) + 1);
                                }
                                
                            })
                    }
                });

                buttonDodaj.onclick=()=>{
                    fetch("https://localhost:5001/Objava/DodajOdgovorNaTemu/"+pom+"/"+vratiID()+"/"+odg.value,{
                                method:"POST",
                                headers: {
                                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                }
                            }).then(s=>{
                                if(s.ok){
                                    this.fleg = 0;
                                    pom2.odgovori(host,0);
                                    let pom = host.parentNode.querySelector(".objavaNaForumuCommLbl");
                                    let pom3 = pom.innerHTML.toString().split(" ")[2];                    
                                    pom.innerHTML="Broj komentara: "+(parseInt(pom3) + 1);
                                }
                                
                            })
                }
            }

            let se = document.createElement("select");
            se.className="sortSel"
            /*se.onclick=(ev) => {
                ordinacijaDiv.innerHTML="";
                adresaDiv.innerHTML="";
            }*/

            let op0 = document.createElement("option");
            op0.innerHTML = "Najnoviji odgovori prvo";
            op0.className = "opcija"
            op0.value = 1;
            se.appendChild(op0);

            
            let op1 = document.createElement("option");
            op1.innerHTML = "Najstariji odgovori prvo";
            op1.className = "opcija"
            op1.value = 0;
            se.appendChild(op1);

            host.appendChild(se);
            se.onchange=()=>{
                let smer = document.body.querySelector(".opcija:checked").value
                if (smer == 1)
                {
                    this.crtajOdg(odgovoriDiv,0);
                }
                else if (smer == 0){
                    this.crtajOdg(odgovoriDiv,1);
                }
            }

            let odgovoriDiv = document.createElement("div");
            odgovoriDiv.className = "odgovoriDiv";
            host.appendChild(odgovoriDiv);

            
            this.crtajOdg(odgovoriDiv,0);

            this.fleg = 1;
                
        }
        else{
            /*host.style.border = "0px";
            host.style.backgroundColor = "rgba(143, 143, 143, 0)";
            host.style.boxShadow = " 0px 0px 0px 0px";*/
            host.classList.remove("odgovoriDiv2");
            this.fleg = 0;
        }

        
    }

    crtajOdg(host, smer){
        host.innerHTML="";
        // alert(this.id);
        fetch("https://localhost:5001/Objava/VratiOdgovore/"+this.id+"/"+smer,{
                    method:"GET",
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(s=>{
                    if(s.ok){
                        s.json().then(data=>{ 
                            data.forEach(element => {
                                console.log(element);
                                var t = new Odgovor(element.id,element.sadrzaj,element.brojLajkova,element.datumObjave,element.korisnik,element.idKorisnika);
                                t.crtajOdgovor(host);
                            });
                        })
                    }
                })
    }

    

    
}