import {API_LOGIN} from "../UrlConstants.jsx";
import UserNotFoundException from "../exception/UserNotFoundException.jsx";
import {throwSpecifyException} from "../exception/ThrowSpecifyException.jsx";


export const sendLoginForm = async (registrationData) => {

    const response = await fetch(API_LOGIN, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify(registrationData),
    });


    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

    console.log(response.headers);

}