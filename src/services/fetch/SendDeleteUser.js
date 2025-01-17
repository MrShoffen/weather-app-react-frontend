import {API_LOGIN, API_REGISTRATION, API_USER} from "../../UrlConstants.jsx";
import {throwSpecifyException} from "../../exception/ThrowSpecifyException.jsx";


export const sendDeleteUser = async () =>{
    const response = await fetch(API_USER, {
        method: 'DELETE',
        credentials: 'include',
    });

console.log(response);

    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }


}