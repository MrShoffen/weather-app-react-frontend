import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import {useCallback, useRef} from "react";
import {CSSTransition} from "react-transition-group";
import '../TextField/CustomTextField.css'
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {sendRegistrationForm} from "../../services/SendRegistrationForm.js"

import CustomAnimatedTextField from '../TextField/CustomAnimatedTextField.jsx'

const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    // backgroundColor: theme.palette.secondary.main,
    alignSelf: 'center',
    width: '300px', // Фиксированная ширина для ПК
    maxWidth: '300px',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '400px', // Фиксированная ширина для ПК
        maxWidth: '400px',
    },
}));

export default function SignUpForm() {

    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');

    const validateUsername = (e) => {
        const value = e.target.value;

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
            setUsernameError(false);
            setUsernameErrorMessage('');
        } else {
            setUsernameError(true);
            setUsernameErrorMessage(errMessage);
        }
        setUsername(value);
    }


    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const validatePassword = (value) => {


        let isValid = true;
        let errMessage = '';

        if (value && value.length < 5) {
            errMessage = 'Password length must be greater than 5 characters.';
            isValid = false;
        }
        if (value && !/^[a-zA-Z0-9!@#$%^&*(),.?":{}|<>[\]\/`~+=-_'; ]*$/.test(value)) {
            errMessage += 'Only latin letters, numbers and special symbols are allowed.';
            isValid = false;
        }
        if (value && value.length > 20) {
            errMessage += 'Password length must be less than 20 characters.';
            isValid = false;
        }

        if (isValid) {
            setPasswordError(false);
            setPasswordErrorMessage('');
        } else {
            setPasswordError(true);
            setPasswordErrorMessage(errMessage);
        }
        setPassword(value);

        if (confirmPassword && confirmPassword.length > 0) {
            validatePasswordConfirm(confirmPassword);
        }
    }

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
    const validatePasswordConfirm = (value) => {
        const passwordEl = document.getElementById('password') as HTMLInputElement;
        let firstPassword = passwordEl.value;


        let isValid = true;
        let errMessage = '';

        if (value !== firstPassword) {
            errMessage = 'Passwords do not match!';
            isValid = false;
        }

        if (isValid) {
            setConfirmPasswordError(false);
            setConfirmPasswordErrorMessage('');
        } else {
            setConfirmPasswordError(true);
            setConfirmPasswordErrorMessage(errMessage);
        }
        setConfirmPassword(value);

    }


    const handleSubmit = async () => {
        if (usernameError || passwordError || confirmPasswordError) {
            return alert('Please fix the errors in the form');
        }

        const requestData = {
            username,
            password,
        };

        await sendRegistrationForm(requestData);
    };


    return (
        <Card variant="outlined">

            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
                Sign up
            </Typography>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >

                <CustomAnimatedTextField
                    id="username"
                    label="Username"
                    autoComplete="username"
                    placeholder="Latin letters and underline"
                    type="text"

                    value={username}
                    onChange={validateUsername}
                    error={usernameError}
                    helperText={usernameErrorMessage}
                />

                <CustomAnimatedTextField
                    animatePopupCondition={!usernameError && username.length > 0}

                    id="password"
                    label="Password"
                    autoComplete="current-password"
                    placeholder="Latin latters and numbers"
                    type="password"

                    value={password}
                    onChange={(e) => validatePassword(e.target.value)}
                    error={passwordError}
                    helperText={passwordErrorMessage}

                />


                <CustomAnimatedTextField
                    animatePopupCondition={!passwordError && !usernameError && username.length > 0 && password.length > 0}

                    id="password"
                    label="Confirm Password"
                    autoComplete="off"
                    placeholder="Latin latters and numbers"
                    type="password"

                    value={confirmPassword}
                    onChange={(e) => validatePasswordConfirm(e.target.value)}
                    error={confirmPasswordError}
                    helperText={confirmPasswordErrorMessage}
                />


                <CSSTransition
                    in={!passwordError && !usernameError && !confirmPasswordError && username.length > 0 && password.length > 0}
                    timeout={300}
                    classNames="fade"
                    unmountOnExit
                >
                    <div>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign up
                        </Button>
                    </div>
                </CSSTransition>

            </Box>
        </Card>
    )
}
