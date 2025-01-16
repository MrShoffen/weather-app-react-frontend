const isProduction = import.meta.env.MODE === "production"; // Определяем режим окружения


export const API_BASE_URL = isProduction ? "" : "http://192.168.0.190:8080";

export const API_CONTEXT = '/weather/api';


export const API_REGISTRATION = API_BASE_URL + API_CONTEXT + '/auth/registration';
export const API_LOGIN = API_BASE_URL + API_CONTEXT + '/auth/login';
export const API_LOGOUT = API_BASE_URL + API_CONTEXT + '/auth/logout';

export const API_IMAGES = API_BASE_URL + API_CONTEXT + '/images';

export const API_USER = API_BASE_URL + API_CONTEXT + '/user';

export const API_FIND_LOCATIONS = API_BASE_URL + API_CONTEXT + '/locations';

export const API_GET_WEATHER_INFO = API_BASE_URL + API_CONTEXT + '/weather';

export const API_SAVE_LOCATION = API_USER + '/locations';
export const API_SAVED_LOCATIONS_WEATHER = API_SAVE_LOCATION + '/weather';

//autofill cities api
export const AUTOFILL_CITY_API = isProduction ? "/cities-autofill-api" : "http://192.168.0.190:8081/cities-autofill-api";
