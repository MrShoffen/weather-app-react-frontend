import {API_LOGOUT} from "../UrlConstants.jsx";
import {throwSpecifyException} from "../exception/ThrowSpecifyException.jsx";


export const sendLogout = async () => {

    console.log("Sending logout...");
    console.log("API_LOGOUT");
    const response = await fetch(API_LOGOUT, {
        method: 'POST',

        credentials: 'include'
    });


    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

}