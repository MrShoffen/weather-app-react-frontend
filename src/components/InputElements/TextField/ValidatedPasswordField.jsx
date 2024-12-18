import ValidatedTextField from "./ValidatedTextField.jsx";
import * as React from "react";
import {useEffect} from "react";


export default function ValidatedPasswordField({password, setPassword,
                                               passwordError, setPasswordError,
                                               label='Password'}) {
    const validatePassword = (value) => {
        let isValid = true;
        let errMessage = '';

        if (value && value.length < 5) {
            errMessage = 'Password length must be greater than 5 characters.';
            isValid = false;
        }
        if (value && !/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>[\]/`~+=-_';]*$/.test(value)) {
            errMessage += 'Only latin letters, numbers and special symbols are allowed.';
            isValid = false;
        }
        if (value && value.length > 20) {
            errMessage += 'Password length must be less than 20 characters.';
            isValid = false;
        }

        if (isValid) {
            setPasswordError('');
        } else {
            setPasswordError(errMessage);
        }
        setPassword(value);
        localStorage.setItem('password', value);

    }

    useEffect(() => {
        validatePassword(password);
    },[password]);

    return (
        <ValidatedTextField
            id="password"
            label={label}
            autoComplete="current-password"
            placeholder="Latin latters and numbers"
            type="password"

            value={password}
            onChange={(e) => validatePassword(e.target.value)}
            error={passwordError}
            helperText={passwordError}

        />
    )
}