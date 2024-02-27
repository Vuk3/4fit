import { parseJwt } from "./ParseJWT.js";

export function vratiID () {
    if(localStorage.getItem("token")!=null)
        return parseJwt(localStorage.getItem("token"))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    else{
        return null;
    }
};

export function vratiFleg () {
    if(localStorage.getItem("token")!=null)
        return parseJwt(localStorage.getItem("token"))['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    else{
        return null;
    }
};

export function vratiUsername () {
    if(localStorage.getItem("token")!=null)
        return parseJwt(localStorage.getItem("token"))['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    else{
        return null;
    }
};

