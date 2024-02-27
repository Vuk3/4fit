import { ObjavaNaForumu } from "./ObjavaNaForumu.js";
import { Trener } from "./Trener.js";
import { Klijent } from "./Klijent.js";
import { ObjavaPocetna } from "./ObjavaPocetna.js";
import { KorisnikBan } from "./KorisnikBan.js";
import { ZahtevTrenera } from "./ZahtevTrenera.js";
import { ZahtevKlijenta } from "./ZahtevKlijenta.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";
import { Sajt } from "./Sajt.js";


export class Admin{

    constructor(){
        this.kontejner=null;
    }

    crtaj(host){
        this.kontejner=document.createElement("div");
        this.kontejner.className="GlavniKontejner";
        host.appendChild(this.kontejner);

        let kontejnerHeder = document.body.querySelector(".Heder");  
        this.kontejner.appendChild(kontejnerHeder);

        let kontejnerGlavniPrikaz = document.createElement("div");
        kontejnerGlavniPrikaz.className="GlavniPrikaz";
        this.kontejner.appendChild(kontejnerGlavniPrikaz);

        let kontejnerPrikaz = document.createElement("div");
        kontejnerPrikaz.className="Prikaz";
        kontejnerGlavniPrikaz.appendChild(kontejnerPrikaz);

        let kontejnerSearch = document.createElement("div");
        kontejnerSearch.className="Search";
        kontejnerGlavniPrikaz.appendChild(kontejnerSearch);

        document.body.querySelector(".Search").style.display = "flex";


        let kontejnerFuter = document.createElement("div");
        kontejnerFuter.className="Futer";
        this.kontejner.appendChild(kontejnerFuter);

        this.crtajPrikaz(kontejnerPrikaz);
        if(vratiID()!=null)
            this.crtajSearch(kontejnerSearch);

        // alert("aaa");

        this.crtajFuter(kontejnerFuter);
        this.crtajHeder(kontejnerHeder);

        document.body.querySelector(".Prikaz").classList.remove("StoPosto");
        document.body.querySelector(".Prikaz").classList.add("OsamdesetPosto");

        document.body.querySelector(".Search").classList.remove("NulaPosto");
        document.body.querySelector(".Search").classList.add("DvadesetPosto");


        let logo = document.body.querySelector(".logo");
        logo.onclick=()=>{

            if(vratiID() && !isNaN(vratiID())){
                kontejnerPrikaz.innerHTML="";
                document.body.querySelector(".Search").style.display = "flex";
                fetch("https://localhost:5001/Objava/VratiObjavePocetna",{
                    method:"GET",
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(s=>{
                    if(s.ok){
                        let objaveDiv = document.createElement("div");
                        objaveDiv.className="objaveDivPocetna";
                        kontejnerPrikaz.appendChild(objaveDiv);


                        s.json().then(data=>{
                            data.forEach(obj=>{
                                let o = new ObjavaPocetna(obj.id, obj.trenerid, obj.slika, obj.opis, obj.datum, obj.brojlajkova, obj.trenerusername);
                                o.crtajObjavu(objaveDiv);
                            })
                        })

                        this.kontejner.querySelector(".aPocetna").classList.add("selected");
                        this.kontejner.querySelector(".aForum").classList.remove("selected");
                        this.kontejner.querySelector(".aKorisnici").classList.remove("selected");
                        this.kontejner.querySelector(".aZahtevi").classList.remove("selected");
                        // this.kontejner.querySelector(".aChat").classList.remove("selected");
                        // this.kontejner.querySelector(".aONama").classList.remove("selected");
                    }
                    else{

                    }
                })
                // document.querySelector(".aPocetna").classList.add("selected");
            }
            else{
                window.location.href = "./index";
                // document.querySelector(".aPocetna").classList.add("selected");
            }

        
        }


        let forum=document.body.querySelector(".crtajForum");
        forum.onclick=(ev)=>{
            this.crtajForum(this.kontejner.querySelector(".Prikaz"));
            this.kontejner.querySelector(".aPocetna").classList.remove("selected");
            this.kontejner.querySelector(".aForum").classList.add("selected");
            this.kontejner.querySelector(".aKorisnici").classList.remove("selected");
            this.kontejner.querySelector(".aZahtevi").classList.remove("selected");
        }


        let pocetna;
        if(vratiID() == null)
            pocetna=document.body.querySelector(".crtajPocetnu");
        else pocetna=document.body.querySelector(".crtajPocetnuAdmin");
        pocetna.onclick=(ev)=>{
            if(vratiID()!=null){
                kontejnerPrikaz.innerHTML="";
                document.body.querySelector(".Search").style.display = "flex";

                fetch("https://localhost:5001/Objava/VratiObjavePocetna",{
                    method:"GET",
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(s=>{
                    if(s.ok){
                        let objaveDiv = document.createElement("div");
                        objaveDiv.className="objaveDivPocetna";
                        kontejnerPrikaz.appendChild(objaveDiv);


                        s.json().then(data=>{
                            data.forEach(obj=>{
                                let o = new ObjavaPocetna(obj.id, obj.trenerid, obj.slika, obj.opis, obj.datum, obj.brojlajkova, obj.trenerusername);
                                o.crtajObjavu(objaveDiv);
                            })
                        })

                        this.kontejner.querySelector(".aPocetna").classList.add("selected");
                        this.kontejner.querySelector(".aForum").classList.remove("selected");
                        this.kontejner.querySelector(".aKorisnici").classList.remove("selected");
                        this.kontejner.querySelector(".aZahtevi").classList.remove("selected");
                    }
                    else{

                    }
                })
                // document.querySelector(".aPocetna").classList.add("selected");
            }
            else{
                window.location.href = "./index";
                // document.querySelector(".aPocetna").classList.add("selected");
            }

        }

        let korisnici = document.body.querySelector(".crtajKorisnikeAdmin");
        korisnici.onclick=()=>{
            this.crtajKorisnike(document.body.querySelector(".Prikaz"));

            this.kontejner.querySelector(".aPocetna").classList.remove("selected");
            this.kontejner.querySelector(".aForum").classList.remove("selected");
            this.kontejner.querySelector(".aKorisnici").classList.add("selected");
            this.kontejner.querySelector(".aZahtevi").classList.remove("selected");
        }

        let Zahtevi = document.body.querySelector(".crtajZahteveAdmin");
        Zahtevi.onclick=()=>{
            this.crtajZahteve(document.body.querySelector(".Prikaz"));

            this.kontejner.querySelector(".aPocetna").classList.remove("selected");
            this.kontejner.querySelector(".aForum").classList.remove("selected");
            this.kontejner.querySelector(".aKorisnici").classList.remove("selected");
            this.kontejner.querySelector(".aZahtevi").classList.add("selected");
        }
    }

    crtajSearch(host){
        let i = document.createElement("input");
        i.className="inputSearch";
        i.placeholder="Pretrazite korisnike";
        host.appendChild(i);

        let ul = document.createElement("ul");
        ul.className="ulSearch";
        host.appendChild(ul);

        

        
        i.oninput=()=>{
            let list = document.body.querySelectorAll(".listItem");
                list.forEach(p=>{
                    p.parentNode.removeChild(p);
                });

            if(i.value!=""){
                
                fetch("https://localhost:5001/Korisnik/VratiKorisnikePoStringu"+"/"+i.value,{
                    method:"GET",
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(s=>{
                    if(s.ok){
                        s.json().then(obj=>{
                            obj.forEach(data=>{
                                fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+data.id,{
                                    method:"GET",
                                    headers: {
                                        'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                    }
                                }).then(s=>{
                                    if(s.ok){
                                        s.json().then(data=>{ 
                                            if (data.fleg == "k"){
                                                var k = new Klijent(data.id, data.ime, data.prezime,
                                                    data.email, data.username, data.grad, data.drzava, 
                                                    data.fleg, data.pol, data.datumRodjenja, data.zanimanje, data.krediti);
                                                    let li = document.createElement("li");
                                                    li.className="listItem";
                                                    li.classList.add("pointer");
            
            
            
                                                    let label1 = document.createElement("label");
                                                    label1.innerHTML=data.username;
                                                    label1.className="lblVeca";
                                                    label1.classList.add("pointer");
            
            
            
                                                    let label2 = document.createElement("label");
                                                    label2.innerHTML=data.ime + " " + data.prezime;
                                                    label2.className="lblManja";
                                                    label2.classList.add("pointer");
            
            
            
            
                                                    li.appendChild(label1);
                                                    li.appendChild(label2);
            
                                                    ul.appendChild(li);
                                                    li.onclick=()=>{
                                                        i.value="";
                                                        let list = document.body.querySelectorAll(".listItem");
                                                        list.forEach(p=>{
                                                            p.parentNode.removeChild(p);
                                                        });
                                                        k.crtajProfKlijenta(document.body.querySelector(".Prikaz"));
                                                    }
                                            }
                                            else if(data.fleg == "t"){
                                                var t = new Trener(data.id, data.ime, data.prezime,
                                                    data.email, data.username, data.grad, data.drzava, 
                                                    data.fleg, data.pol, data.datumRodjenja, data.biografija, data.krediti);
                                                    let li = document.createElement("li");
                                                    li.className="listItem";
                                                    li.classList.add("pointer");
            
            
                                                    let label1 = document.createElement("label");
                                                    label1.innerHTML=data.username;
                                                    label1.className="lblVeca";
                                                    label1.classList.add("pointer");
            
            
                                                    let label2 = document.createElement("label");
                                                    label2.innerHTML=data.ime + " " + data.prezime;
                                                    label2.className="lblManja";
                                                    label2.classList.add("pointer");
            
                                                    
            
            
            
                                                    li.appendChild(label1);
                                                    li.appendChild(label2);
            
            
                                                    ul.appendChild(li);
                                                    li.onclick=()=>{
                                                        i.value="";
                                                        let list = document.body.querySelectorAll(".listItem");
                                                        list.forEach(p=>{
                                                            p.parentNode.removeChild(p);
                                                        });
                                                        t.crtajProfTrenera(document.body.querySelector(".Prikaz"));
                                                    }
                                            }
                                        });
                                    }
                                })
                            })
                        })
                    }
                    else{
                        s.text().then(p=>{
                       
                        })
                    }
                })
            }
            else{

            }
            
        }
        
            
        
    }

    crtajZahteve(host){
        host.innerHTML = " ";

        let selectZahtevi = document.createElement("select");
        selectZahtevi.className = "selectZahtevi";
        host.appendChild(selectZahtevi);

            let opTreneni = document.createElement("option");
            opTreneni.text = "Zahtevi trenera";
            opTreneni.value = 1;
            opTreneni.className = "OpcijeZahtev";
            selectZahtevi.appendChild(opTreneni);


            let opKlijenti = document.createElement("option")
            opKlijenti.text = "Zahtevi klijenata";
            opKlijenti.value = 2;
            opKlijenti.className = "OpcijeZahtev";
            selectZahtevi.appendChild(opKlijenti)

            let divZahtevi = document.createElement("div");
            divZahtevi.className = "divZahtevi";
            host.appendChild(divZahtevi);

            let opcija;
            selectZahtevi.onchange=()=>{
            opcija = host.querySelector(".OpcijeZahtev:checked").value;
            if(opcija == 1){
                this.crtajZahteveTrenera(divZahtevi);

            }
            else if (opcija ==2){
                this.crtajZahteveKlijenata(divZahtevi);
            }

        }
        this.crtajZahteveTrenera(divZahtevi);
    }

    crtajZahteveTrenera(host){
        host.innerHTML = " ";
        document.body.querySelector(".Search").style.display = "flex";

        fetch("https://localhost:5001/Admin/VratiZahteveTrenera",{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        data.forEach(obj=>{
                            var ZahTr = new ZahtevTrenera(obj.id, obj.kolicina,
                                obj.brRac, obj.korTrenera, obj.ime, obj.prezime,
                                obj.idTrenera);

                            ZahTr.crtaj(host);
                        })
                    })
                }
                else{

                }
            })
    }

    crtajZahteveKlijenata(host){
        host.innerHTML = " ";
        document.body.querySelector(".Search").style.display = "flex";

        fetch("https://localhost:5001/Admin/VratiZahteveKlijenta",{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        data.forEach(obj=>{
                            var ZahKl = new ZahtevKlijenta(obj.id,
                                obj.korKlijenta, obj.ime, obj.prezime,obj.slika,
                                obj.idKlijenta, obj.kolicina);

                                ZahKl.crtaj(host);
                        })
                    })
                }
                else{

                }
            })
    }

