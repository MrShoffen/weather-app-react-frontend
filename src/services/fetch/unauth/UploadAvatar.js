import {API_IMAGE_UPLOAD} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const uploadAvatar = async (formData) => {

    const response = await fetch(API_IMAGE_UPLOAD, {
        method: 'POST',

        body: formData
    });

    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }
    console.log(response);

    return await response.json();
}
