import { ObjavaNaForumu } from "./ObjavaNaForumu.js";
import { Trener } from "./Trener.js";
import { Klijent } from "./Klijent.js";
import { ObjavaPocetna } from "./ObjavaPocetna.js";
import { parseJwt } from "./ParseJWT.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";
import { Pretplata } from "./Pretplata.js";


export class Sajt{

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

        this.crtajPocetnuNeprijavljen(kontejnerPrikaz);

        let kontejnerSearch = document.createElement("div");
        kontejnerSearch.className="Search";
        kontejnerGlavniPrikaz.appendChild(kontejnerSearch);


        document.body.querySelector(".Search").style.display = "flex";


        let kontejnerFuter = document.createElement("div");
        kontejnerFuter.className="Futer";
        this.kontejner.appendChild(kontejnerFuter);
        
        if((vratiID() == null))
        {
            this.crtajHeder(kontejnerHeder);
            document.body.querySelector(".Prikaz").classList.add("StoPosto");
            document.body.querySelector(".Prikaz").classList.remove("OsamdesetPosto");

            document.body.querySelector(".Search").classList.add("NulaPosto");
            document.body.querySelector(".Search").classList.remove("DvadesetPosto");
        }
        else{
            this.crtajMojProfil(kontejnerPrikaz);
            document.body.querySelector(".Prikaz").classList.remove("StoPosto");
            document.body.querySelector(".Prikaz").classList.add("OsamdesetPosto");

            document.body.querySelector(".Search").classList.remove("NulaPosto");
            document.body.querySelector(".Search").classList.add("DvadesetPosto");
        }

        if(vratiID()){
            if(!isNaN(vratiID())){
                this.crtajSearch(kontejnerSearch);
            }
        }

        /*  
            localStorage.getItem("id") != null

            OVO JE ISTO KAO

            if(vratiID()){
                if(!isNaN(vratiID())){
                }
            }

        */

        
        this.crtajPrikaz(kontejnerPrikaz);
        this.crtajFuter(kontejnerFuter);

        if(vratiID())
            if(!isNaN(vratiID())){
                let chat = document.body.querySelector(".crtajChat");
                chat.onclick=()=>{
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    this.crtajChat(this.kontejner.querySelector(".Prikaz"));
                    this.kontejner.querySelector(".aPocetna").classList.remove("selected");
                    this.kontejner.querySelector(".aForum").classList.remove("selected");
                    this.kontejner.querySelector(".aChat").classList.add("selected");
                    this.kontejner.querySelector(".aONama").classList.remove("selected");
                    this.kontejner.querySelector(".aPretplate").classList.remove("selected");

                }
            }

        if(vratiID())
            if(!isNaN(vratiID())){
                let pretplate = document.body.querySelector(".crtajPretplate");
                pretplate.onclick=()=>{
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    this.crtajPretplate(this.kontejner.querySelector(".Prikaz"));
                    this.kontejner.querySelector(".aPocetna").classList.remove("selected");
                    this.kontejner.querySelector(".aForum").classList.remove("selected");
                    this.kontejner.querySelector(".aChat").classList.remove("selected");
                    this.kontejner.querySelector(".aPretplate").classList.add("selected");
                    this.kontejner.querySelector(".aONama").classList.remove("selected");
                }
            }

