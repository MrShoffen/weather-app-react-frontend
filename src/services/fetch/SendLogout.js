import {API_LOGOUT} from "../UrlConstants.jsx";
import {throwSpecifyException} from "../exception/ThrowSpecifyException.jsx";


export const sendLogout = async () => {

    const response = await fetch(API_LOGOUT, {
        method: 'POST',

        credentials: 'include'
    });

    console.log('heere');


    if (!response.ok) {
        console.log('heere 22');

        const error = await response.json();
        throwSpecifyException(error);
    }

}