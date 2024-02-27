import { vratiFleg } from "./Autorizacija.js";

export class Pretplata{
    constructor(id, datumOd, datumDo, username, paketNaziv, idKorisnika){
        this.id=id;
        this.datumOd=datumOd;
        this.datumDo=datumDo;
        this.username=username;
        this.paketNaziv=paketNaziv;
        this.idKorisnika=idKorisnika;
    }


    crtajPretplatu(host){
        
        let divPretplata = document.createElement("div");
        divPretplata.className = "divPretplata";
        host.appendChild(divPretplata);

            let divLevo = document.createElement("div")
            divLevo.className = "divLevoPretplata";
            divPretplata.appendChild(divLevo);

                let labPaket = document.createElement("label");
                labPaket.className = "labPaketPretplata";
                labPaket.innerHTML = "Naziv paketa: " +this.paketNaziv;
                divLevo.appendChild(labPaket);

                let labUn = document.createElement("label");
                labUn.className = "labUn";
                if(vratiFleg() == "k")
                    labUn.innerHTML = "Username trenera: "+this.username;
                else if(vratiFleg() == "t")
                    labUn.innerHTML = "Username klijenta: " +this.username;
                divLevo.appendChild(labUn);

            let divDesno = document.createElement("div");
            divDesno.className = "divDesnoPretplata";
            divPretplata.appendChild(divDesno);

                let labTrajeDo = document.createElement("label");
                labTrajeDo.className = "labTrajeDo";
                labTrajeDo.innerHTML = "Pretplata traje do: " +this.datumDo;
                divDesno.appendChild(labTrajeDo);

            
    }
}