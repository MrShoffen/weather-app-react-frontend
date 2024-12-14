
class UserAlreadyExistException extends Error {
    constructor(message) {
        super(message);
    }
}
export default UserAlreadyExistException;