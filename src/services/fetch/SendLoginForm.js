import {API_LOGIN} from "../../UrlConstants.jsx";
import {throwSpecifyException} from "../../exception/ThrowSpecifyException.jsx";


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

    return await response.json(response);
}