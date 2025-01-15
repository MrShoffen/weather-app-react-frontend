import {API_LOGIN, API_USER} from "../UrlConstants.jsx";
import {throwSpecifyException} from "../exception/ThrowSpecifyException.jsx";
import UserUnauthorizedException from "../exception/UserUnauthorizedException.jsx";


export const checkSession = async () => {

    const response = await fetch(API_USER, {
        method: 'GET',
        credentials: 'include'
    });

    if (!response.ok) {
        const error = await response.json();
        console.log('here');
        throw new UserUnauthorizedException(error.detail);
    }

    return await response.json();
}