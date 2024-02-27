import { vratiFleg, vratiID, vratiUsername } from "./Autorizacija.js";


export function parseJwt (token) {

    if(token==null){
        return null;
    }

    try{
        var base64Url = token.split('.')[1];

        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    
        }).join(''));
    
    
    
        return JSON.parse(jsonPayload);
    }
    catch(error){
        return error;
    }



};