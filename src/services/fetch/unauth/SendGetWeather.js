import {API_GET_WEATHER_INFO_UNAUTH} from "../../../UrlConstants.jsx";
import {throwSpecifyException} from "../../../exception/ThrowSpecifyException.jsx";


export const sendGetWeather = async (lat, lon) => {

    const params = new URLSearchParams({lat: lat, lon: lon});

    const url = `${API_GET_WEATHER_INFO_UNAUTH}?${params.toString()}`;

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