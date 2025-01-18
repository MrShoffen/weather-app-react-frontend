import {
    API_LOCATIONS_INFO
} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendDeleteSavedLocations = async (locationId) => {

    const response = await fetch(API_LOCATIONS_INFO + '/' + locationId, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include'
    });


    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

}