import {API_LOGIN, API_REGISTRATION, API_USER} from "../../UrlConstants.jsx";
import {throwSpecifyException} from "../../exception/ThrowSpecifyException.jsx";


export const sendEdit = async (editData, type) =>{
    const response = await fetch(API_USER + type, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',

        body: JSON.stringify(editData),
    });

console.log(response);

    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

    return await response.json(response);
}