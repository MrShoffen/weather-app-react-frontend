import {API_FIND_LOCATIONS_UNAUTH, API_IMAGES_UNAUTH, API_LOGIN, API_SAVED_LOCATIONS_WEATHER} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendGetLocationsAndWeather = async () => {




    const response = await fetch(API_SAVED_LOCATIONS_WEATHER, {
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