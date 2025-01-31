import UserNotFoundException from "./UserNotFoundException.jsx";
import IncorrectPasswordException from "./IncorrectPasswordException.jsx";
import UserAlreadyExistException from "./UserAlreadyExistException.jsx";
import SessionNotFoundException from "./SessionNotFoundException.jsx";
import WeatherApiException from "./WeatherApiException.jsx";
import LocationAlreadySavedException from "./LocationAlreadySavedException.jsx";


export const throwSpecifyException = (error) => {

    switch (error.title) {
        case 'UserNotFoundException':
            throw new UserNotFoundException(error.detail);
        case 'IncorrectPasswordException':
            throw new IncorrectPasswordException(error.detail);

        case 'UserAlreadyExistsException':
            throw new UserAlreadyExistException(error.detail);

        case 'SessionNotFoundException':
            throw new SessionNotFoundException(error.detail);

        case 'MissingServletRequestParameterException':
        case 'OpenWeatherApiException':
            throw new WeatherApiException(error.detail);

        case 'LocationAlreadySavedException':
            throw new LocationAlreadySavedException(error.detail);


        default:
            throw new Error('Unknown error');
    }

}