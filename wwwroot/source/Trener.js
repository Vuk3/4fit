import { Paket } from "./Paket.js";
import { ObjavaTrenera } from "./ObjavaTrenera.js";
import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";

export class Trener{

    constructor(id, ime, prezime, email, username, grad, drzava, fleg, pol, datumRodjenja, Biografija, krediti, Objave, Paketi){
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
        this.Biografija = Biografija;
        this.Objave = Objave;
        this.Paketi = Paketi;
        this.krediti=krediti;

    }
    crtajProfTrenera(host){
        host.innerHTML="";

        host.parentNode.parentNode.querySelector(".aPocetna").classList.remove("selected");
        host.parentNode.parentNode.querySelector(".aForum").classList.remove("selected");
        if(vratiFleg()=='k' || vratiFleg()=='t'){
            host.parentNode.parentNode.querySelector(".aChat").classList.remove("selected");
            host.parentNode.parentNode.querySelector(".aPretplate").classList.remove("selected");
            host.parentNode.parentNode.querySelector(".aONama").classList.remove("selected");
        }
        
        let celaProfTreneraDiv = document.createElement("div");
        celaProfTreneraDiv.className="celoProfTrenera";
        host.appendChild(celaProfTreneraDiv);

        let infoDiv = document.createElement("div");
        infoDiv.className = "informacijeTreenra";
        celaProfTreneraDiv.appendChild(infoDiv);

        let usernameCreditDiv = document.createElement("div");
        usernameCreditDiv.className = "usernameCreditDiv";
        infoDiv.appendChild(usernameCreditDiv);



        let divUsername = document.createElement("div");
        divUsername.className = "divUsername";
        usernameCreditDiv.appendChild(divUsername);

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
            divImeiPre.appendChild(labPrezime);*/  


        if(vratiID()==this.id){
            let divKrediti = document.createElement("div");
            divKrediti.className = "divKrediti";
            usernameCreditDiv.appendChild(divKrediti);

                let labKrediti = document.createElement("label");
                labKrediti.innerHTML = "Krediti: "+ this.krediti;
                labKrediti.className = "labKrediti";
                divKrediti.appendChild(labKrediti);

                let dugmeIsplati = document.createElement("button");
                dugmeIsplati.className = "dugmeIsplati";
                dugmeIsplati.innerHTML = "Isplati kredite";
                divKrediti.appendChild(dugmeIsplati);


                let divIsplata = document.createElement("div");
                divIsplata.className = "divIsplata";
                infoDiv.appendChild(divIsplata);


                dugmeIsplati.onclick=()=>{
                    this.isplatiKrediteForma(divIsplata);                
                }

        }

        let divBiografija = document.createElement("div");
        divBiografija.className = "divBiografija";
        infoDiv.appendChild(divBiografija);

            let lblBio = document.createElement("label");
            lblBio.className="lblBio";
            lblBio.innerHTML="Biografija:";
            divBiografija.appendChild(lblBio);

        let divBiografija1 = document.createElement("div");
        divBiografija1.className = "divBiografija1";
        divBiografija.appendChild(divBiografija1);

            let labelBio = document.createElement("text");
            labelBio.innerHTML = this.Biografija;
            labelBio.className = "labelBio";
            divBiografija1.appendChild(labelBio);

            if(this.id == vratiID()){
                let buttonBio = document.createElement("button");
                buttonBio.innerHTML = "Izmeni"
                buttonBio.className = "buttonBio";
                divBiografija.appendChild(buttonBio);

                buttonBio.onclick=()=>{
                    this.crtajIzmeniBiografije(divBiografija);
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
                                    if(inputBan.value!=""){
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
                                                console.log(p);
                                            })
                                            }
                                        })
                                    }
                                    else{
                                        alert("Unesite razlog bana");
                                    }

                                        }
                                    }
                                }
                            })
                }

        let divMeni = document.createElement("div");
        divMeni.className = "divMeni";
        celaProfTreneraDiv.appendChild(divMeni);

            let labelaObjave = document.createElement("label");
            labelaObjave.innerHTML = "Objave";
            labelaObjave.className = "labelaObjave";
            labelaObjave.style.background = "rgba(1, 11, 51, 0.69)";
            labelaObjave.style.borderRadius = "15px";
            labelaObjave.style.padding = "0.3% 0.3% 0.3% 0.3%";
            divMeni.appendChild(labelaObjave);

            let labelaPaketi = document.createElement("label");
            labelaPaketi.innerHTML = "Paketi";
            labelaPaketi.className = "labelaPaketi";
            labelaPaketi.style.background = "rgba(1, 11, 51, 0)";
            labelaPaketi.style.borderRadius = "15px";
            labelaPaketi.style.padding = "0.3% 0.3% 0.3% 0.3%";
            divMeni.appendChild(labelaPaketi);

            let labelaInfo = document.createElement("label");
            labelaInfo.innerHTML = "Informacije";
            labelaInfo.className = "labelaInfo";
            labelaInfo.style.background = "rgba(1, 11, 51, 0)";
            labelaInfo.style.borderRadius = "15px";
            labelaInfo.style.padding = "0.3% 0.3% 0.3% 0.3%";
            divMeni.appendChild(labelaInfo);

            labelaObjave.onclick =()=>{
                this.crtajObjave(divPrikazMenija);
            }

            labelaPaketi.onclick =()=>{
                this.crtajPakete(divPrikazMenija);
            }

            labelaInfo.onclick =()=>{
                this.crtajInformacije(divPrikazMenija);
            }
        let divPrikazMenija = document.createElement("div");
        divPrikazMenija.className = "divPrikazMenija";
        celaProfTreneraDiv.appendChild(divPrikazMenija);

        this.crtajObjave(divPrikazMenija);

        
    }

    crtajObjave(host){
        host.innerHTML="";
        let pom = host.parentNode.querySelector(".divMeni");
        pom.querySelector(".labelaObjave").style.background = "rgba(1, 11, 51, 0.69)";
        pom.querySelector(".labelaPaketi").style.background = "rgba(1, 11, 51, 0";
        pom.querySelector(".labelaInfo").style.background = "rgba(1, 11, 51, 0)";
        pom.querySelector(".labelaObjave").style.color = "rgb(245, 222, 179)";
        pom.querySelector(".labelaPaketi").style.color = "rgb(0,0,0)";
        pom.querySelector(".labelaInfo").style.color = "rgb(0,0,0)";
        fetch("https://localhost:5001/Trener/VratiObjave/"+this.id,{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        let divCrtajObjave = document.createElement("div");
                        divCrtajObjave.className = "divCrtajObjave";
                        host.appendChild(divCrtajObjave);
                        if(data.length == 0){
                            let nemaObjavaLbl = document.createElement("label");
                            nemaObjavaLbl.className = "nemaPaketeLbl";
                            nemaObjavaLbl.innerHTML = "Korisnik jos uvek nema nijednu objavu!";
                            divCrtajObjave.appendChild(nemaObjavaLbl);
                        }
                        data.forEach((d,index)=>{
                            let obj = new ObjavaTrenera(d.id, d.slika, d.opis, d.trener)
                            obj.crtajObjavu(divCrtajObjave);

                        })
                        

                    })
                }
                else{
                    s.text().then(p=>{
                        console.log(p);
                    })
                }
            })

        if(this.id == vratiID()){
            // host.innerHTML = " ";


            let divDodajObjavu = document.createElement("div");
            divDodajObjavu.className = "divDodajObjavu";
            host.appendChild(divDodajObjavu);


            let b = document.createElement("button");
            b.innerHTML = "Dodaj objavu";            
            b.className = "DugmeDodObj"
            divDodajObjavu.appendChild(b);

            b.onclick=()=>{
                this.crtajFromuZaObjavu(divDodajObjavu);
                
            }
    }

        //DODATI F-JU ZA VRACANJE OBJAVA I ISCRTAVANJE???????????
    }

    crtajFromuZaObjavu(host){
        let divBris = document.querySelector(".divCrtajObjave");
        divBris.innerHTML = " ";
        let m = document.body.querySelector(".DugmeDodObj");
        m.hidden = true;

        let labUnesiSliku = document.createElement("label");
        labUnesiSliku.className = "labUnesiSliku";
        labUnesiSliku.innerHTML = "Unesite sliku";
        host.appendChild(labUnesiSliku);

        let slikaInput = document.createElement("input");
        slikaInput.type = "file";
        slikaInput.id = "image_input";
        slikaInput.accept = "image/jpg, image/png";
        host.appendChild(slikaInput);

        let divSlika = document.createElement("div");
        divSlika.className = "divSlika"
        host.appendChild(divSlika);
        var izabranaSlika = " ";

        slikaInput.addEventListener("change", function(){
            const Reader = new FileReader();
            Reader.addEventListener("load", () =>  {
                izabranaSlika = Reader.result;
                divSlika.style.backgroundImage = `url(${izabranaSlika})`;

            });
            Reader.readAsDataURL(this.files[0]);
        })

        let opisSlike = document.createElement("input");
        opisSlike.className="opisSlikeDodavanje";
        opisSlike.placeholder="Opis...";
        host.appendChild(opisSlike);

        let dodajObjavuBtnDiv = document.createElement("div");
        dodajObjavuBtnDiv.className = "dodajObjavuBtnDiv";
        host.appendChild(dodajObjavuBtnDiv);



        let dugmePotvrdi = document.createElement("button");
        dugmePotvrdi.innerHTML = "Dodaj";
        dugmePotvrdi.className = "dugmePotvrdi";
        dodajObjavuBtnDiv.appendChild(dugmePotvrdi);

        let dugmeOtkazi = document.createElement("button");
        dugmeOtkazi.className = "dugmeOtkazi";
        dugmeOtkazi.innerHTML = "Otkazi";
        dodajObjavuBtnDiv.appendChild(dugmeOtkazi);

        dugmeOtkazi.onclick=()=>{
            this.crtajObjave(document.querySelector(".divPrikazMenija"));
        }


        dugmePotvrdi.onclick=()=>{

            let novaSlika = new FormData();
            novaSlika.append("slika", slikaInput.files[0]);

            
            let opis1 = opisSlike.value;

            FetchIzmeniSlikuProfila(this)
            .then(a => {
                this.crtajObjave(document.querySelector(".divPrikazMenija"));
            });


            

            async function FetchIzmeniSlikuProfila(thiss) {
                
                let odgovor = await fetch("https://localhost:5001/Trener/DodajObjavu/"+opis1+"/"+vratiID(),{
                    method: 'POST',
                    headers: {
                        "Authorization" : "Bearer " + localStorage.getItem("token"),
                        "Accept" : "image/*"
                        // "Content-Type": "application/json"
                    },
                    body: novaSlika
                }).catch(reason => {return false});

            }
            
            
            // let url = `url(${izabranaSlika}`;
            // console.log(url);
            // let id = localStorage.getItem("id");
            // fetch("https://localhost:5001/Trener/DodajSliku/"+id+"/"+url,{
            //             method:"POST",
            //                headers: {
            //                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
            //                }
            //         }).then(s=>{
            //             if(s.ok){
            //                 s.json().then(data=>{
            //                     alert(data);
            //                 })
                            
            //             }
            //             else{
            //                 // proveraSifra=false;
            //                 // host.querySelector(".inputStariPass").style.backgroundColor="#d10f0f";
            //             }
            //         })
            // let a ="../Slike/4fit.jpg";
            // fetch("https://localhost:5001/Trener/DodajSlikuBody/"+id,{
            //     method:"POST",
            //     headers:{
            //         "Content-Type" : "application/json",
            //         'Authorization' : 'Bearer ' + localStorage.getItem("token")
            //     },
            //     body:JSON.stringify(url)
            // }).then(s=>{
            //     if(s.ok){
            //         s.json().then(data=>{
            //             // alert(data);
                       
            //             console.log( host.querySelectorAll(".slika"));
            //             data.forEach((d,index)=>{
                            
            //                 alert(index);
            //                 let pom = document.createElement("div");
            //                 pom.className="slika"+index;
            //                 pom.style.backgroundImage=d.url;
            //                 host.appendChild(pom);
                            
            //             })
                        

            //         })
            //     }
            //     else{
            //         s.text().then(p=>{
            //             console.log(p);
            //         })
            //     }
            // })

        }
    }

    crtajPakete(host){
        host.innerHTML = " ";
        let pom = host.parentNode.querySelector(".divMeni");
        pom.querySelector(".labelaObjave").style.background = "rgba(1, 11, 51, 0)";
        pom.querySelector(".labelaPaketi").style.background = "rgba(1, 11, 51, 0.69)";
        pom.querySelector(".labelaInfo").style.background = "rgba(1, 11, 51, 0)";
        pom.querySelector(".labelaPaketi").style.color = "rgb(245, 222, 179)";
        pom.querySelector(".labelaObjave").style.color = "rgb(0,0,0)";
        pom.querySelector(".labelaInfo").style.color = "rgb(0,0,0)";
        fetch("https://localhost:5001/Paket/VratiPakete/"+this.id,{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    s.json().then(data=>{
                        let divPaketi = document.createElement("div");
                        divPaketi.className = "divPaketi";
                        host.appendChild(divPaketi);
                        
                        if(data.length == 0){
                            let nemaPaketaLbl = document.createElement("label");
                            nemaPaketaLbl.className = "nemaPaketeLbl";
                            nemaPaketaLbl.innerHTML = "Korisnik jos uvek nema nijedan paket u ponudi!";
                            divPaketi.appendChild(nemaPaketaLbl);
                        }
                        data.forEach((d,index)=>{
                            var p = new Paket (d.id, d.naziv, d.opis, d.cena, d.trajanje, 
                                d.idTrenera);
                            p.crtajMojePakete(divPaketi);
                        })
                        

                    })
                }
                else{
                    s.text().then(p=>{
                        console.log(p);
                    })
                }
            })
        
        if(this.id == vratiID()){
            let divDodajPaket = document.createElement("div");
            divDodajPaket.className = "divDodajPaket";
            host.appendChild(divDodajPaket);

            let buttonDodPaket = document.createElement("button");
            buttonDodPaket.className = "buttonDodPaket"
            buttonDodPaket.innerHTML = "Dodaj paket";
            divDodajPaket.appendChild(buttonDodPaket);

            buttonDodPaket.onclick = () => {
                this.crtajDodPaket(divDodajPaket);
            }
    }


    }   

    crtajInformacije(host){
        host.innerHTML = " ";

        let pom = host.parentNode.querySelector(".divMeni");
        pom.querySelector(".labelaObjave").style.background = "rgba(1, 11, 51, 0)";
        pom.querySelector(".labelaPaketi").style.background = "rgba(1, 11, 51, 0)";
        pom.querySelector(".labelaInfo").style.background = "rgba(1, 11, 51, 0.69)";
        pom.querySelector(".labelaInfo").style.color = "rgb(245, 222, 179)";
        pom.querySelector(".labelaPaketi").style.color = "rgb(0,0,0)";
        pom.querySelector(".labelaObjave").style.color = "rgb(0,0,0)";


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



        /*let divKorIme = document.createElement("div");
        divKorIme.className = "divKorIme";
        divInfo.appendChild(divKorIme);

            let labelaKorIme = document.createElement("label");
            labelaKorIme.innerHTML = "Korisnicko ime : " + this.username;
            labelaKorIme.className = "labelaKorIme";
            divKorIme.appendChild(labelaKorIme);*/

        

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
            labelaDatum.innerHTML = "Datum rodjenja : " + ppom2[0] + "/" + ppom[1] + "/" + ppom[0];
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


                    if(proveraPotvrdaPassword == true){
                        this.PotvrdaIzmPass(divIzmeniPassGlavni);
                    }
                    else if(proveraPotvrdaPassword ==false){
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

    crtajIzmeniBiografije(host){
        var dugme = host.querySelector(".buttonBio");
        var lab = host.querySelector(".labelBio");

        let pom = host.querySelector(".divBiografija1");
        pom.style.border = "0px";
        pom.style.background="rgb(249, 246, 240, 0)";

        dugme.style.display = "none";
        lab.style.display = "none";

        let divIzmeniBioGlavni = document.createElement("div");
        divIzmeniBioGlavni.className = "divIzmeniBioGlavni";
        host.appendChild(divIzmeniBioGlavni);

        let inputNoviBio = document.createElement("textarea");
        inputNoviBio.value = lab.innerHTML;
        inputNoviBio.className = "inputNoviBio";
        divIzmeniBioGlavni.appendChild(inputNoviBio);

        let divIzmeBioDugmici = document.createElement("div");
        divIzmeBioDugmici.className = "divIzmeBioDugmici"
        divIzmeniBioGlavni.appendChild(divIzmeBioDugmici);

            let buttonIzmBioPotvrdi = document.createElement("button");
            buttonIzmBioPotvrdi.className = "buttonIzmGradPotvrdi";
            buttonIzmBioPotvrdi.innerHTML = "Potvrdi"
            divIzmeBioDugmici.appendChild(buttonIzmBioPotvrdi);

            buttonIzmBioPotvrdi.onclick=()=>{
                    host.querySelector(".divBiografija1").style.border="2px solid #344899c9";
                    host.querySelector(".divBiografija1").style.background="rgb(249, 246, 240, 0.5)";
                    this.PotvrdaIzmBio(divIzmeniBioGlavni);
                }

            let buttonIzmBioPonisti = document.createElement("button");
            buttonIzmBioPonisti.className = "buttonIzmBioPonisti";
            buttonIzmBioPonisti.innerHTML = "Ponisti"
            divIzmeBioDugmici.appendChild(buttonIzmBioPonisti);

            buttonIzmBioPonisti.onclick=()=>{
                    host.querySelector(".divBiografija1").style.border="2px solid #344899c9";
                    host.querySelector(".divBiografija1").style.background="rgb(249, 246, 240, 0.5)";
                    dugme.style.display = "inline";
                    lab.style.display = "inline";
                    this.BrisiFormuIzmeneBio(divIzmeniBioGlavni);
                }



    }

    crtajDodPaket(host){
        // host.innerHTML = " ";

        let divBris = document.querySelector(".divPaketi");
        divBris.innerHTML = " ";
        let m = document.body.querySelector(".buttonDodPaket");
        m.hidden = true;

        let divNaziv = document.createElement("div");
        divNaziv.className = "divNaziv";
        host.appendChild(divNaziv);

            /*let labNaziv = document.createElement("label");
            labNaziv.className = "labNaziv";
            labNaziv.innerHTML = "Unesite naziv paketa";
            divNaziv.appendChild(labNaziv);*/

            let inputNaziv = document.createElement("input");
            inputNaziv.className = "inputNaziv";
            inputNaziv.type = "text";
            inputNaziv.placeholder="Naziv";
            divNaziv.appendChild(inputNaziv);

        let divOpisDod = document.createElement("div");
        divOpisDod.className = "divOpisDod";
        host.appendChild(divOpisDod);

            /*let labOpis = document.createElement("label");
            labOpis.className = "labOpis";
            labOpis.innerHTML = "Unesite opis paketa";
            divOpisDod.appendChild(labOpis);*/

            let inputOpis = document.createElement("input");
            inputOpis.className = "inputOpis";
            inputOpis.type = "text";
            inputOpis.placeholder = "Opis"
            divOpisDod.appendChild(inputOpis);

        let divTrajanje = document.createElement("div");
        divTrajanje.className = "divTrajanje";
        host.appendChild(divTrajanje);

            let labTrajanje = document.createElement("label");
            labTrajanje.className = "labTrajanje";
            labTrajanje.innerHTML = "Duzina paketa:";
            divTrajanje.appendChild(labTrajanje);

            let selectTrajanje = document.createElement("select");
            selectTrajanje.className = "selectTrajanje";
            divTrajanje.appendChild(selectTrajanje);

                let option = document.createElement("option");
                option.value = 1;
                option.text = "1 mesec";
                selectTrajanje.appendChild(option);

                option = document.createElement("option");
                option.value = 3;
                option.text = "3 meseca";
                selectTrajanje.appendChild(option);

                option = document.createElement("option");
                option.value = 6;
                option.text = "6 meseci";
                selectTrajanje.appendChild(option);

                option = document.createElement("option");
                option.value = 12;
                option.text = "12 meseci";
                selectTrajanje.appendChild(option);

        let divCena = document.createElement("div");
        divCena.className = "divCena";
        host.appendChild(divCena);

            /*let labCena = document.createElement("label");
            labCena.className = "labCena";
            labCena.innerHTML = "Unesite cenu paketa";
            divCena.appendChild(labCena);*/

            let inputCena = document.createElement("input");
            inputCena.className = "inputCena";
            inputCena.type = "text";
            inputCena.placeholder = "Cena";
            divCena.appendChild(inputCena);

        let dodajPaketBtnDiv = document.createElement("div");
        dodajPaketBtnDiv.className="dodajPaketBtnDiv";
        host.appendChild(dodajPaketBtnDiv);

        let buttonDodPaketPotvrdi = document.createElement("button");
        buttonDodPaketPotvrdi.className = "buttonDodPaketPotvrdi";
        buttonDodPaketPotvrdi.innerHTML = "Potvrdi";
        dodajPaketBtnDiv.appendChild(buttonDodPaketPotvrdi);

        let buttonDodPaketOtkazi = document.createElement("button");
        buttonDodPaketOtkazi.className = "buttonDodPaketOtkazi";
        buttonDodPaketOtkazi.innerHTML = "Ponisti";
        dodajPaketBtnDiv.appendChild(buttonDodPaketOtkazi);

        buttonDodPaketPotvrdi.onclick = () =>{
            this.PotvrdaDodPaket(host);
        }

        buttonDodPaketOtkazi.onclick = () =>{
            this.crtajPakete(host.parentNode);
        }
    }

    isplatiKrediteForma(divIsplata){

        let dug = divIsplata.parentNode.querySelector(".dugmeIsplati");
        dug.style.display = "none";

        let dug2 = document.body.querySelector(".buttonBio");
        dug2.style.display = "none";


            let labelRacun = document.createElement("label");
            labelRacun.className = "labelRacun";
            labelRacun.innerHTML = "Unesite broj racuna: ";
            divIsplata.appendChild(labelRacun);

            let inputRacun = document.createElement("input");
            inputRacun.className = "inputRacun"
            inputRacun.type = "text";
            divIsplata.appendChild(inputRacun);

            let labelKolicina = document.createElement("label");
            labelKolicina.className = "labelKolicina";
            labelKolicina.innerHTML = "Unesite koliko kredita zelite da isplatite: ";
            divIsplata.appendChild(labelKolicina);

            let inputKolicina = document.createElement("input");
            inputKolicina.type = "text";
            inputKolicina.className = "inputKolicina";
            divIsplata.appendChild(inputKolicina);

            let divDodKrediteDugmici = document.createElement("div");
            divDodKrediteDugmici.className = "divDodKrediteDugmici"
            divIsplata.appendChild(divDodKrediteDugmici);

                let buttonDodKredPotvrdi = document.createElement("button");
                buttonDodKredPotvrdi.className = "buttonDodKredPotvrdi";
                buttonDodKredPotvrdi.innerHTML = "Potvrdi"
                divDodKrediteDugmici.appendChild(buttonDodKredPotvrdi);

                buttonDodKredPotvrdi.onclick=()=>{
                        this.PotvrdaIspKredite(divIsplata);
                    }

                let buttonDodKredPonisti = document.createElement("button");
                buttonDodKredPonisti.className = "buttonDodKredPonisti";
                buttonDodKredPonisti.innerHTML = "Ponisti"
                divDodKrediteDugmici.appendChild(buttonDodKredPonisti);

                buttonDodKredPonisti.onclick=()=>{
                        dug.style.display = "inline";
                        dug2.style.display = "inline";
                        divIsplata.innerHTML = " ";
                    }
    }

    PotvrdaIspKredite(host){
        let kolicina = host.querySelector(".inputKolicina").value;
        let brRacuna = host.querySelector(".inputRacun").value;
        

        fetch("https://localhost:5001/Zahtev/ZahtevTrenera/"+kolicina+"/"+brRacuna+"/"+vratiID(),{
            method:"POST",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                    this.krediti-=kolicina;
                    this.crtajProfTrenera(document.body.querySelector(".Prikaz"));
                })   
            }
            else{
                s.text().then(p=>{
                    alert(p);
                })
            }
        })
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
            fetch("https://localhost:5001/Auth/IzmeniLozinku/"+vratiID()+"/"+n1,{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                alert("Uspesno izmenjena lozinka");
                this.BrisiFormuIzmene(host);
                // this.password = n1;
                this.crtajInformacije(document.body.querySelector(".divPrikazMenija"));
            }
            else{
                s.text().then(a =>{
                    console.log(a);
                })
            }
        })
        }
    }

    PotvrdaIzmBio(host){
        var n1 = document.body.querySelector(".inputNoviBio").value;
            fetch("https://localhost:5001/Trener/IzmeniBiografiju/"+vratiID()+"/"+n1,{
            method:"PUT",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                //alert("Uspesno izmenjena biografija");
                this.BrisiFormuIzmeneBio(host);
                var dugme = document.body.querySelector(".buttonBio");
                var lab = document.body.querySelector(".labelBio");
                dugme.style.display = "inline";
                lab.style.display = "inline";
                lab.innerHTML = n1;
                this.Biografija = n1;
                this.crtajProfTrenera(document.body.querySelector(".Prikaz"));
            }
        })
    }

    PotvrdaDodPaket(host){
        let n = host.querySelector(".inputNaziv").value;

        let op = host.querySelector(".inputOpis").value;

        let tr = host.querySelector(".selectTrajanje");
        let value = tr.options[tr.selectedIndex].value;

        let cena = host.querySelector(".inputCena").value;


        fetch("https://localhost:5001/Paket/DodajPaket/"+vratiID()+
        "/"+n+"/"+op+"/"+value+"/"+cena,{
            method:"POST",
            headers: {
                'Authorization' : 'Bearer ' + localStorage.getItem("token")
            }
        }).then(s=>{
            if(s.ok){
                s.json().then(data=>{
                    this.crtajPakete(host.parentNode);
                    

                })
            }
            else{
                s.text().then(p=>{
                    console.log(p);
                })
            }
        })
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

    BrisiFormuIzmeneBio(host){
        var parent = host.parentNode;
        parent.removeChild(host);
    }
}