    crtajKorisnike(host){
        host.innerHTML = " ";
        document.body.querySelector(".Search").style.display = "flex";

        let lab = document.createElement("label");
        lab.innerHTML = "Banovani korisnici";
        lab.className="lblBanovaniKorisnici";
        host.appendChild(lab);

        let divGlavni = document.createElement("div");
        divGlavni.className = "divGlavni";
        host.appendChild(divGlavni);

           /* let labelBanKor = document.createElement("label");
            labelBanKor.className = "labBanKor";
            labelBanKor.innerHTML = "Banovani korisnici";
            divGlavni.appendChild(labelBanKor);*/

            fetch("https://localhost:5001/Admin/VratiBanovane",{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    let KorisniciDiv = document.createElement("div");
                    KorisniciDiv.className="KorisniciDiv";
                    divGlavni.appendChild(KorisniciDiv);


                    s.json().then(data=>{
                        data.forEach(obj=>{
                            var KorBan = new KorisnikBan(obj.id, obj.username, obj.ime, obj.prezime, obj.ban.razlog);
                            KorBan.crtaj(KorisniciDiv);
                        })
                    })
                }
                else{

                }
            })
    }

    crtajFuter(host){}

    crtajHeder(host){
        // alert("alert");
        let odjaviSe = document.body.querySelector(".odjaviSe");
            odjaviSe.onclick = (ev) => {
                fetch("https://localhost:5001/Auth/LogOut",
                {
                    method:"POST",
                    headers:{
                        "Authorization":"Bearer " + localStorage.getItem("token")
                    }
                })
                .then(p => {
                    // console.log(p);

                    if(p.ok){
                        // alert("bbb");
                        localStorage.clear();
                        // this.crtajHeder(this.kontejner.querySelector(".Heder"));
                        // this.crtajPrikaz(this.kontejner.querySelector(".Prikaz"));
                        // this.crtajFuter(this.kontejner.querySelector(".Futer"));
                    }
                })
            }
    }

    crtajPrikaz(host){
        if(vratiID()!=null){
            this.kontejner.querySelector(".Prikaz").innerHTML="";
            fetch("https://localhost:5001/Objava/VratiObjavePocetna",{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    let objaveDiv = document.createElement("div");
                    objaveDiv.className="objaveDivPocetna";
                    this.kontejner.querySelector(".Prikaz").appendChild(objaveDiv);


                    s.json().then(data=>{
                        data.forEach(obj=>{
                            let o = new ObjavaPocetna(obj.id, obj.trenerid, obj.slika, obj.opis, obj.datum, obj.brojlajkova, obj.trenerusername);
                            o.crtajObjavu(objaveDiv);
                        })
                    })
                }
                else{

                }
            })
        }
    }

    crtajForum(host){


        
        host.innerHTML = "";
        let pretraziTemu = document.createElement("div");
        pretraziTemu.className = "pretraziTemu";
        host.appendChild(pretraziTemu);

        let inputTema = document.createElement("input");
        inputTema.className="inputTema";
        inputTema.placeholder="Pretrazi temu";
        pretraziTemu.appendChild(inputTema);

        let pom12 = this;
        // console.log(pom12);

        inputTema.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                let m = inputTema.value;
                    if(m != ""){
                        document.body.querySelector(".objaveDiv").innerHTML="";
                        document.body.querySelector(".pagUl").innerHTML="";
                    fetch("https://localhost:5001/Objava/VratiBrojObjavaString/"+m,{
                            method:"GET",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                s.json().then(data => {
                                    let n = parseInt(data/10);
                                    let k;
                                    if(data % 10 == 0) k = n;
                                        else k = n+1;
                                    for (let index = 0; index < k; index++) {

                                        var ll = document.createElement("li");
                                        ll.className="page-item";
                                        pag.appendChild(ll);

                                        var aa = document.createElement("a");
                                        aa.className="page-link";
                                        aa.innerHTML=index+1;
                                        aa.href="#";
                                        aa.onclick = (ev) => {
                                            objaveDiv.innerHTML = "";
                                            let str = parseInt(ev.target.innerHTML);
                                            
                                            fetch("https://localhost:5001/Objava/VratiTemeString/"+str+"/"+m,{
                                                method:"GET",
                                                headers: {
                                                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                                }
                                            }).then(s=>{
                                                if(s.ok){
                                                    s.json().then(data=>{ 
                                                        data.forEach(element => {
                                                            var t = new ObjavaNaForumu(element.id,element.sadrzaj,element.datumObjave,element.brojLajkova,element.naslov,element.brojKomentara,element.username,element.idKorisnika);
                                                            t.crtajObjavu(objaveDiv, pom12);
                                                        });
                                                    })
                                                }
                                            })
                                        }
                                        ll.appendChild(aa);   
                                    }
                                    
                                })  
                            }
                            
                        })

                        fetch("https://localhost:5001/Objava/VratiTemeString/"+1+"/"+m,{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        data.forEach(element => {
                            var t = new ObjavaNaForumu(element.id,element.sadrzaj,element.datumObjave,element.brojLajkova,element.naslov,element.brojKomentara,element.username,element.idKorisnika);
                            t.crtajObjavu(objaveDiv, pom12);
                        });
                    })
                }
            })
                }
            }
        });
        

        if(vratiID() != null){
            let dodajTemuDiv = document.createElement("div");
            dodajTemuDiv.className = "dodajTemuDiv";
            host.appendChild(dodajTemuDiv);

            if(vratiFleg()!='a'){
                let dodajTemuBtn = document.createElement("button");
                dodajTemuBtn.className = "dodajTemuBtn";
                dodajTemuBtn.innerHTML = "Dodaj temu";
                dodajTemuDiv.appendChild(dodajTemuBtn);


                let dodajTemuTxtDiv = document.createElement("div");
                dodajTemuTxtDiv.className = "dodajTemuTxtDiv";
                dodajTemuDiv.appendChild(dodajTemuTxtDiv);

                dodajTemuBtn.onclick = (ev) => {
                    dodajTemuTxtDiv.innerHTML = "";

                    let naslovIn = document.createElement("input");
                    naslovIn.type = "text";
                    naslovIn.className = "naslovInTxt";
                    naslovIn.placeholder="Dodaj naslov...";
                    dodajTemuTxtDiv.appendChild(naslovIn);

                    let sadrzajIn = document.createElement("input");
                    sadrzajIn.type = "text";
                    sadrzajIn.className = "sadrzajInTxt";
                    sadrzajIn.placeholder="Dodaj sadrzaj...";
                    dodajTemuTxtDiv.appendChild(sadrzajIn);

                    let pom = this;

                    naslovIn.addEventListener("keypress", function(event) {
                        if (event.key === "Enter") {
                            if(host.querySelector(".sadrzajInTxt").value == "")
                                host.querySelector(".sadrzajInTxt").select();
                            else{
                                pom.dodajTemu(host,pom);
                            }
                        }
                    });

                    sadrzajIn.addEventListener("keypress", function(event) {
                        if (event.key === "Enter") {
                            if(host.querySelector(".naslovInTxt").value == "")
                                host.querySelector(".naslovInTxt").select();
                            else{
                                pom.dodajTemu(host,pom);
                            }
                        }
                    });

                    let potvrdiBtn = document.createElement("button");
                    potvrdiBtn.className="potvrdiBtn";
                    potvrdiBtn.innerHTML = "Potvrdi"
                    dodajTemuTxtDiv.appendChild(potvrdiBtn);
                    potvrdiBtn.onclick = (ev) => this.dodajTemu(host,this);

                    let otkaziBtn = document.createElement("button");
                    otkaziBtn.className="otkaziBtn";
                    otkaziBtn.innerHTML = "Otkazi"
                    dodajTemuTxtDiv.appendChild(otkaziBtn);
                    otkaziBtn.onclick = (ev) => {dodajTemuTxtDiv.innerHTML="";}
                }
        }
        }


        let objaveDiv = document.createElement("div");
        objaveDiv.className="objaveDiv";
        host.appendChild(objaveDiv);

        var pag = document.createElement("ul");
        //pag.className="pagination";
        pag.classList="pagination";
        pag.classList.add("pagUl");
        host.appendChild(pag);


        fetch("https://localhost:5001/Objava/VratiBrojObjava",{
                        method:"GET",
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                        }
                    }).then(s=>{
                        if(s.ok){
                            s.json().then(data => {
                                let n = parseInt(data/10);
                                let k;
                                if(data % 10 == 0) k = n;
                                    else k = n+1;
                                for (let index = 0; index < k; index++) {

                                    var ll = document.createElement("li");
                                    ll.className="page-item";
                                    pag.appendChild(ll);

                                    var aa = document.createElement("a");
                                    aa.className="page-link";
                                    aa.innerHTML=index+1;
                                    aa.href="#";
                                    aa.onclick = (ev) => {
                                        objaveDiv.innerHTML = "";
                                        let str = parseInt(ev.target.innerHTML);
                                        
                                        fetch("https://localhost:5001/Objava/VratiTeme/"+str,{
                                            method:"GET",
                                            headers: {
                                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                            }
                                        }).then(s=>{
                                            if(s.ok){
                                                s.json().then(data=>{ 
                                                    console.log(data);

                                                    data.forEach(element => {
                                                        var t = new ObjavaNaForumu(element.id,element.sadrzaj,element.datumObjave,element.brojLajkova,element.naslov,element.brojKomentara,element.username,element.idKorisnika);
                                                        t.crtajObjavu(objaveDiv, this);
                                                    });
                                                })
                                            }
                                        })
                                    }
                                    ll.appendChild(aa);   
                                }
                                
                            })  
                        }
                        
                    })

        

        /*var l2 = document.createElement("li");
        pag.appendChild(l2);

        var a2 = document.createElement("a");
        a2.innerHTML="2";
        a2.href="#";
        l2.appendChild(a2);*/

        fetch("https://localhost:5001/Objava/VratiTeme/"+1,{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        data.forEach(element => {
                            var t = new ObjavaNaForumu(element.id,element.sadrzaj,element.datumObjave,element.brojLajkova,element.naslov,element.brojKomentara,element.username,element.idKorisnika);
                            t.crtajObjavu(objaveDiv, this);
                        });
                    })
                }
            })
    }
}