import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";






fetch("https://localhost:5001/Auth/Provera",{
                method:"GET",
                headers: {
                    'Authorization' : 'Bearer ' + localStorage.getItem("token")
                }
            }).then(p=>{
                if(p.ok){
                    if(localStorage.getItem("token")!=null){
                        if(vratiFleg()=='a'){
                            window.location.href = "./admin";
                        }
                        if(vratiFleg()=='k' || vratiFleg()=='t'){
                            window.location.href = "./prijavljen";
                        }
                    }                                       
                }
                else{
                    localStorage.clear();
                }
            })

