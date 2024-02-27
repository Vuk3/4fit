import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";


export class ObjavaTrenera{
    constructor(idobjave, slika, opis, idtrenera)
    {   
        this.idobjave = idobjave;
        this.slika = slika;
        this.opis = opis;
        this.idtrenera = idtrenera;
    }

    crtajObjavu(host){
        let divObjave = document.createElement("div");
        divObjave.className = "divObjave"
        host.appendChild(divObjave);

            let slika = document.createElement("img");
            slika.src="data:image/*;base64,"+this.slika;
            slika.className = "objaveTrenera";
            divObjave.appendChild(slika);

            let opis = document.createElement("label");
            opis.className = "opisSlika";
            opis.innerHTML = this.opis;
            divObjave.appendChild(opis);

            if(this.idtrenera == vratiID() || vratiFleg() == "a"){
                let dugmeObrisi = document.createElement("button");
                dugmeObrisi.className = "dugmeObrisi";
                dugmeObrisi.innerHTML = "Obrisi";
                divObjave.appendChild(dugmeObrisi);

                dugmeObrisi.onclick=()=>{
                    this.brisiObjavuTrenera(divObjave);
                }
            }
    }

    brisiObjavuTrenera(host){
        if(vratiFleg()=='a'){
            fetch("https://localhost:5001/Admin/BrisiObjTreneraAdmin/"+this.idobjave,{
                method:"DELETE",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    host.style.display = "none";
                }
                else{
                    s.text().then(a=>{
                        alert(a);
                    })
                }
            })
        }
        else{
            fetch("https://localhost:5001/Objava/BrisiObjTrenera/"+this.idobjave+"/"+vratiID(),{
                method:"DELETE",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(s=>{
                if(s.ok){
                    host.style.display = "none";
                }
                else{
                    s.text().then(a=>{
                        alert(a);
                    })
                }
            })
        }
        
    }
}
