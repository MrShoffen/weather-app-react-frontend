import {API_IMAGES, API_LOGIN} from "../../UrlConstants.jsx";
import {throwSpecifyException} from "../../exception/ThrowSpecifyException.jsx";


export const uploadAvatar = async (formData) => {

    const response = await fetch(API_IMAGES, {
        method: 'POST',

        credentials: 'include',

        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

    return await response.json();
}
