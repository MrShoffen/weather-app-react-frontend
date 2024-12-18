import ValidatedTextField from "./ValidatedTextField.jsx";
import * as React from "react";
import {useEffect} from "react";


export default function ValidatedUsernameTextField({username, setUsername,
                                                   usernameError, setUsernameError}) {

    const validateUsername = (value) => {
        let isValid = true;
        let errMessage = '';

        if (value && value.length < 5) {
            errMessage = 'Username length must be greater than 5 characters.';
            isValid = false;
        }
        if (value && !/^[a-zA-Z]+[a-zA-Z_]*[a-zA-Z]+$/.test(value)) {
            errMessage += 'Only letters and under line allowed.';
            isValid = false;
        }
        if (value && value.length > 20) {
            errMessage += 'Username length must be less than 20 characters.';
            isValid = false;
        }

        if (isValid) {
            setUsernameError('');
        } else {
            setUsernameError(errMessage);
        }
        setUsername(value);
    }

    useEffect(() => {
        validateUsername(username);
    }, [username])

    return (

        <ValidatedTextField
            id="username"
            label="Username"
            autoComplete="username"
            placeholder="Latin letters and underline"
            type="text"

            value={username}
            onChange={(e) => validateUsername(e.target.value)}
            error={usernameError}
            helperText={usernameError}
        />
    )
}