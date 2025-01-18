import {API_USER_INFO} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendDeleteUser = async () =>{
    const response = await fetch(API_USER_INFO, {
        method: 'DELETE',
        credentials: 'include',
    });

    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }


}