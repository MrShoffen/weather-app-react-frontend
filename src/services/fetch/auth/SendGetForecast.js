import {
    API_LOCATIONS_INFO
} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendGetForecast = async (locationId) => {

    const response = await fetch(API_LOCATIONS_INFO + '/' + locationId + '/forecast', {
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

    return await response.json();

}