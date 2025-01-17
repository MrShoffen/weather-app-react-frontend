import {API_LOGIN, API_REGISTRATION, API_SAVE_LOCATION, API_USER} from "../../UrlConstants.jsx";
import {throwSpecifyException} from "../../exception/ThrowSpecifyException.jsx";


export const sendSaveLocation = async (location) =>{
    const response = await fetch(API_SAVE_LOCATION, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify(location),
    });

console.log(response);

    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

    return await response.json(response);
}