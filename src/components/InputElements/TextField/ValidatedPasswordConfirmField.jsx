import ValidatedTextField from "./ValidatedTextField.jsx";
import * as React from "react";
import {useEffect} from "react";


export default function ValidatedPasswordConfirmField({
                                                          confirmPassword, setConfirmPassword,
                                                          confirmPasswordError, setConfirmPasswordError,
                                                          originalPassword,
                                                          label="Confirm Password"
                                                      }) {

    const validatePasswordConfirm = (value) => {
        let isValid = true;
        let errMessage = '';

        if (value !== originalPassword) {
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

    useEffect(() => {
        validatePasswordConfirm(confirmPassword);
    }, [originalPassword]);

    return (
        <ValidatedTextField
            id="password_confirm"
            label={label}
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