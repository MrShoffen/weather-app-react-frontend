import {API_FIND_LOCATIONS_UNAUTH, AUTOFILL_CITY_API} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";

export const getAutofilledCities = async (cityName) => {

    const params = new URLSearchParams({name: cityName});

    const url = `${AUTOFILL_CITY_API}?${params.toString()}`;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });


    if (!response.ok) {
        const error = await response.json();
        throwSpecifyException(error);
    }

    return await response.json(response);
}