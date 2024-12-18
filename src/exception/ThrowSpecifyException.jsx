import UserNotFoundException from "./UserNotFoundException.jsx";
import IncorrectPasswordException from "./IncorrectPasswordException.jsx";
import UserAlreadyExistException from "./UserAlreadyExistException.jsx";


export const throwSpecifyException = (error) => {

    switch (error.title) {
        case 'UserNotFoundException':
            throw new UserNotFoundException(error.detail);
        case 'IncorrectPasswordException':
            throw new IncorrectPasswordException(error.detail);

        case 'UserAlreadyExistsException':
            throw new UserAlreadyExistException(error.detail);


        default:
            throw new Error('Unknown error');
    }

}