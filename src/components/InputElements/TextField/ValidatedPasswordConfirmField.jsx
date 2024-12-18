import ValidatedTextField from "./ValidatedTextField.jsx";
import * as React from "react";
import {useEffect} from "react";


export default function ValidatedPasswordConfirmField({confirmPassword, setConfirmPassword,
                                                      confirmPasswordError, setConfirmPasswordError,
                                                      originalPassword}) {

    const validatePasswordConfirm = (value) => {
        const passwordEl = document.getElementById('password');

        if (passwordEl) {
            let firstPassword = passwordEl.value;


            let isValid = true;
            let errMessage = '';

            if (value !== firstPassword) {
                errMessage = 'Passwords do not match!';
                isValid = false;
            }

            if (isValid) {
                setConfirmPasswordError('');
            } else {
                setConfirmPasswordError(errMessage);
            }
            setConfirmPassword(value);
        }
    }

    useEffect(() => {
        validatePasswordConfirm(confirmPassword);
    },[originalPassword]);

    return (
        <ValidatedTextField
            id="password_confirm"
            label="Confirm Password"
            autoComplete="off"
            placeholder="Latin latters and numbers"
            type="password_confirm"

            value={confirmPassword}
            onChange={(e) => validatePasswordConfirm(e.target.value)}
            error={confirmPasswordError}
            helperText={confirmPasswordError}
        />
    )
}