        let logo = document.body.querySelector(".logo");
        logo.onclick=()=>{

            if(vratiID() && !isNaN(vratiID())){
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        this.kontejner.querySelector(".aChat").classList.remove("selected");
                        this.kontejner.querySelector(".aONama").classList.remove("selected");
                        this.kontejner.querySelector(".aPretplate").classList.remove("selected");

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
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.crtajForum(this.kontejner.querySelector(".Prikaz"));
            this.kontejner.querySelector(".aPocetna").classList.remove("selected");
            if(vratiID())
                if(!isNaN(vratiID())){
                    this.kontejner.querySelector(".aChat").classList.remove("selected");
            
                    this.kontejner.querySelector(".aPretplate").classList.remove("selected");
                }
            this.kontejner.querySelector(".aForum").classList.add("selected");
            this.kontejner.querySelector(".aONama").classList.remove("selected");
        }

        let podrska = document.body.querySelector(".crtajPodrsku")
        podrska.onclick=()=>{
            window.scrollTo({ top: 0, behavior: 'smooth' });
            this.crtajPodrsku(this.kontejner.querySelector(".Prikaz"))
            this.kontejner.querySelector(".aPocetna").classList.remove("selected");
            if(vratiID())
                if(!isNaN(vratiID()))
                    this.kontejner.querySelector(".aChat").classList.remove("selected");
            this.kontejner.querySelector(".aForum").classList.remove("selected");
            this.kontejner.querySelector(".aONama").classList.add("selected");
            if(vratiID())
                if(!isNaN(vratiID()))
                    this.kontejner.querySelector(".aPretplate").classList.remove("selected");

        }

        let pocetna;
        if(!vratiID() || isNaN(vratiID()))
            pocetna=document.body.querySelector(".crtajPocetnu");
        else pocetna=document.body.querySelector(".crtajPocetnuPrijavljen");
        pocetna.onclick=(ev)=>{
            if(vratiID() && !isNaN(vratiID())){
                window.scrollTo({ top: 0, behavior: 'smooth' });
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
                        this.kontejner.querySelector(".aChat").classList.remove("selected");
                        this.kontejner.querySelector(".aONama").classList.remove("selected");
                        this.kontejner.querySelector(".aPretplate").classList.remove("selected");

                    }
                    else{

                    }
                })
                // document.querySelector(".aPocetna").classList.add("selected");
            }
            else{
                // document.querySelector(".aPocetna").classList.add("selected");
                
                let pom = this.kontejner.querySelector(".Prikaz");
                pom.innerHTML="";
                this.crtajPocetnuNeprijavljen(pom);
                this.kontejner.querySelector(".aPocetna").classList.add("selected");
                this.kontejner.querySelector(".aForum").classList.remove("selected");
                //this.kontejner.querySelector(".aPodrska").classList.remove("selected");
                this.kontejner.querySelector(".aONama").classList.remove("selected");
            }

        }
    }

    crtajPretplate(host){
        host.innerHTML="";
        document.body.querySelector(".inputSearch").value="";

        document.body.querySelector(".Search").style.display = "flex";

        let lab = document.createElement("label");
        if(vratiFleg() == "k")
            lab.innerHTML = "Moje pretplate";
        if(vratiFleg() == "t")
            lab.innerHTML = "Pretplaceni korisnici";
        lab.className="lblBanovaniKorisnici";
        host.appendChild(lab);


        let divGlavni = document.createElement("div");
        if(vratiFleg() == "k")
            divGlavni.className = "divGlavniPretplate2";
        if(vratiFleg() == "t")
            divGlavni.className = "divGlavniPretplate";
        host.appendChild(divGlavni);



        fetch("https://localhost:5001/Pretplata/VratiPretplate/"+vratiID(),{
            method:"GET",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){                

                s.json().then(obj=>{ 
                    obj.forEach(data =>{
                        if (data.fleg == "k"){
                            var k = new Pretplata(data.id, data.datumOd, data.datumDo,
                                data.trenerUn, data.paketNaziv, data.trenerID);
                            k.crtajPretplatu(divGlavni);
                        }
                        else if(data.fleg == "t"){
                            var t = new Pretplata(data.id, data.datumOd, data.datumDo,
                                data.klijentUn, data.paketNaziv, data.klijentID);
                            t.crtajPretplatu(divGlavni);
                        }
                    });
                });
            }
            else{
                s.text().then(p=>{
                    alert(p);
                })
            }
        })
    }

    crtajPocetnuNeprijavljen(host){
        let dobrodosliDiv = document.createElement("div");
        dobrodosliDiv.className = "dobrodosliDiv";
        host.appendChild(dobrodosliDiv);

        let dobrodosli = document.createElement("label");
        dobrodosli.className = "dobrodosliLab";
        dobrodosli.innerHTML="DOBRODOŠLI NA";
        dobrodosliDiv.appendChild(dobrodosli);

        let pic = document.createElement("img");
        pic.className="dobrodosliImg";
        pic.src="assets/logoPocetna4.png";
        dobrodosliDiv.appendChild(pic);

        let divLabPocetna = document.createElement("div");
        divLabPocetna.className = "divLabPocetna";
        dobrodosliDiv.appendChild(divLabPocetna);

            let labPocetna = document.createElement("label");
            labPocetna.className = "labPocetna";
            labPocetna.innerHTML = "Započnite svoje fitness iskustvo";
            divLabPocetna.appendChild(labPocetna);

        let divDugmici = document.createElement("div");
        divDugmici.className = "divDugmePocetna";
        dobrodosliDiv.appendChild(divDugmici);

            let dugmePrijaviSe = document.createElement("button");
            dugmePrijaviSe.className = "dugmePocetna";
            dugmePrijaviSe.innerHTML = "Prijavi se";
            divDugmici.appendChild(dugmePrijaviSe);

            dugmePrijaviSe.onclick=()=>{
                this.crtajPrijavu(document.body.querySelector(".Prikaz"));
            }

            let dugmeRegistracija = document.createElement("button")
            dugmeRegistracija.className = "dugmePocetna";
            dugmeRegistracija.innerHTML = "Registruj se";
            divDugmici.appendChild(dugmeRegistracija);

            dugmeRegistracija.onclick=()=>{
                this.crtajRegistraciju(document.body.querySelector(".Prikaz"))
            }
        
    }


    crtajPodrsku(host){
        host.innerHTML =" ";
        document.body.querySelector(".Search").style.display = "none";

        let divPodrskaGlavni = document.createElement("div");
        divPodrskaGlavni.className = "divPodrskaGlavni";
        host.appendChild(divPodrskaGlavni);

            let divKontakt = document.createElement("div");
            divKontakt.className = "divKontakt";
            divPodrskaGlavni.appendChild(divKontakt);

                let labNaslov = document.createElement("h2");
                labNaslov.innerHTML = "Kontaktirajte nas";
                labNaslov.className = "labNaslovKontakt";
                divKontakt.appendChild(labNaslov);

                let divMail = document.createElement("div")
                divMail.className = "divMail";
                divKontakt.appendChild(divMail);

                    let labelMailN = document.createElement("h4");
                    labelMailN.className = "labelMailN";
                    labelMailN.innerHTML = "Putem maila";
                    divMail.appendChild(labelMailN);

                    let labelMail = document.createElement("label");
                    labelMail.className = "labelMail";
                    labelMail.innerHTML = "Ukoliko zelite da nas kontaktirate, to mozete uciniti putem e-maila: ";
                    divMail.appendChild(labelMail);

                    let labelMailNas = document.createElement("label");
                    labelMailNas.className = "labelMailNas";
                    labelMailNas.innerHTML = "tim2CSP@gmail.com";
                    divMail.appendChild(labelMailNas);

                let divTelefon = document.createElement("div");
                divTelefon.className = "divMail";
                divKontakt.appendChild(divTelefon);

                    let labTelN = document.createElement("h4")
                    labTelN.className = "labMailN";
                    labTelN.innerHTML = "Putem telefona";
                    divTelefon.appendChild(labTelN);

                    let labTelefon = document.createElement("label");
                    labTelefon.className = "labelMail";
                    labTelefon.innerHTML = "Ukoliko zelite da nas kontaktirate, to mozete uciniti putem telefona: "
                    divTelefon.appendChild(labTelefon);

                    let labTelefonNas = document.createElement("label");
                    labTelefonNas.className = "labelMailNas";
                    labTelefonNas.innerHTML = "+381691608321";
                    divTelefon.appendChild(labTelefonNas);

            let divUputstvo = document.createElement("div");
            divUputstvo.className = "divUputstvo";
            divPodrskaGlavni.appendChild(divUputstvo);

                let labUputstvo = document.createElement("h2");
                labUputstvo.innerHTML = "Podrska za korisnike";
                labUputstvo.className = "labUputstvo";
                divUputstvo.appendChild(labUputstvo);

                let divNeprijavljen = document.createElement("div");
                divNeprijavljen.className = "divMail";
                divUputstvo.appendChild(divNeprijavljen)

                    let labNeprijavljen = document.createElement("h4");
                    labNeprijavljen.className = "labNeprijavljen";
                    labNeprijavljen.innerHTML = "Neprijavljeni korisnici : ";
                    divNeprijavljen.appendChild(labNeprijavljen)

                    let neprMogucnosti = document.createElement("label");
                    neprMogucnosti.className = "labelMail";
                    neprMogucnosti.innerHTML = "imaju mogucnost posete forumu, pregledavanja tema i diskusija na forumu";
                    divNeprijavljen.appendChild(neprMogucnosti);

                let divPrijavljen = document.createElement("div");
                divPrijavljen.className = "divMail";
                divUputstvo.appendChild(divPrijavljen)

                    let labPrijavljen = document.createElement("h4");
                    labPrijavljen.className = "labPrijavljen";
                    labPrijavljen.innerHTML = "Prijavljeni korisnici imaju mogucnosti : ";
                    divPrijavljen.appendChild(labPrijavljen)

                    let prMogucnosti = document.createElement("ul");
                    prMogucnosti.className = "labelMail";
                    divPrijavljen.appendChild(prMogucnosti);

                        let listItem = document.createElement("li");
                        listItem.className = "listaMogucnosti";
                        listItem.innerHTML = "posete forumu, pregledavanja tema i diskusija na forumu, lajkovanja postojecih, kao i dodavanja novih tema i komentara.";
                        prMogucnosti.appendChild(listItem);

                        listItem = document.createElement("li");
                        listItem.className = "listaMogucnosti";
                        listItem.innerHTML = "pregledavanja objava trenera, koje se nalaze na pocetnoj strani";
                        prMogucnosti.appendChild(listItem);

                        listItem = document.createElement("li");
                        listItem.className = "listaMogucnosti";
                        listItem.innerHTML = "dodavanje paketa ako su treneri, odnosno pretplacivanja na paket za klijente";
                        prMogucnosti.appendChild(listItem);

                        listItem = document.createElement("li");
                        listItem.className = "listaMogucnosti";
                        listItem.innerHTML = "medjusobne komunikacije (trener-klijent) nakon pretplate";
                        prMogucnosti.appendChild(listItem);

                        listItem = document.createElement("li");
                        listItem.className = "listaMogucnosti";
                        listItem.innerHTML = "sigurne uplate/isplate kredita";
                        prMogucnosti.appendChild(listItem);





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
                                                        document.body.querySelector(".Search").style.display = "none";
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
                                                        document.body.querySelector(".Search").style.display = "none";
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

    crtajHeder(host){
        let btnPrijava=document.body.querySelector(".btnHederPrijaviSe");

        if(btnPrijava!=null){
            btnPrijava.onclick=(ev)=>{
                this.crtajPrijavu(this.kontejner.querySelector(".Prikaz"));
            }
        }


        let btnRegistracija=document.body.querySelector(".btnHederRegistrujSe");


        if(btnRegistracija!=null){
            btnRegistracija.onclick=(ev)=>{
                this.crtajRegistraciju(this.kontejner.querySelector(".Prikaz"));
            }
        }
    }
    crtajPrikaz(host){
        if(vratiID() && !isNaN(vratiID())){
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
    crtajFuter(host){}

    crtajRegistraciju(host){

        let parent = this;

        let pom = this.kontejner.querySelector(".Prikaz");
        pom.innerHTML = "";

        let proveraUsername = false; 
        let proveraEmail = false;
        let proveraPassword = false;
        let proveraPotvrdaPassword = false;
        let proveraIme = false;
        let proveraPrezime = false;
        let proveraGrad = false;
        let proveraDrzava=false;

        function crtajDole(){

            if(miniKontejner.querySelector(".divRegistracijaDole") != null){
                miniKontejner.removeChild(miniKontejner.querySelector(".divRegistracijaDole"));
            }

                
            let dole = document.createElement("div");
            dole.className="divRegistracijaDole";
            miniKontejner.appendChild(dole);
            
            
            //deo za username i email

            d = document.createElement("div");
            d.className="divRegistracijaUsernameEmail";
            // miniKontejner.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            dole.appendChild(d);
            
            
            //deo za korisnicko ime



            d = document.createElement("div");
            d.className="divRegistracijaUsername";
            // miniKontejner.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            document.body.querySelector(".divRegistracijaUsernameEmail").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Korisnicko ime";
            l.className="lblRegistracijaUsername";
            d.appendChild(l);

            let i = document.createElement("input");
            i.className="inputRegistracijaUsername";
            i.placeholder="Unesite korisnicko ime";
            d.appendChild(i);

            i.onchange=(ev)=>{
                let username1=miniKontejner.querySelector(".inputRegistracijaUsername").value;
                if(username1!=""){
                    fetch("https://localhost:5001/Korisnik/ProveriUsername/"+username1,{
                        method:"GET",
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                        }
                    }).then(s=>{
                        if(s.ok){
                            miniKontejner.querySelector(".inputRegistracijaUsername").style.backgroundColor="#7aff95";
                            proveraUsername=true;   
                        }
                        else{
                            proveraUsername=false;
                            miniKontejner.querySelector(".inputRegistracijaUsername").style.backgroundColor="#ff6e6e";
                        }
                    })
                }
                else{
                    miniKontejner.querySelector(".inputRegistracijaUsername").style.backgroundColor="#7689d7b0";
                    miniKontejner.querySelector(".inputRegistracijaUsername").placeholder="Unesite korisnicko ime";
                    proveraUsername=false;
                }

            }


            //deo za email

            d = document.createElement("div");
            d.className="divRegistracijaEmail";
            document.body.querySelector(".divRegistracijaUsernameEmail").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="E-mail";
            l.className="lblRegistracijaEmail";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaEmail";
            i.placeholder="Unesite e-mail";
            d.appendChild(i);



            i.onchange=(ev)=>{
                let email1=miniKontejner.querySelector(".inputRegistracijaEmail").value;
                if(email1!=""){
                    fetch("https://localhost:5001/Korisnik/ProveriEmail/"+email1,{
                        method:"GET",
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                        }
                    }).then(s=>{
                        if(s.ok){
                            miniKontejner.querySelector(".inputRegistracijaEmail").style.backgroundColor="#7aff95"; 
                            proveraEmail=true;   
                        }
                        else{
                            miniKontejner.querySelector(".inputRegistracijaEmail").style.backgroundColor="#ff6e6e";
                            proveraEmail=false;
                        }
                    })
                }
                else{
                    miniKontejner.querySelector(".inputRegistracijaEmail").style.backgroundColor="#7689d7b0";
                    proveraEmail=false;
                }
            }

            //lozinka i provera lozinke

            d = document.createElement("div");
            d.className="divRegistracijaPasswordPlusProvera";
            // miniKontejner.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            dole.appendChild(d);

            //deo za lozinku


            d = document.createElement("div");
            d.className="divRegistracijaPassword";
            // miniKontejner.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            document.body.querySelector(".divRegistracijaPasswordPlusProvera").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Lozinka";
            l.className="lblRegistracijaPassword";
            d.appendChild(l);

            i = document.createElement("input");
            i.type="password";
            i.className="inputRegistracijaPassword";
            i.placeholder="Unesite lozinku";
            d.appendChild(i);

            let pocetnaLozinka = l.innerHTML;


            //placeholder za potvrdu passworda, prikazuje se samo kad je lozinka tacno napisana
            i.oninput=(ev)=>{
                let password1=miniKontejner.querySelector(".inputRegistracijaPassword").value;
                if(password1.length<8 && password1.length>0){
                    miniKontejner.querySelector(".lblRegistracijaPassword").innerHTML=pocetnaLozinka + " (Lozinka prekratka)";
                    proveraPassword=false;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").placeholder="";     
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").disabled=true;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").style.cursor="not-allowed";    
                }
                else if (password1.length>40){
                    miniKontejner.querySelector(".lblRegistracijaPassword").innerHTML=pocetnaLozinka + " (Lozinka predugacka)";
                    proveraPassword=false;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").placeholder="";
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").disabled=true;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").style.cursor="not-allowed";
                }
                else if (password1.length==0){
                    miniKontejner.querySelector(".lblRegistracijaPassword").innerHTML=pocetnaLozinka;
                    proveraPassword=false;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").placeholder="";
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").disabled=true;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").style.cursor="not-allowed";
                }
                else{
                    miniKontejner.querySelector(".lblRegistracijaPassword").innerHTML=pocetnaLozinka;
                    proveraPassword=true;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").placeholder="Potvrdite lozinku";
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").disabled=false;
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").style.cursor="text";

                }
            }


            //deo za proveru lozinke

            d = document.createElement("div");
            d.className="divRegistracijaPasswordProvera";
            // miniKontejner.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            document.body.querySelector(".divRegistracijaPasswordPlusProvera").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Provera lozinke";
            l.className="lblRegistracijaPasswordProvera";
            d.appendChild(l);

            i = document.createElement("input");
            i.type="password";
            i.className="inputRegistracijaPasswordProvera";
            i.disabled=true;
            i.style.cursor="not-allowed";
            d.appendChild(i);

            


            i.onchange=(ev)=>{
                let potvrdaLozinke = miniKontejner.querySelector(".inputRegistracijaPasswordProvera").value;
                if(potvrdaLozinke === miniKontejner.querySelector(".inputRegistracijaPassword").value){
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").style.backgroundColor="#7aff95";
                    proveraPotvrdaPassword=true; 
                }
                else if(potvrdaLozinke.length==0){
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").style.backgroundColor="#7689d7b0";
                    proveraPotvrdaPassword=false; 
                }
                else{
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").style.backgroundColor="#ff6e6e";
                    proveraPotvrdaPassword=false; 
                }
            }



            //deo za ime i prezime

            
            // d = document.createElement("div");
            // d.className="divRegistracijaImePrezime";
            // miniKontejner.appendChild(d);




            //deo za ime i prezimeeee

            d = document.createElement("div");
            d.className="divRegistracijaImePrezime";
            // miniKontejner.querySelector(".divRegistracijaImePrezime").appendChild(d);
            dole.appendChild(d);

            //deo za ime

            d = document.createElement("div");
            d.className="divRegistracijaIme";
            // miniKontejner.querySelector(".divRegistracijaImePrezime").appendChild(d);
            document.body.querySelector(".divRegistracijaImePrezime").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Ime";
            l.className="lblRegistracijaIme";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaIme";
            i.placeholder="Unesite ime";
            d.appendChild(i);


            //deo za prezime


            d = document.createElement("div");
            d.className="divRegistracijaPrezime";
            // miniKontejner.querySelector(".divRegistracijaImePrezime").appendChild(d);
            document.body.querySelector(".divRegistracijaImePrezime").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Prezime";
            l.className="lblRegistracijaPrezime";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaPrezime";
            i.placeholder="Unesite prezime";
            d.appendChild(i);



             //deo za grad i drzavu



            
            d = document.createElement("div");
            d.className="divRegistracijaGradDrzava";
            dole.appendChild(d);

            //deo za grad

            d = document.createElement("div");
            d.className="divRegistracijaGrad";
            // miniKontejner.querySelector(".divRegistracijaGradDrzava").appendChild(d);
            document.body.querySelector(".divRegistracijaGradDrzava").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Grad";
            l.className="lblRegistracijaGrad";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaGrad";
            i.placeholder="Unesite grad";
            d.appendChild(i);


            //deo za drzavu


            d = document.createElement("div");
            d.className="divRegistracijaDrzava";
            // miniKontejner.querySelector(".divRegistracijaGradDrzava").appendChild(d);
            document.body.querySelector(".divRegistracijaGradDrzava").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Drzava";
            l.className="lblRegistracijaDrzava";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaDrzava";
            i.placeholder="Unesite drzavu";
            d.appendChild(i);




            //deo za pol i datum

            d = document.createElement("div");
            d.className="divRegistracijaPolDatum";
            dole.appendChild(d);


            //deo za pol

            d = document.createElement("div");
            d.className="divRegistracijaPol";
            document.body.querySelector(".divRegistracijaPolDatum").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Pol";
            l.className="lblRegistracijaPol";
            d.appendChild(l);

            let sel = document.createElement("select");
            sel.className="selectRegistracijaPol";
            d.appendChild(sel);

            let opcija=document.createElement("option");
            opcija.value="m";
            opcija.innerHTML="Muški";
            opcija.className="optionRegistracijaPol";
            sel.appendChild(opcija);

            opcija=document.createElement("option");
            opcija.value="z";
            opcija.innerHTML="Ženski";
            opcija.className="optionRegistracijaPol";
            sel.appendChild(opcija);
            

           

            


            //deo za datum rodjenja

            d = document.createElement("div");
            d.className="divRegistracijaDatum";
            document.body.querySelector(".divRegistracijaPolDatum").appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Datum rodjenja";
            l.className="lblRegistracijaDatum";
            d.appendChild(l);

            i = document.createElement("input");
            i.type="date";
            i.className="inputRegistracijaDatum";
            d.appendChild(i);


            //deo koji zavisi sta je oznaceno na radio buttonu, ako je trener, prikazuje se biografija, ako je klijent, zanimanje

            d = document.createElement("div");
            d.className="divPomocni";
            dole.appendChild(d);


            //deo za trenera
            if(rb1.checked==true){
                let pom = miniKontejner.querySelector(".divRegistracijaZanimanje");
                if(pom!=null){
                    miniKontejner.querySelector(".divPomocni").removeChild(pom);
                }


                pom = miniKontejner.querySelector(".divRegistracijaBiografija");
                if(pom!=null){
                    miniKontejner.querySelector(".divPomocni").removeChild(pom);
                }

                d = document.createElement("div");
                d.className="divRegistracijaBiografija";
                miniKontejner.querySelector(".divPomocni").appendChild(d);

                l=document.createElement("label");
                l.innerHTML="Biografija";
                l.className="lblRegistracijaBiografija";
                d.appendChild(l);

                i = document.createElement("textarea");
                i.className="inputRegistracijaBiografija";
                i.placeholder="Dodajte svoju biografiju";
                d.appendChild(i);
            }


            //deo za klijenta
            if(rb2.checked==true){
                let pom = miniKontejner.querySelector(".divRegistracijaZanimanje");
                if(pom!=null){
                    miniKontejner.querySelector(".divPomocni").removeChild(pom);
                }

                pom = miniKontejner.querySelector(".divRegistracijaBiografija");
                if(pom!=null){
                    miniKontejner.querySelector(".divPomocni").removeChild(pom);
                }

                d = document.createElement("div");
                d.className="divRegistracijaZanimanje";
                miniKontejner.querySelector(".divPomocni").appendChild(d);

                l=document.createElement("label");
                l.innerHTML="Zanimanje";
                l.className="lblRegistracijaZanimanje";
                d.appendChild(l);

                i = document.createElement("textarea");
                i.className="inputRegistracijaZanimanje";
                i.placeholder="Dodajte svoje zanimanje";
                d.appendChild(i);
            }

            //Deo za dugme Registruj se

            d = document.createElement("div");
            d.className="divRegistracijaDugme";
            dole.appendChild(d);


            let btn = document.createElement("button");
            btn.className="btnRegistracija";
            btn.innerHTML="Registruj se";
            d.appendChild(btn);

            //$ IMPLEMENTIRATI ONCLICK ZA REGISTROVANJE
            let validacija;
            btn.onclick=(ev)=>{
                validacija=true;

                if(proveraUsername==false){
                    miniKontejner.querySelector(".inputRegistracijaUsername").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaUsername").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(proveraPassword==false){
                    miniKontejner.querySelector(".inputRegistracijaPassword").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaPassword").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(proveraEmail==false){
                    miniKontejner.querySelector(".inputRegistracijaEmail").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaEmail").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(proveraPotvrdaPassword==false){
                    miniKontejner.querySelector(".inputRegistracijaPasswordProvera").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaPasswordProvera").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(miniKontejner.querySelector(".inputRegistracijaIme").value.length<1 || 
                miniKontejner.querySelector(".inputRegistracijaIme").value.length>50 ){
                    miniKontejner.querySelector(".inputRegistracijaIme").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaIme").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(miniKontejner.querySelector(".inputRegistracijaPrezime").value.length<1 || 
                miniKontejner.querySelector(".inputRegistracijaPrezime").value.length>50 ){
                    miniKontejner.querySelector(".inputRegistracijaPrezime").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaPrezime").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(miniKontejner.querySelector(".inputRegistracijaGrad").value.length<1 || 
                miniKontejner.querySelector(".inputRegistracijaGrad").value.length>50 ){
                    miniKontejner.querySelector(".inputRegistracijaGrad").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaGrad").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(miniKontejner.querySelector(".inputRegistracijaDrzava").value.length<1 || 
                miniKontejner.querySelector(".inputRegistracijaDrzava").value.length>50 ){
                    miniKontejner.querySelector(".inputRegistracijaDrzava").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaDrzava").classList.remove('error');
                    }, 300);
                    validacija=false;
                }
                if(miniKontejner.querySelector(".inputRegistracijaDatum").value==""){
                    miniKontejner.querySelector(".inputRegistracijaDatum").classList.add("error");
                    setTimeout(function() {
                        miniKontejner.querySelector(".inputRegistracijaDatum").classList.remove('error');
                    }, 300);
                    validacija=false;
                }

                if(validacija==true){
                    let username1=miniKontejner.querySelector(".inputRegistracijaUsername").value;
                    let email1=miniKontejner.querySelector(".inputRegistracijaEmail").value;
                    let password1=miniKontejner.querySelector(".inputRegistracijaPassword").value;
                    let ime1=miniKontejner.querySelector(".inputRegistracijaIme").value;
                    let prezime1=miniKontejner.querySelector(".inputRegistracijaPrezime").value;
                    let pol1=miniKontejner.querySelector(".optionRegistracijaPol:checked").value;
                    let grad1=miniKontejner.querySelector(".inputRegistracijaGrad").value;
                    let drzava1=miniKontejner.querySelector(".inputRegistracijaDrzava").value;
                    let datum1=miniKontejner.querySelector(".inputRegistracijaDatum").value;


                    if(rb2.checked==true){
                        let zanimanje1;
                        if(miniKontejner.querySelector(".inputRegistracijaZanimanje").value == ""){
                            zanimanje1="Klijent nije dodao zanimanje";
                        }
                        else{
                            zanimanje1=miniKontejner.querySelector(".inputRegistracijaUsername").value;
                        }

                        fetch("https://localhost:5001/Auth/RegistrujKlijenta/"+ime1+"/"+prezime1+"/"+email1+"/"+username1+"/"+password1+"/"+grad1+"/"+drzava1+"/"+datum1+"/"+pol1+"/"+zanimanje1,{
                            method:"POST",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                alert("Uspesno ste se registrovali");
                                parent.crtajPrijavu(document.body.querySelector(".Prikaz"));
                            }
                            else{
                                s.text().then(data=>{
                                    alert(data);
                                });
                            }
                        })
                    }

                    if(rb1.checked==true){
                        let biografija1;
                        if(miniKontejner.querySelector(".inputRegistracijaBiografija").value == ""){
                            biografija1="Trener nije dodao biografiju";
                        }
                        else{
                            biografija1=miniKontejner.querySelector(".inputRegistracijaBiografija").value;
                        }

                        fetch("https://localhost:5001/Auth/RegistrujTrenera/"+ime1+"/"+prezime1+"/"+email1+"/"+username1+"/"+password1+"/"+grad1+"/"+drzava1+"/"+datum1+"/"+pol1+"/"+biografija1,{
                            method:"POST",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                alert("Uspesno ste se registrovali");
                                parent.crtajPrijavu(document.body.querySelector(".Prikaz"));
                                     
                            }
                            else{
                                s.text().then(data=>{
                                    alert(data);
                                    
                                });
                            }

                        })

                    }


                }
                

            }

        }
        
        let miniKontejner = document.createElement("div");
        miniKontejner.className="divRegistracija";
        host.appendChild(miniKontejner);

        //deo za naslov, Registruj se

        let d = document.createElement("div");
        d.className="divRegistracijaNaslov";
        d.innerHTML="Registruj se";
        miniKontejner.appendChild(d);

        //deo za biranje izmedju Trenera/Klijenta

        d = document.createElement("div");
        d.className="divRegistracijaTrenerKlijent";
        miniKontejner.appendChild(d);

        //Deo za odabir trenera

        d=document.createElement("div");
        d.className="divRegistracijaTrener";
        miniKontejner.querySelector(".divRegistracijaTrenerKlijent").appendChild(d);

        let l = document.createElement("label");
        l.innerHTML="Trener";
        d.appendChild(l);

        let rb1 = document.createElement("input");
        rb1.type="radio";
        rb1.value="t";
        rb1.className="rbRegistracijaKlijentTrener";
        rb1.name="trenerklijent";
        d.appendChild(rb1);


        // dodati ikonicu trenera!!!!!!!!!!
        let s = document.createElement("img");
        s.src="assets/trener.png";
        s.className="imgRegistracijaTrener";
        d.appendChild(s);


        
        //Deo za odabir Klijenta

        d=document.createElement("div");
        d.className="divRegistracijaKlijent";
        miniKontejner.querySelector(".divRegistracijaTrenerKlijent").appendChild(d);

        l = document.createElement("label");
        l.innerHTML="Klijent";
        d.appendChild(l);

        let rb2 = document.createElement("input");
        rb2.type="radio";
        rb2.value="k";
        rb2.className="rbRegistracijaKlijentTrener";
        rb2.name="trenerklijent";

        d.appendChild(rb2);


        // dodati ikonicu klijenta!!!!!!!!!!
        s = document.createElement("img");
        s.src="assets/klijent.png";
        s.className="imgRegistracijaKlijent";
        d.appendChild(s);

        rb1.addEventListener("click", crtajDole);
        rb2.addEventListener("click", crtajDole);

       

    }

    

    crtajPrijavu(host){
        let pom = this.kontejner.querySelector(".Prikaz");
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

            if(username1==""){
                username1="-";
            }

            if(sifra1==""){
                sifra1="-";
            }

            fetch("https://localhost:5001/Auth/PrijaviSe/"+username1+"/"+sifra1,{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        alert("Uspesna prijava");
                        // localStorage.setItem("id", data.id);
                        localStorage.setItem("token", data.token.result.value);

                        // localStorage.setItem("username",data.username);
                        // localStorage.setItem("fleg", data.fleg);
                       

                        
                        if(data.fleg == "a"){
                            window.location.href = "./admin";
                        }
                        else{
                            window.location.href = "./prijavljen";
                            this.crtajMojProfil(this.kontejner.querySelector(".Prikaz"));
                        }


                    })

                }
                else{
                    s.text().then(data => 
                        {
                            alert(data);
                        })
                }
            })
        }


    }

    crtajMojProfil(host){
        // host.innerHTML="";

        // let h = this.kontejner.querySelector(".Heder");
        // h.innerHTML = "";
        // let imeLbl = document.createElement("label");
        // imeLbl.className = "imeLbl";
        // imeLbl.innerHTML = kor;
        // h.appendChild(imeLbl);

        // let odjaviSe = document.createElement("button");
        // odjaviSe.className="odjaviSeBtn";
        // odjaviSe.innerHTML = "Odjavi se";
        // h.appendChild(odjaviSe);

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
                if(p.ok){
                    // alert("aaa");
                    localStorage.clear();
                    // this.clear();
                    // this.crtajHeder(this.kontejner.querySelector(".Heder"));
                    // this.crtajPrikaz(this.kontejner.querySelector(".Prikaz"));
                    // this.crtajFuter(this.kontejner.querySelector(".Futer"));
                }
            })
        }
		
		let prikaziProfil = document.body.querySelector(".prikaziProfil")
        prikaziProfil.onclick = (ev) =>{
            this.crtajProfil(host);
        }

        // let forum = document.createElement("button");
        // forum.className="forumBtn";
        // forum.innerHTML = "Forum";
        // h.appendChild(forum);
        // forum.onclick = (ev) => this.crtajForum(host);

        let forum = document.body.querySelector(".crtajForum");
        forum.onclick=()=>{
            window.location.href = "./prijavljen";
            this.crtajForum(host);
            this.kontejner.querySelector(".aPocetna").classList.remove("selected");
            this.kontejner.querySelector(".aForum").classList.add("selected");
        }

        let pocetna=document.body.querySelector(".crtajPocetnuPrijavljen");
        pocetna.onclick=(ev)=>{
            window.location.href = "./prijavljen";
        }
        

    }


    crtajChat(host){
        host.innerHTML="";
        document.body.querySelector(".inputSearch").value="";

        document.body.querySelector(".Search").style.display = "flex";

        let glavniChat = document.createElement("div");
        glavniChat.className="glavniChat";
        host.appendChild(glavniChat);






        let l = document.createElement("label");
        l.innerHTML="Chat";
        l.className="lblChat";
        glavniChat.appendChild(l);


        let chatDole = document.createElement("div");
        chatDole.className="chatDole";
        glavniChat.appendChild(chatDole);


        let i = document.createElement("input");
        i.className="inputChatUsername";
        i.placeholder="Unesite username korisnika";
        chatDole.appendChild(i);

        let d;
        let flagChat = 0;

        let chatime = document.createElement("div");
        chatime.className="chatime";
        chatDole.appendChild(chatime);

        l = document.createElement("label");
        l.className="labelaTrener";
        l.innerHTML="";
        chatime.appendChild(l);


        d = document.createElement("div");
        d.className="chatPoruke";
        
        chatDole.appendChild(d);

        i.onchange=()=>{

            //DEO ZA KLIJENTAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
            if(vratiFleg()=="k"){
                let iii = document.body.querySelector(".inputChatUsername").value;
                if(document.body.querySelector(".chatPoruke")!=null){
                    document.body.querySelector(".chatPoruke").innerHTML="";
                }
                if(iii!=""){

                    fetch("https://localhost:5001/Chat/NadjiTrenera/"+vratiID()+"/"+iii,{
                        method:"GET",
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                        }
                    }).then(s=>{
                        if(s.ok){
                            s.json().then(f=>{
                                document.body.querySelector(".inputChatUsername").style.backgroundColor="#7aff95"; 
                                flagChat=1;


                                let pom = document.body.querySelector(".labelaTrener");
                                pom.innerHTML=f.ime+ " " +f.prezime;
                                pom.onclick=()=>{
                                    fetch("https://localhost:5001/Chat/VratiPoruke/"+vratiID()+"/"+iii,{
                                        method:"GET",
                                        headers: {
                                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                        }
                                    }).then(p=>{
                                        if(document.body.querySelector(".saljiPoruku")!=null){
                                            document.body.querySelector(".saljiPoruku").parentNode.removeChild(document.body.querySelector(".saljiPoruku"));
                                        }
                                        if(p.ok){
                                                
                                                if(p.status==200){
                                                    p.json().then(s=>{
    
                                                        document.body.querySelector(".chatPoruke").innerHTML="";
                                                        s.forEach(por=>{
                                                            let porDiv = document.createElement("div");
                                                            if(por.fleg==vratiFleg()){
                                                                porDiv.className="desno";
                                                            }
                                                            else{
                                                                porDiv.className="levo";
                                                            }
                                                            porDiv.innerHTML=por.sadrzaj;
                                                            document.body.querySelector(".chatPoruke").appendChild(porDiv);
        
                                                        })
                                                    })
                                                }

                                            
                                            

                                                    d = document.createElement("div");
                                                    d.className="saljiPoruku";
                                                    chatDole.appendChild(d);


                                                    i = document.createElement("input");
                                                    i.className="inputUnesiPoruku";
                                                    i.placeholder="Unesi poruku";
                                                    d.appendChild(i);


                                                    let btn = document.createElement("button");
                                                    btn.innerHTML="Posalji";
                                                    btn.className="btnPosaljiPoruku";
                                                    d.appendChild(btn);

                                                    document.body.querySelector(".chatPoruke").onmouseover=()=>{
                                                        let iop =  document.body.querySelector(".inputChatUsername").value;
                                                        fetch("https://localhost:5001/Chat/VratiPoruke/"+vratiID()+"/"+iop,{
                                                            method:"GET",
                                                            headers: {
                                                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                                            }
                                                        }).then(p=>{
                                                            // if(document.body.querySelector(".saljiPoruku")!=null){
                                                            //     document.body.querySelector(".saljiPoruku").parentNode.removeChild(document.body.querySelector(".saljiPoruku"));
                                                            // }
                                                            if(p.ok){
                                                                    
                                                                    if(p.status==200){
                                                                        p.json().then(s=>{
                                            
                                                                            document.body.querySelector(".chatPoruke").innerHTML="";
                                                                            s.forEach(por=>{
                                                                                let porDiv = document.createElement("div");
                                                                                if(por.fleg==vratiFleg()){
                                                                                    porDiv.className="desno";
                                                                                }
                                                                                else{
                                                                                    porDiv.className="levo";
                                                                                }
                                                                                porDiv.innerHTML=por.sadrzaj;
                                                                                document.body.querySelector(".chatPoruke").appendChild(porDiv);
                                            
                                                                            })
                                                                        })
                                                                    }
                                                                }
                                                            })
                                                    }

                                                

                                                    btn.onclick=()=>{
                                                        let novaPor = i.value;
                                                        fetch("https://localhost:5001/Chat/PosaljiPorukuKaoKlijent/"+vratiID()+"/"+iii+"/"+novaPor,{
                                                            method:"POST",
                                                            headers: {
                                                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                                            }
                                                        }).then(p=>{
                                                            if(p.ok){
                                                                document.querySelector(".inputUnesiPoruku").value = "";
                                                                p.json().then(s=>{
                                                                    document.body.querySelector(".chatPoruke").innerHTML="";
                                                                    s.forEach(por=>{
                                                                        let porDiv = document.createElement("div");
                                                                        if(por.fleg==vratiFleg()){
                                                                            porDiv.className="desno";
                                                                        }
                                                                        else{
                                                                            porDiv.className="levo";
                                                                        }
                                                                        porDiv.innerHTML=por.sadrzaj;
                                                                        document.body.querySelector(".chatPoruke").appendChild(porDiv);

                                                                    })
                                                                })
                                                            }
                                                            else{
                                                                p.text().then(s=>{
                                                                    console.log(s);
                                                                })
                                                            }
                                                        })
                                                    }
                                            }
                                        else{
                                            p.text().then(data=>{
                                                console.log(data);
                                            })
                                        }
                                    })
                                }

                                
                                
                            })

                        }
                        else{
                            s.text().then(f=>{
                                document.body.querySelector(".inputChatUsername").style.backgroundColor="#7c5151";
                                flagChat=0;
                                document.body.querySelector(".labelaTrener").innerHTML="";

                            })

                        }
                    })
                }

                else{
                    document.body.querySelector(".inputChatUsername").style.backgroundColor="#ffffff";
                    document.body.querySelector(".labelaTrener").innerHTML="";

                    flagChat=0;
                }
            }


            //DEO ZA TRENERAAAAAAAAAAAAAAA
            else if(vratiFleg()=="t"){
                let iii = document.body.querySelector(".inputChatUsername").value;
                if(document.body.querySelector(".chatPoruke")!=null){
                    document.body.querySelector(".chatPoruke").innerHTML="";
                }
                if(iii!=""){

                    fetch("https://localhost:5001/Chat/NadjiKlijenta/"+vratiID()+"/"+iii,{
                        method:"GET",
                        headers: {
                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                        }
                    }).then(s=>{
                        if(s.ok){
                            s.json().then(f=>{
                                document.body.querySelector(".inputChatUsername").style.backgroundColor="#2fd252b0"; 
                                flagChat=1;

                                let pom = document.body.querySelector(".labelaTrener");
                                pom.innerHTML=f.ime+ " " +f.prezime;
                                pom.onclick=()=>{
                                    fetch("https://localhost:5001/Chat/VratiPoruke/"+vratiID()+"/"+iii,{
                                        method:"GET",
                                        headers: {
                                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                        }
                                    }).then(p=>{
                                        if(document.body.querySelector(".saljiPoruku")!=null){
                                            document.body.querySelector(".saljiPoruku").parentNode.removeChild(document.body.querySelector(".saljiPoruku"));
                                        }
                                        if(p.ok){
                                            if(p.status==200){
                                                p.json().then(s=>{
                                                    document.body.querySelector(".chatPoruke").innerHTML="";
                                                    s.forEach(por=>{
                                                        let porDiv = document.createElement("div");
                                                        if(por.fleg==vratiFleg()){
                                                            porDiv.className="desno";
                                                        }
                                                        else{
                                                            porDiv.className="levo";
                                                        }
                                                        porDiv.innerHTML=por.sadrzaj;
                                                        document.body.querySelector(".chatPoruke").appendChild(porDiv);
    
                                                    })
                                                }
                                             )}


                                                d = document.createElement("div");
                                                d.className="saljiPoruku";
                                                chatDole.appendChild(d);


                                                i = document.createElement("input");
                                                i.className="inputUnesiPoruku";
                                                i.placeholder="Unesi poruku";
                                                d.appendChild(i);


                                                let btn = document.createElement("button");
                                                btn.innerHTML="Posalji";
                                                btn.className="btnPosaljiPoruku";
                                                d.appendChild(btn);

                                            
                                                document.body.querySelector(".chatPoruke").onmouseover=()=>{
                                                    let iop =  document.body.querySelector(".inputChatUsername").value;
                                                    fetch("https://localhost:5001/Chat/VratiPoruke/"+vratiID()+"/"+iop,{
                                                        method:"GET",
                                                        headers: {
                                                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                                        }
                                                    }).then(p=>{
                                                        // if(document.body.querySelector(".saljiPoruku")!=null){
                                                        //     document.body.querySelector(".saljiPoruku").parentNode.removeChild(document.body.querySelector(".saljiPoruku"));
                                                        // }
                                                        if(p.ok){
                                                                
                                                                if(p.status==200){
                                                                    p.json().then(s=>{
                                        
                                                                        document.body.querySelector(".chatPoruke").innerHTML="";
                                                                        s.forEach(por=>{
                                                                            let porDiv = document.createElement("div");
                                                                            if(por.fleg==vratiFleg()){
                                                                                porDiv.className="desno";
                                                                            }
                                                                            else{
                                                                                porDiv.className="levo";
                                                                            }
                                                                            porDiv.innerHTML=por.sadrzaj;
                                                                            document.body.querySelector(".chatPoruke").appendChild(porDiv);
                                        
                                                                        })
                                                                    })
                                                                }
                                                            }
                                                        })
                                                }

                                                btn.onclick=()=>{
                                                    let novaPor = i.value;
                                                    fetch("https://localhost:5001/Chat/PosaljiPorukuKaoTrener/"+vratiID()+"/"+iii+"/"+novaPor,{
                                                        method:"POST",
                                                        headers: {
                                                            'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                                        }
                                                    }).then(p=>{
                                                        if(p.ok){
                                                            document.querySelector(".inputUnesiPoruku").value = "";
                                                            p.json().then(s=>{
                                                                document.body.querySelector(".chatPoruke").innerHTML="";
                                                                s.forEach(por=>{
                                                                    let porDiv = document.createElement("div");
                                                                    if(por.fleg==vratiFleg()){
                                                                        porDiv.className="desno";
                                                                    }
                                                                    else{
                                                                        porDiv.className="levo";
                                                                    }
                                                                    porDiv.innerHTML=por.sadrzaj;
                                                                    document.body.querySelector(".chatPoruke").appendChild(porDiv);

                                                                })
                                                            })
                                                        }
                                                        else{
                                                            p.text().then(s=>{
                                                                console.log(s);
                                                            })
                                                        }
                                                    })
                                                }
                                            
                                        }
                                        else{
                                            p.text().then(data=>{
                                                console.log(data);
                                            })
                                        }
                                    })
                                }
                            })

                        }
                        else{
                            s.text().then(f=>{
                                document.body.querySelector(".inputChatUsername").style.backgroundColor="#ff6e6e";
                                flagChat=0;
                                document.body.querySelector(".labelaTrener").innerHTML="";

                            })

                        }
                    })
                }

                else{
                    document.body.querySelector(".inputChatUsername").style.backgroundColor="#ffffff";
                    document.body.querySelector(".labelaTrener").innerHTML="";

                    flagChat=0;
                }
            }
            
        }




    }

    crtajForum(host){

        host.innerHTML = "";
        document.body.querySelector(".Search").style.display = "flex";

        let pretraziTemu = document.createElement("div");
        pretraziTemu.className = "pretraziTemu";
        host.appendChild(pretraziTemu);

        let inputTema = document.createElement("input");
        inputTema.className="inputTema";
        inputTema.placeholder="Pretrazi temu";
        pretraziTemu.appendChild(inputTema);

        let pom12 = this;
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

        if(vratiID() && !isNaN(vratiID())){
            let dodajTemuDiv = document.createElement("div");
            dodajTemuDiv.className = "dodajTemuDiv";
            host.appendChild(dodajTemuDiv);

            let dodajTemuBtn = document.createElement("button");
            dodajTemuBtn.className = "dodajTemuBtn";
            dodajTemuBtn.innerHTML = "Dodaj temu";
            dodajTemuDiv.appendChild(dodajTemuBtn);

            let dodajTemuTxtDiv = document.createElement("div");
            dodajTemuTxtDiv.className = "dodajTemuTxtDiv";
            dodajTemuDiv.appendChild(dodajTemuTxtDiv);

            let dugmiciii = document.createElement("div");
            dugmiciii.className = "dugmiciii";
            dodajTemuDiv.appendChild(dugmiciii);

            dodajTemuBtn.onclick = (ev) => {
                dodajTemuTxtDiv.innerHTML = "";
                dugmiciii.innerHTML="";
                dodajTemuDiv.classList.add("dodajTemuDiv2");

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
                dugmiciii.appendChild(potvrdiBtn);                
                potvrdiBtn.onclick = (ev) => this.dodajTemu(host,this);

                let otkaziBtn = document.createElement("button");
                otkaziBtn.className="otkaziBtn";
                otkaziBtn.innerHTML = "Otkazi";
                dugmiciii.appendChild(otkaziBtn);
                otkaziBtn.onclick = (ev) => {dodajTemuTxtDiv.innerHTML=""; dugmiciii.innerHTML="";dodajTemuDiv.classList.remove("dodajTemuDiv2");}

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
	
	crtajProfil(host){
        host.innerHTML = "";
        this.kontejner.querySelector(".aPocetna").classList.remove("selected");
        this.kontejner.querySelector(".aForum").classList.remove("selected");
        this.kontejner.querySelector(".aChat").classList.remove("selected");
        this.kontejner.querySelector(".aPretplate").classList.remove("selected");
        this.kontejner.querySelector(".aONama").classList.remove("selected");
        document.body.querySelector(".Search").style.display = "none";
        fetch("https://localhost:5001/Korisnik/VratiKorisnika/"+vratiID(),{
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
                            k.crtajProfKlijenta(host);
                        }
                        else if(data.fleg == "t"){
                            var t = new Trener(data.id, data.ime, data.prezime,
                                data.email, data.username, data.grad, data.drzava, 
                                data.fleg, data.pol, data.datumRodjenja, data.biografija, data.krediti);
                            t.crtajProfTrenera(host);
                        }
                    });
                }
            })
    }

    dodajTemu(host,t){
        fetch("https://localhost:5001/Objava/DodajTemu/"+vratiID()+"/"+host.querySelector(".naslovInTxt").value+"/"+host.querySelector(".sadrzajInTxt").value,{
            method:"POST",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                t.crtajForum(host);
            }
            
        })
    }

    

    clear(){
        this.kontejner.querySelector(".Prikaz").innerHTML="";
        this.kontejner.querySelector(".Heder").innerHTML="";
    }


    


}