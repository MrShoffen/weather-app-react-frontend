import * as React from 'react';
import {useEffect} from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import '../InputElements/FadeAnimation.css'
import {sendRegistrationForm} from "../../services/SendRegistrationForm.js"

import CustomValidatedTextField from '../InputElements/TextField/CustomValidatedTextField.jsx'

import AnimatedElement from '../InputElements/AnimatedElement.jsx'
import {Link} from 'react-router-dom';

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

    const [username, setUsername] = React.useState(() => {
        // Изначально проверяем `localStorage` для значения темы
        const username = localStorage.getItem('username');
        return username || '';
    })
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');

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
            setUsernameError(false);
            setUsernameErrorMessage('');
        } else {
            setUsernameError(true);
            setUsernameErrorMessage(errMessage);
        }
        setUsername(value);
        localStorage.setItem('username', value);

    }


    const [password, setPassword] = React.useState(() => {
        // Изначально проверяем `localStorage` для значения темы
        const password = localStorage.getItem('password');
        return password || '';
    })
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
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
            setPasswordError(false);
            setPasswordErrorMessage('');
        } else {
            setPasswordError(true);
            setPasswordErrorMessage(errMessage);
        }
        setPassword(value);
        localStorage.setItem('password', value);

        if (confirmPassword && confirmPassword.length > 0) {
            validatePasswordConfirm(confirmPassword);
        }

    }

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
    const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
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
                setConfirmPasswordError(false);
                setConfirmPasswordErrorMessage('');
            } else {
                setConfirmPasswordError(true);
                setConfirmPasswordErrorMessage(errMessage);
            }
            setConfirmPassword(value);
        }
    }


    useEffect(() => {
        validateUsername(username)
        validatePassword(password)
        validatePasswordConfirm(confirmPassword)
    })

    const handleSubmit = async () => {
        if (usernameError || passwordError || confirmPasswordError) {
            return alert('Please fix the errors in the form');
        }

        const requestData = {
            username,
            password,
        };

        console.log(requestData);

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

                <CustomValidatedTextField
                    id="username"
                    label="Username"
                    autoComplete="username"
                    placeholder="Latin letters and underline"
                    type="text"

                    value={username}
                    onChange={(e) => validateUsername(e.target.value)}
                    error={usernameError}
                    helperText={usernameErrorMessage}
                />


                <AnimatedElement
                    condition={!usernameError && username.length > 0}>

                    <CustomValidatedTextField
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
                </AnimatedElement>

                <AnimatedElement
                    condition={!passwordError && !usernameError && username.length > 0 && password.length > 0}>

                    <CustomValidatedTextField
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
                </AnimatedElement>

                <AnimatedElement
                    condition={!passwordError && !usernameError && !confirmPasswordError && username.length > 0 && password.length > 0 && confirmPassword.length > 0}>

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
                </AnimatedElement>


                <Typography
                    variant="body2"
                    component="p"
                    sx={{textAlign: 'center', marginTop: 2}}
                >
                    Already have an account?{' '}
                    <Link to="/login" style={{color: '#1976d2'}}>
                        Sign in
                    </Link>
                </Typography>


            </Box>
        </Card>
    )
}
