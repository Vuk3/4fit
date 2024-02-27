import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";
import { MojePretplate } from "./MojePretplate.js";
import { parseJwt } from "./ParseJWT.js";
// import jwt_decode from './jwt-decode.js';


export class Klijent{

    constructor(id, ime, prezime, email, username, grad, drzava, fleg, pol, datumRodjenja, zanimanje, krediti){
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.email = email;
        this.username = username;
        this.grad = grad;
        this.drzava = drzava;
        this.fleg = fleg;
        this.pol = pol;
        this.datumRodjenja = datumRodjenja;
        this.zanimanje = zanimanje;
        this.krediti=krediti;

    }
    crtajProfKlijenta(host){
        host.innerHTML="";

        host.parentNode.parentNode.querySelector(".aPocetna").classList.remove("selected");
        host.parentNode.parentNode.querySelector(".aForum").classList.remove("selected");
        if(vratiFleg()=='k' || vratiFleg()=='t'){
            host.parentNode.parentNode.querySelector(".aChat").classList.remove("selected");
            host.parentNode.parentNode.querySelector(".aPretplate").classList.remove("selected");
            host.parentNode.parentNode.querySelector(".aONama").classList.remove("selected");
        }




        let celaProfKlijentaDiv = document.createElement("div");
        celaProfKlijentaDiv.className="celaProfKlijentaDiv";
        host.appendChild(celaProfKlijentaDiv);

        let infoDiv = document.createElement("div");
        infoDiv.className = "informacijeTreenra";
        celaProfKlijentaDiv.appendChild(infoDiv);

        let infoDiv2 = document.createElement("div");
        infoDiv2.className = "usernameCreditDiv";
        infoDiv.appendChild(infoDiv2);

        let divUsername = document.createElement("div");
        divUsername.className = "divUsername";
        infoDiv2.appendChild(divUsername);

            let labUsername = document.createElement("label");
            labUsername.className = "labUsername"
            labUsername.innerHTML = this.username;
            divUsername.appendChild(labUsername);

        /*let divImeiPre = document.createElement("div");
        divImeiPre.className = "divImeiPre";
        infoDiv.appendChild(divImeiPre);

            let labIme = document.createElement("label");
            labIme.innerHTML = this.ime+ " ";
            labIme.className = "labIme";
            divImeiPre.appendChild(labIme);

            let labPrezime = document.createElement("label");
            labPrezime.innerHTML = " " + this.prezime;
            labPrezime.className = "labPrezime";
            divImeiPre.appendChild(labPrezime); */
            
            
        if(vratiID()==this.id){
            let divKrediti = document.createElement("div");
            divKrediti.className = "divKrediti";
            infoDiv2.appendChild(divKrediti);


                let labKrediti = document.createElement("label");
                labKrediti.innerHTML = "Krediti: "+ this.krediti;
                labKrediti.className = "labKrediti";
                divKrediti.appendChild(labKrediti);

                let dugmeUplati = document.createElement("button");
                dugmeUplati.className = "dugmeIsplati";
                dugmeUplati.innerHTML = "Uplati kredite";
                divKrediti.appendChild(dugmeUplati);

                let divIsplata = document.createElement("div");
                divIsplata.className = "divIsplata";
                infoDiv.appendChild(divIsplata);


                dugmeUplati.onclick=()=>{
                    this.uplatiKrediteForma(divIsplata);
                }


        }

        if(vratiFleg() == 'a'){

            fetch("https://localhost:5001/Admin/VratiBan/"+this.id,{
                    method:"GET",
                    headers: {
                        'Authorization' : 'Bearer ' + localStorage.getItem("token")
                    }
                }).then(s=>{
                    if(s.ok){

                        let buttonBan = document.createElement("button");
                        buttonBan.innerHTML = "Banuj"
                        buttonBan.className = "buttonBan";
                        infoDiv.appendChild(buttonBan);

                        buttonBan.onclick=()=>{

                            let divBan = document.createElement("div");
                            divBan.className = "divBan";
                            infoDiv.appendChild(divBan);

                            let labBan = document.createElement("label");
                            labBan.className = "labBan";
                            labBan.innerHTML = "Razlog za banovanje korisnika ";
                            divBan.appendChild(labBan);

                            let inputBan = document.createElement("input");
                            inputBan.type = "text";
                            inputBan.className = "inputBan";
                            divBan.appendChild(inputBan);

                            let buttonPotvrdi = document.createElement("button");
                            buttonPotvrdi.className = "buttonPotvrdi";
                            buttonPotvrdi.innerHTML = "Potvrdi";
                            divBan.appendChild(buttonPotvrdi);

                            buttonPotvrdi.onclick=()=>{
                                let l = inputBan.value;
                                fetch("https://localhost:5001/Admin/Banuj/"+this.id+"/"+l,{
                                method:"PUT",
                                headers: {
                                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                                }
                            }).then(s=>{
                                if(s.ok){
                                    alert("Uspesno ste banovali korisnika");
                                    divBan.innerHTML = " ";
                                    buttonBan.style.display = "none";
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
                        })
            }

        let divMeni = document.createElement("div");
        divMeni.className = "divMeni";
        celaProfKlijentaDiv.appendChild(divMeni);

            let labelaInfo = document.createElement("label");
            labelaInfo.innerHTML = "Informacije";
            labelaInfo.className = "labelaInfo";
            labelaInfo.style.background = "rgba(1, 11, 51, 0.69)";
            labelaInfo.style.borderRadius = "15px";
            labelaInfo.style.padding = "0.3% 0.3% 0.3% 0.3%";
            labelaInfo.style.color = "rgb(245, 222, 179)";
            divMeni.appendChild(labelaInfo);

            if(this.id == vratiID()){
                let labelaPaketi = document.createElement("label");
                labelaPaketi.innerHTML = "Paketi";
                labelaPaketi.className = "labelaPaketi";
                labelaPaketi.style.background = "rgba(1, 11, 51, 0)";
                labelaPaketi.style.borderRadius = "15px";
                labelaPaketi.style.padding = "0.3% 0.3% 0.3% 0.3%";
                divMeni.appendChild(labelaPaketi);
            
                labelaPaketi.onclick =()=>{
                    this.crtajPakete(divPrikazMenija);
                }
        }

            labelaInfo.onclick =()=>{
                this.crtajInformacije(divPrikazMenija);
            }
        let divPrikazMenija = document.createElement("div");
        divPrikazMenija.className = "divPrikazMenija";
        celaProfKlijentaDiv.appendChild(divPrikazMenija);

        this.crtajInformacije(divPrikazMenija);
    }


    crtajInformacije(host){
        host.innerHTML = " ";
        let pom = host.parentNode.querySelector(".divMeni");
        pom.querySelector(".labelaInfo").style.background = "rgba(1, 11, 51, 0.69)";
        pom.querySelector(".labelaInfo").style.color = "rgb(245, 222, 179)";
        if(this.id == vratiID()){
            pom.querySelector(".labelaPaketi").style.background = "rgba(1, 11, 51, 0";
            pom.querySelector(".labelaPaketi").style.color = "rgb(0,0,0)";
        }

        let divInfoGlavni = document.createElement("div");
        divInfoGlavni.className = "divInfoGlavni";
        host.appendChild(divInfoGlavni);

        let divInfo = document.createElement("div");
        divInfo.className = "divInfo";
        divInfoGlavni.appendChild(divInfo);

        let divIme = document.createElement("div");
        divIme.className = "divIme";
        divInfo.appendChild(divIme);

            let labelaIme = document.createElement("label");
            labelaIme.innerHTML = "Ime : " + this.ime;
            labelaIme.className = "labelaIme";
            divIme.appendChild(labelaIme);

        let divPrezime = document.createElement("div");
        divPrezime.className = "divPrezime";
        divInfo.appendChild(divPrezime);

            let labelaPrezime = document.createElement("label");
            labelaPrezime.innerHTML = "Prezime : " + this.prezime;
            labelaPrezime.className = "labelaPrezime";
            divIme.appendChild(labelaPrezime);

        let divKorIme = document.createElement("div");
        divKorIme.className = "divKorIme";
        divInfo.appendChild(divKorIme);

            let labelaKorIme = document.createElement("label");
            labelaKorIme.innerHTML = "Korisnicko ime : " + this.username;
            labelaKorIme.className = "labelaKorIme";
            divKorIme.appendChild(labelaKorIme);

        let divEmail = document.createElement("div");
        divEmail.className = "divEmail";
        divInfo.appendChild(divEmail);

            let labelaMail = document.createElement("label");
            labelaMail.innerHTML = "Email : " + this.email;
            labelaMail.className = "labelaKorIme";
            divEmail.appendChild(labelaMail);
            if(this.id == vratiID()){
            let buttonEmail = document.createElement("button");
            buttonEmail.innerHTML = "Izmeni e-mail";
            buttonEmail.className = "buttonEmail";
            divEmail.appendChild(buttonEmail);

            buttonEmail.onclick = () =>{
                this.crtajIzmenuMaila(divInfoGlavni);
                
            }
        }

        let divPol = document.createElement("div");
        divPol.className = "divPol";
        divInfo.appendChild(divPol);

            let labelaPol = document.createElement("label");
            labelaPol.innerHTML = "Pol : " + this.pol;
            labelaPol.className = "labelaPol";
            divPol.appendChild(labelaPol);
        
        let divDatum = document.createElement("div");
        divDatum.className = "divDatum";
        divInfo.appendChild(divDatum);

            let ppom = this.datumRodjenja.split("-");
            let ppom2 = ppom[2].split("T");
            console.log(ppom[0]+" "+ppom[1]+" "+ppom2[0]);

            let labelaDatum = document.createElement("label");
            labelaDatum.innerHTML = "Datum rodjenja : " +  ppom2[0] + "/" + ppom[1] + "/" + ppom[0];
            labelaDatum.className = "labelaDatum";
            divDatum.appendChild(labelaDatum);
    
        let divDrzava = document.createElement("div");
        divDrzava.className = "divDrzava";
        divInfo.appendChild(divDrzava);

            let labelaDrzava = document.createElement("label");
            labelaDrzava.innerHTML = "Drzava : " + this.drzava;
            labelaDrzava.className = "labelaGrad";
            divDrzava.appendChild(labelaDrzava);
            if(this.id == vratiID()){

                let buttonDrzava = document.createElement("button");
                buttonDrzava.innerHTML = "Izmeni drzavu";
                buttonDrzava.className = "buttonDrzava";
                divDrzava.appendChild(buttonDrzava);

                buttonDrzava.onclick = () =>{
                    this.crtajIzmenuDrzave(divInfoGlavni);
                    
                }
            }
        let divGrad = document.createElement("div");
        divGrad.className = "divGrad";
        divInfo.appendChild(divGrad);

            let labelaGrad = document.createElement("label");
            labelaGrad.innerHTML = "Grad : " + this.grad;
            labelaGrad.className = "labelaGrad";
            divGrad.appendChild(labelaGrad);
            if(this.id == vratiID()){

                let buttonGrad = document.createElement("button");
                buttonGrad.innerHTML = "Izmeni grad";
                buttonGrad.className = "buttonGrad";
                divGrad.appendChild(buttonGrad);

                buttonGrad.onclick=()=>{
                    this.crtajIzmenuGrada(divInfoGlavni);
                }
            
                let divPassword = document.createElement("div");
                divPassword.className = "divPassword";
                divInfo.appendChild(divPassword);

                    let buttonPass = document.createElement("button");
                    buttonPass.className = "buttonPass";
                    buttonPass.innerHTML = "Izmeni sifru";
                    divPassword.appendChild(buttonPass);

                    buttonPass.onclick=()=>{
                        this.crtajIzmenuPassworda(divInfoGlavni);
                    }
            }

    }

    crtajPakete(host){

        let pom = host.parentNode.querySelector(".divMeni");
        pom.querySelector(".labelaInfo").style.background = "rgba(1, 11, 51, 0)";
        pom.querySelector(".labelaPaketi").style.background = "rgba(1, 11, 51, 0.69";
        pom.querySelector(".labelaPaketi").style.color = "rgb(245, 222, 179)";
        pom.querySelector(".labelaInfo").style.color = "rgb(0,0,0)";
        fetch("https://localhost:5001/Pretplata/VratiPretplateKlijenta/"+vratiID(),{
            method:"GET",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                    if(data.length == 0){
                        let pom = document.body.querySelector(".divPrikazMenija")
                        pom.innerHTML = " ";
                        let divGlavni = document.createElement("div");
                        divGlavni.className = "divNemaPaketa";
                        pom.appendChild(divGlavni);

                        let nemaPaketeLbl = document.createElement("label");
                        nemaPaketeLbl.className = "nemaPaketeLbl";
                        nemaPaketeLbl.innerHTML = "Korisnik nije pretplacen ni na jedan paket!";
                        divGlavni.appendChild(nemaPaketeLbl);
                    }
                    data.forEach(p =>{
                        
                        var MojaPretplata = new MojePretplate(p.id, p.paket.naziv,
                            p.paket.opis, p.paket.cena, p.paket.trajanjePaketa, null,
                            p.trenerUn, p.datumOd, p.datumDo);
                        MojaPretplata.crtajMojePretplate(document.body.querySelector(".divPrikazMenija"));
                    })
                    //Pravi js obj moj paket i crtanje istog, na divprikazmenija.
                })
                
            }
            else{
                s.text().then(data =>{
                    if(data == "Nema korisnika"){
                        alert("Nema korisnika");
                    }
                })
            }
        })
    }

    crtajIzmenuMaila(host){
        let k = document.body.querySelector(".buttonEmail");
        k.style.display="none";

        k = document.body.querySelector(".buttonDrzava");
        k.style.display="none";

        k = document.body.querySelector(".buttonGrad");
        k.style.display="none";

        k = document.body.querySelector(".buttonPass");
        k.style.display="none";

        let divIzmeniEmailGlavni = document.createElement("div");
        divIzmeniEmailGlavni.className = "divIzmeniEmailGlavni";
        host.appendChild(divIzmeniEmailGlavni);

        let divIzmeEmail = document.createElement("div");
        divIzmeEmail.className = "divIzmeEmail"
        divIzmeniEmailGlavni.appendChild(divIzmeEmail);

            let l = document.createElement("label");
            l.innerHTML = "Unesite novi mail";
            divIzmeEmail.appendChild(l);

            let inputIzmMail = document.createElement("input");
            inputIzmMail.className = "inputIzmMail";
            divIzmeEmail.appendChild(inputIzmMail);

        let divIzmeEmailDugmici = document.createElement("div");
        divIzmeEmailDugmici.className = "divIzmeEmailDugmici"
        divIzmeniEmailGlavni.appendChild(divIzmeEmailDugmici);

            let buttonIzmEmailPotvrdi = document.createElement("button");
            buttonIzmEmailPotvrdi.className = "buttonIzmEmailPotvrdi";
            buttonIzmEmailPotvrdi.innerHTML = "Potvrdi"
            divIzmeEmailDugmici.appendChild(buttonIzmEmailPotvrdi);

                buttonIzmEmailPotvrdi.onclick=()=>{
                    this.PotvrdaIzmEmaila(divIzmeniEmailGlavni);
                }

            let buttonIzmEmailPonisti = document.createElement("button");
            buttonIzmEmailPonisti.className = "buttonIzmEmailPonisti";
            buttonIzmEmailPonisti.innerHTML = "Ponisti"
            divIzmeEmailDugmici.appendChild(buttonIzmEmailPonisti);

                buttonIzmEmailPonisti.onclick=()=>{
                    this.BrisiFormuIzmene(divIzmeniEmailGlavni);
                }
    }

    crtajIzmenuDrzave(host){
        let k = document.body.querySelector(".buttonEmail");
        k.style.display="none";

        k = document.body.querySelector(".buttonDrzava");
        k.style.display="none";

        k = document.body.querySelector(".buttonGrad");
        k.style.display="none";

        k = document.body.querySelector(".buttonPass");
        k.style.display="none";

        let divIzmeniDrzavuGlavni = document.createElement("div");
        divIzmeniDrzavuGlavni.className = "divIzmeniDrzavuGlavni";
        host.appendChild(divIzmeniDrzavuGlavni);

        let divIzmeDrzavu = document.createElement("div");
        divIzmeDrzavu.className = "divIzmeDrzavu"
        divIzmeniDrzavuGlavni.appendChild(divIzmeDrzavu);

            let l = document.createElement("label");
            l.innerHTML = "Unesite novu drzavu";
            divIzmeDrzavu.appendChild(l);

            let inputIzmDrzavu = document.createElement("input");
            inputIzmDrzavu.className = "inputIzmDrzavu";
            divIzmeDrzavu.appendChild(inputIzmDrzavu);

        let divIzmeDrzavuDugmici = document.createElement("div");
        divIzmeDrzavuDugmici.className = "divIzmeDrzavuDugmici"
        divIzmeniDrzavuGlavni.appendChild(divIzmeDrzavuDugmici);

            let buttonIzmDrzavuPotvrdi = document.createElement("button");
            buttonIzmDrzavuPotvrdi.className = "buttonIzmDrzavuPotvrdi";
            buttonIzmDrzavuPotvrdi.innerHTML = "Potvrdi"
            divIzmeDrzavuDugmici.appendChild(buttonIzmDrzavuPotvrdi);

                buttonIzmDrzavuPotvrdi.onclick=()=>{
                    this.PotvrdaIzmDrzave(divIzmeniDrzavuGlavni);
                }

            let buttonIzmDrzavuPonisti = document.createElement("button");
            buttonIzmDrzavuPonisti.className = "buttonIzmDrzavuPonisti";
            buttonIzmDrzavuPonisti.innerHTML = "Ponisti"
            divIzmeDrzavuDugmici.appendChild(buttonIzmDrzavuPonisti);

                buttonIzmDrzavuPonisti.onclick=()=>{
                    this.BrisiFormuIzmene(divIzmeniDrzavuGlavni);
                }
    }

    crtajIzmenuGrada(host){
        let k = document.body.querySelector(".buttonEmail");
        k.style.display="none";

        k = document.body.querySelector(".buttonDrzava");
        k.style.display="none";

        k = document.body.querySelector(".buttonGrad");
        k.style.display="none";

        k = document.body.querySelector(".buttonPass");
        k.style.display="none";
        

        let divIzmeniGradGlavni = document.createElement("div");
        divIzmeniGradGlavni.className = "divIzmeniGradGlavni";
        host.appendChild(divIzmeniGradGlavni);

        let divIzmeGrad = document.createElement("div");
        divIzmeGrad.className = "divIzmeGrad"
        divIzmeniGradGlavni.appendChild(divIzmeGrad);

            let l = document.createElement("label");
            l.innerHTML = "Unesite novi grad";
            divIzmeGrad.appendChild(l);

            let inputIzmGrad = document.createElement("input");
            inputIzmGrad.className = "inputIzmGrad";
            divIzmeGrad.appendChild(inputIzmGrad);

        let divIzmeGradDugmici = document.createElement("div");
        divIzmeGradDugmici.className = "divIzmeGradDugmici"
        divIzmeniGradGlavni.appendChild(divIzmeGradDugmici);

            let buttonIzmGradPotvrdi = document.createElement("button");
            buttonIzmGradPotvrdi.className = "buttonIzmGradPotvrdi";
            buttonIzmGradPotvrdi.innerHTML = "Potvrdi"
            divIzmeGradDugmici.appendChild(buttonIzmGradPotvrdi);

                buttonIzmGradPotvrdi.onclick=()=>{
                    this.PotvrdaIzmGrada(divIzmeniGradGlavni);
                }

            let buttonIzmGradPonisti = document.createElement("button");
            buttonIzmGradPonisti.className = "buttonIzmDrzavuPonisti";
            buttonIzmGradPonisti.innerHTML = "Ponisti"
            divIzmeGradDugmici.appendChild(buttonIzmGradPonisti);

                buttonIzmGradPonisti.onclick=()=>{
                    this.BrisiFormuIzmene(divIzmeniGradGlavni);
                }

    }

    crtajIzmenuPassworda(host){
        let proveraSifra;
        let proveraPotvrdaPassword;
        let k = document.body.querySelector(".buttonEmail");
        k.style.display="none";

        k = document.body.querySelector(".buttonDrzava");
        k.style.display="none";

        k = document.body.querySelector(".buttonGrad");
        k.style.display="none";

        k = document.body.querySelector(".buttonPass");
        k.style.display="none";

        let divIzmeniPassGlavni = document.createElement("div");
        divIzmeniPassGlavni.className = "divIzmeniPassGlavni";
        host.appendChild(divIzmeniPassGlavni);

        let divIzmePass = document.createElement("div");
        divIzmePass.className = "divIzmePass"
        divIzmeniPassGlavni.appendChild(divIzmePass);

            let l = document.createElement("label");
            l.innerHTML = "Unesite trenutnu sifru";
            divIzmePass.appendChild(l);

            let inputStariPass = document.createElement("input");
            inputStariPass.className = "inputStariPass";
            inputStariPass.type = "password";
            divIzmePass.appendChild(inputStariPass);

            l = document.createElement("label");
            l.innerHTML = "Unesite novu sifru";
            divIzmePass.appendChild(l);

            let inputNoviPass1 = document.createElement("input");
            inputNoviPass1.className = "inputNoviPass1";
            inputNoviPass1.type = "password";
            divIzmePass.appendChild(inputNoviPass1);

            l = document.createElement("label");
            l.innerHTML = "Ponovite novu sifru";
            divIzmePass.appendChild(l);

            let inputNoviPass2 = document.createElement("input");
            inputNoviPass2.className = "inputNoviPass2";
            inputNoviPass2.type = "password";
            divIzmePass.appendChild(inputNoviPass2);
            
                
            inputNoviPass2.onchange=(ev)=>{
                let potvrdaLozinke = host.querySelector(".inputNoviPass2").value;
                if(potvrdaLozinke === host.querySelector(".inputNoviPass1").value && potvrdaLozinke.length >7){
                    host.querySelector(".inputNoviPass2").style.backgroundColor="#4bde16";
                    proveraPotvrdaPassword=true; 
                }
                else if(potvrdaLozinke.length==0){
                    host.querySelector(".inputNoviPass2").style.backgroundColor="#ffffff";
                    proveraPotvrdaPassword=false; 
                }
                else{
                    host.querySelector(".inputNoviPass2").style.backgroundColor="#d10f0f";
                    proveraPotvrdaPassword=false; 
                }
            }

            let divIzmePassDugmici = document.createElement("div");
            divIzmePassDugmici.className = "divIzmePassDugmici"
            divIzmeniPassGlavni.appendChild(divIzmePassDugmici);

            let buttonIzmPassPotvrdi = document.createElement("button");
            buttonIzmPassPotvrdi.className = "buttonIzmPassPotvrdi";
            buttonIzmPassPotvrdi.innerHTML = "Potvrdi"
            divIzmePassDugmici.appendChild(buttonIzmPassPotvrdi);

                buttonIzmPassPotvrdi.onclick=()=>{
                    /*let sifra1=host.querySelector(".inputStariPass").value;
                    if(sifra1!=""){
                        fetch("https://localhost:5001/Korisnik/ProveriSifru/"+sifra1+"/"+this.id,{
                            method:"GET",
                            headers: {
                                'Authorization' : 'Bearer ' + localStorage.getItem("token")
                            }
                        }).then(s=>{
                            if(s.ok){
                                host.querySelector(".inputStariPass").style.backgroundColor="#4bde16";
                                proveraSifra=true;   
                            }
                            else{
                                proveraSifra=false;
                                host.querySelector(".inputStariPass").style.backgroundColor="#d10f0f";
                            }
                        })
                    }
                    else{
                        host.querySelector(".inputStariPass").style.backgroundColor="#ffffff";
                        host.querySelector(".inputStariPass").placeholder="Unesite vasu trenutnu sifru";
                        proveraSifra=false;
                    }*/
                    if(proveraSifra == true && proveraPotvrdaPassword == true){
                        this.PotvrdaIzmPass(divIzmeniPassGlavni);
                    }
                    else if(proveraSifra == true && proveraPotvrdaPassword ==false){
                        host.querySelector(".inputNoviPass1").classList.add("error");
                        setTimeout(function() {
                        host.querySelector(".inputNoviPass1").classList.remove('error');
                        }, 300);

                        host.querySelector(".inputNoviPass2").classList.add("error");
                        setTimeout(function() {
                        host.querySelector(".inputNoviPass2").classList.remove('error');
                        }, 300);
                    }
                    else if(proveraPotvrdaPassword == true && proveraSifra ==false){
                        host.querySelector(".inputStariPass").classList.add("error");
                        setTimeout(function() {
                        host.querySelector(".inputStariPass").classList.remove('error');
                        }, 300);
                    }
                    else{
                        host.querySelector(".inputNoviPass1").classList.add("error");
                        setTimeout(function() {
                        host.querySelector(".inputNoviPass1").classList.remove('error');
                        }, 300);

                        host.querySelector(".inputNoviPass2").classList.add("error");
                        setTimeout(function() {
                        host.querySelector(".inputNoviPass2").classList.remove('error');
                        }, 300);

                        host.querySelector(".inputStariPass").classList.add("error");
                        setTimeout(function() {
                        host.querySelector(".inputStariPass").classList.remove('error');
                        }, 300);
                    }
                }

            let buttonIzmPassPonisti = document.createElement("button");
            buttonIzmPassPonisti.className = "buttonIzmPassPonisti";
            buttonIzmPassPonisti.innerHTML = "Ponisti"
            divIzmePassDugmici.appendChild(buttonIzmPassPonisti);

                buttonIzmPassPonisti.onclick=()=>{
                    this.BrisiFormuIzmene(divIzmeniPassGlavni);
                }

    }

    uplatiKrediteForma(divUplata){
        let dug = divUplata.parentNode.querySelector(".dugmeIsplati");
        dug.style.display = "none";


            let labUplatnica = document.createElement("label");
            labUplatnica.className = "labUplatnica";
            labUplatnica.innerHTML = "Slika uplatnice";
            divUplata.appendChild(labUplatnica);

            let slikaInput = document.createElement("input");
            slikaInput.type = "file";
            slikaInput.id = "image_input";
            slikaInput.accept = "image/jpg, image/png";
            divUplata.appendChild(slikaInput);

            let divSlika = document.createElement("div");
            divSlika.className = "divSlika"
            divUplata.appendChild(divSlika);
            var izabranaSlika = " ";

            slikaInput.addEventListener("change", function(){
                const Reader = new FileReader();
                Reader.addEventListener("load", () =>  {
                    izabranaSlika = Reader.result;
                    divSlika.style.backgroundImage = `url(${izabranaSlika})`;

                });
                Reader.readAsDataURL(this.files[0]);
            })

            /*let labelKolicina = document.createElement("label");
            labelKolicina.className = "labelKolicina";
            labelKolicina.innerHTML = "Unesite koliko kredita ste uplatili: ";
            divUplata.appendChild(labelKolicina);*/

            let inputKolicina = document.createElement("input");
            inputKolicina.type = "text";
            inputKolicina.className = "inputKolicina";
            inputKolicina.placeholder="Koliko kredita..."
            divUplata.appendChild(inputKolicina);

            let divDodKrediteDugmici = document.createElement("div");
            divDodKrediteDugmici.className = "divDodKrediteDugmici"
            divUplata.appendChild(divDodKrediteDugmici);

                let buttonDodKredPotvrdi = document.createElement("button");
                buttonDodKredPotvrdi.className = "buttonDodKredPotvrdi";
                buttonDodKredPotvrdi.innerHTML = "Potvrdi"
                divDodKrediteDugmici.appendChild(buttonDodKredPotvrdi);

                buttonDodKredPotvrdi.onclick=()=>{
                        this.PotvrdaUplKredite(divUplata);
                    }

                let buttonDodKredPonisti = document.createElement("button");
                buttonDodKredPonisti.className = "buttonDodKredPonisti";
                buttonDodKredPonisti.innerHTML = "Ponisti"
                divDodKrediteDugmici.appendChild(buttonDodKredPonisti);

                buttonDodKredPonisti.onclick=()=>{
                        dug.style.display = "inline";
                        divUplata.innerHTML = " ";
                    }
    }

    PotvrdaUplKredite(host){
        let kolicina = host.querySelector(".inputKolicina").value;

        let novaSlika = new FormData();
        let slikaInput = document.body.querySelector("#image_input")
        novaSlika.append("slika", slikaInput.files[0]);

        DodajZahtevKlijenta(this)
        .then(a => {
            this.crtajProfKlijenta(document.body.querySelector(".Prikaz"));
        });

        async function DodajZahtevKlijenta(thiss){
            let odgovor = await fetch("https://localhost:5001/Zahtev/DodajZahtevKlijenta/"+kolicina+"/"+vratiID(),{
                    method: 'POST',
                    headers: {
                        "Authorization" : "Bearer " + localStorage.getItem("token"),
                        "Accept" : "image/*"
                        // "Content-Type": "application/json"
                    },
                    body: novaSlika
                }).then(s=>{
                    if(s.ok){
                        s.json().then(data=>{
                            alert("Uspesno ste poslali zahtev za uplatu kredita.");
                        })
                    }
                })
        }
    }

    PotvrdaIzmEmaila(host){
        var m = host.querySelector(".inputIzmMail");
        fetch("https://localhost:5001/Korisnik/IzmeniEmail/"+vratiID()+"/"+m.value,{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                alert("Uspesno izmenjen email");
                this.BrisiFormuIzmene(host);
                this.email = m.value;
                this.crtajInformacije(document.body.querySelector(".divPrikazMenija"));
            }
        })
    }

    PotvrdaIzmDrzave(host){
        var m = host.querySelector(".inputIzmDrzavu");
        fetch("https://localhost:5001/Korisnik/IzmeniDrzavu/"+vratiID()+"/"+m.value,{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                alert("Uspesno izmenjena drzava");
                this.BrisiFormuIzmene(host);
                this.drzava = m.value;
                this.crtajInformacije(document.body.querySelector(".divPrikazMenija"));
            }
        })
    }

    PotvrdaIzmGrada(host){
        var m = host.querySelector(".inputIzmGrad");
        fetch("https://localhost:5001/Korisnik/IzmeniGrad/"+vratiID()+"/"+m.value,{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                alert("Uspesno izmenjen grad");
                this.BrisiFormuIzmene(host);
                this.grad = m.value;
                this.crtajInformacije(document.body.querySelector(".divPrikazMenija"));
            }
        })
    }

    PotvrdaIzmPass(host){
        var n1 = host.querySelector(".inputNoviPass1").value;
        var n2 = host.querySelector(".inputNoviPass2").value;
        if(n1 == n2){
            fetch("https://localhost:5001/Korisnik/IzmeniLozinku/"+vratiID()+"/"+n1,{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                alert("Uspesno izmenjena lozinka");
                this.BrisiFormuIzmene(host);
                this.password = n1;
                this.crtajInformacije(document.body.querySelector(".divPrikazMenija"));
            }
        })
        }
    }

    BrisiFormuIzmene(host){
        var parent = host.parentNode;
        parent.removeChild(host);

        let k = document.body.querySelector(".buttonEmail");
        k.style.display="inline";

        k = document.body.querySelector(".buttonDrzava");
        k.style.display="inline";

        k = document.body.querySelector(".buttonGrad");
        k.style.display="inline";

        k = document.body.querySelector(".buttonPass");
        k.style.display="inline";
    }
}