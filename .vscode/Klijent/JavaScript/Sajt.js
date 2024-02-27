import { Registracija } from "./Registracija.js";

export class Sajt{

    constructor(){
        this.kontejner=null;
    }

    crtaj(host){
        
        this.kontejner=document.createElement("div");
        this.kontejner.className="GlavniKontejner";
        host.appendChild(this.kontejner);

        let kontejnerHeder = document.createElement("div");
        kontejnerHeder.className="Heder";
        this.kontejner.appendChild(kontejnerHeder);

        let kontejnerPrikaz = document.createElement("div");
        kontejnerPrikaz.className="Prikaz";
        this.kontejner.appendChild(kontejnerPrikaz);

        let kontejnerFuter = document.createElement("div");
        kontejnerFuter.className="Futer";
        this.kontejner.appendChild(kontejnerFuter);

        this.crtajHeder(kontejnerHeder);
        this.crtajPrikaz(kontejnerPrikaz);
        this.crtajFuter(kontejnerFuter);
    }

    crtajHeder(host){
        let btnPrijava = document.createElement("button");
        btnPrijava.className="btnHederPrijaviSe";
        btnPrijava.innerHTML="Prijavi se";
        host.appendChild(btnPrijava);

        let btnRegistracija = document.createElement("button");
        btnRegistracija.className="btnHederRegistrujSe";
        btnRegistracija.innerHTML="Registruj se";
        host.appendChild(btnRegistracija);

        btnRegistracija.onclick=(ev)=>{
            // window.open("./registracija.html");
            // var r = new Registracija();
            
            // location.replace("./registracija.html");
            this.crtajRegistraciju(this.kontejner.querySelector(".Prikaz"));
        }

        btnPrijava.onclick=(ev)=>{
            this.crtajPrijavu(this.kontejner.querySelector(".Prikaz"));
        }
    }
    crtajPrikaz(host){}
    crtajFuter(host){}

