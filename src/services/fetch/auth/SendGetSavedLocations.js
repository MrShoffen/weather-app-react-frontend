import {
    API_FIND_LOCATIONS_UNAUTH,
    API_IMAGES_UNAUTH,
    API_LOCATIONS_INFO,
    API_LOGIN,
    API_SAVED_LOCATIONS_WEATHER
} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendGetSavedLocations = async () => {

    const response = await fetch(API_LOCATIONS_INFO, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });


    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

    return await response.json(response);
}