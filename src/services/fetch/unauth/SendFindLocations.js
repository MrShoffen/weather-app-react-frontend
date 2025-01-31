import {API_FIND_LOCATIONS_UNAUTH} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendFindLocations = async (locationName) => {

    const params = new URLSearchParams({name: locationName});

    const url = `${API_FIND_LOCATIONS_UNAUTH}?${params.toString()}`;

    const response = await fetch(url, {
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