    crtajRegistraciju(host){
        function crtajDole(){

            if(miniHost.querySelector(".divRegistracijaDole") != null){
                miniHost.removeChild(miniHost.querySelector(".divRegistracijaDole"));
            }

                
            let dole = document.createElement("div");
            dole.className="divRegistracijaDole";
            miniHost.appendChild(dole);
            
            //deo za korisnicko ime

            d = document.createElement("div");
            d.className="divRegistracijaUsername";
            // miniHost.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Korisnicko ime";
            l.className="lblRegistracijaUsername";
            d.appendChild(l);

            let i = document.createElement("input");
            i.className="inputRegistracijaUsername";
            d.appendChild(i);

            //$IMPLEMENTIRATI DA SE PROVERAVA USERNAME IZ BAZE KAD GOD SE NESTO UNESE
            i.onchange=(ev)=>{
                alert("a");
            }


            //deo za email

            d = document.createElement("div");
            d.className="divRegistracijaEmail";
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="E-mail";
            l.className="lblRegistracijaEmail";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaEmail";
            d.appendChild(i);


            //$IMPLEMENTIRATI DA SE PROVERAVA MEJL IZ BAZE KAD SE UNESE NEKI MEJL

            i.onchange=(ev)=>{
                alert("a");
            }


            //deo za lozinku


            d = document.createElement("div");
            d.className="divRegistracijaPassword";
            // miniHost.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Lozinka";
            l.className="lblRegistracijaPassword";
            d.appendChild(l);

            i = document.createElement("input");
            i.type="password";
            i.className="inputRegistracijaPassword";
            d.appendChild(i);

            //$IMPLEMENTIRATI DA SE PROVERAVA LOZINKA DOK SE KUCA, DA LI JE KRATKA DUGACKA

            i.onchange=(ev)=>{
                alert("a");
            }


            //deo za proveru lozinke

            d = document.createElement("div");
            d.className="divRegistracijaPasswordProvera";
            // miniHost.querySelector(".divRegistracijaUsernamePassword").appendChild(d);
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Provera lozinke";
            l.className="lblRegistracijaPasswordProvera";
            d.appendChild(l);

            i = document.createElement("input");
            i.type="password";
            i.className="inputRegistracijaPasswordProvera";
            d.appendChild(i);

            

            //$IMPLEMENTIRATI DA SE PROVERAVA LOZINKA DA LI JE ISTA

            i.onchange=(ev)=>{
                alert("a");
            }



            //deo za ime i prezime

            
            // d = document.createElement("div");
            // d.className="divRegistracijaImePrezime";
            // miniHost.appendChild(d);

            //deo za ime

            d = document.createElement("div");
            d.className="divRegistracijaIme";
            // miniHost.querySelector(".divRegistracijaImePrezime").appendChild(d);
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Ime";
            l.className="lblRegistracijaIme";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaIme";
            d.appendChild(i);


            //deo za prezime


            d = document.createElement("div");
            d.className="divRegistracijaPrezime";
            // miniHost.querySelector(".divRegistracijaImePrezime").appendChild(d);
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Prezime";
            l.className="lblRegistracijaPrezime";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaPrezime";
            d.appendChild(i);



            //deo za pol

            d = document.createElement("div");
            d.className="divRegistracijaPol";
            dole.appendChild(d);

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
            sel.appendChild(opcija);

            opcija=document.createElement("option");
            opcija.value="z";
            opcija.innerHTML="Ženski";
            sel.appendChild(opcija);
            

            //deo za grad i drzavu



            
            // d = document.createElement("div");
            // d.className="divRegistracijaGradDrzava";
            // miniHost.appendChild(d);

            //deo za grad

            d = document.createElement("div");
            d.className="divRegistracijaGrad";
            // miniHost.querySelector(".divRegistracijaGradDrzava").appendChild(d);
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Grad";
            l.className="lblRegistracijaGrad";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaGrad";
            d.appendChild(i);


            //deo za drzavu


            d = document.createElement("div");
            d.className="divRegistracijaDrzava";
            // miniHost.querySelector(".divRegistracijaGradDrzava").appendChild(d);
            dole.appendChild(d);

            l=document.createElement("label");
            l.innerHTML="Drzava";
            l.className="lblRegistracijaDrzava";
            d.appendChild(l);

            i = document.createElement("input");
            i.className="inputRegistracijaDrzava";
            d.appendChild(i);


            


            //deo za datum rodjenja

            d = document.createElement("div");
            d.className="divRegistracijaDatum";
            dole.appendChild(d);

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
                let pom = miniHost.querySelector(".divRegistracijaZanimanje");
                if(pom!=null){
                    miniHost.querySelector(".divPomocni").removeChild(pom);
                }


                pom = miniHost.querySelector(".divRegistracijaBiografija");
                if(pom!=null){
                    miniHost.querySelector(".divPomocni").removeChild(pom);
                }

                d = document.createElement("div");
                d.className="divRegistracijaBiografija";
                miniHost.querySelector(".divPomocni").appendChild(d);

                l=document.createElement("label");
                l.innerHTML="Biografija";
                l.className="lblRegistracijaBiografija";
                d.appendChild(l);

                i = document.createElement("textarea");
                i.className="inputRegistracijaBiografija";
                d.appendChild(i);
            }


            //deo za klijenta
            if(rb2.checked==true){
                let pom = miniHost.querySelector(".divRegistracijaZanimanje");
                if(pom!=null){
                    miniHost.querySelector(".divPomocni").removeChild(pom);
                }

                pom = miniHost.querySelector(".divRegistracijaBiografija");
                if(pom!=null){
                    miniHost.querySelector(".divPomocni").removeChild(pom);
                }

                d = document.createElement("div");
                d.className="divRegistracijaZanimanje";
                miniHost.querySelector(".divPomocni").appendChild(d);

                l=document.createElement("label");
                l.innerHTML="Zanimanje";
                l.className="lblRegistracijaZanimanje";
                d.appendChild(l);

                i = document.createElement("textarea");
                i.className="inputRegistracijaZanimanje";
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

            btn.onclick=(ev)=>{
                
            }
        }
        let miniHost = document.createElement("div");
        miniHost.className="divRegistracija";
        host.appendChild(miniHost);

        //deo za naslov, Registruj se

        let d = document.createElement("div");
        d.className="divRegistracijaNaslov";
        d.innerHTML="Registruj se";
        miniHost.appendChild(d);

        //deo za biranje izmedju Trenera/Klijenta

        d = document.createElement("div");
        d.className="divRegistracijaTrenerKlijent";
        miniHost.appendChild(d);

        //Deo za odabir trenera

        d=document.createElement("div");
        d.className="divRegistracijaTrener";
        miniHost.querySelector(".divRegistracijaTrenerKlijent").appendChild(d);

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
        s.src="../Slike/trener.png";
        s.className="imgRegistracijaTrener";
        d.appendChild(s);


        
        //Deo za odabir Klijenta

        d=document.createElement("div");
        d.className="divRegistracijaKlijent";
        miniHost.querySelector(".divRegistracijaTrenerKlijent").appendChild(d);

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
        s.src="../Slike/klijent.png";
        s.className="imgRegistracijaKlijent";
        d.appendChild(s);

        rb1.addEventListener("click", crtajDole);
        rb2.addEventListener("click", crtajDole);

       

    }

    crtajPrijavu(host){
        let miniHost = document.createElement("div");
        miniHost.className="divPrijava";
        host.appendChild(miniHost);

        //deo za naslov, Prijavi se

        let d = document.createElement("div");
        d.className="divPrijavaNaslov";
        d.innerHTML="Prijavi se";
        miniHost.appendChild(d);

        //deo za Username

        d = document.createElement("div");
        d.className="divPrijavaUsername";
        miniHost.appendChild(d);

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
        miniHost.appendChild(d);

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
        miniHost.appendChild(d);


        let btn = document.createElement("button");
        btn.className="btnPrijava";
        btn.innerHTML="Prijavi se";
        d.appendChild(btn);

        //$ IMPLEMENTIRATI ONCLICK ZA PRIJAVLJIVANJE

        btn.onclick=(ev)=>{

        }


    }


}