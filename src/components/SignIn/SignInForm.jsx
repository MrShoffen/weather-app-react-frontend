import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import '../InputElements/FadeAnimation.css'
import {Link} from 'react-router-dom';
import {sendLoginForm} from "../../services/SendLoginForm.js"

import CustomValidatedTextField from '../InputElements/TextField/CustomValidatedTextField.jsx'

import AnimatedElement from '../InputElements/AnimatedElement.jsx'
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import UserNotFoundException from "../../exception/UserNotFoundException.jsx";
import IncorrectPasswordException from "../../exception/IncorrectPasswordException.jsx";
import PrevPageInfoBadge from "../PreviusPageInformationBadge/PrevPageInfoBadge.jsx";

const MINIMUM_PASSWORD_LENGTH = 5;


const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '300px',
    maxWidth: '300px',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '400px',
        maxWidth: '400px',
    },
}));

export default function SignInForm() {
    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState(false);
    const [usernameErrorMessage, setUsernameErrorMessage] = React.useState('');

    const {login, auth} = useAuth();

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

        if (value && value.length < MINIMUM_PASSWORD_LENGTH) {
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
    }


    const handleSubmit = async () => {
        if (usernameError || passwordError) {
            return alert('Please fix the errors in the form');
        }

        const requestData = {
            username,
            password,
        };

        try {
            const profile = await sendLoginForm(requestData);
            login(profile);
        } catch (error) {
            switch (true) {
                case error instanceof UserNotFoundException:
                    setUsernameError(true);
                    setUsernameErrorMessage(error.message);
                    break;
                case error instanceof IncorrectPasswordException:
                    setPasswordError(true);
                    setPasswordErrorMessage(error.message);
                    break;

                default:
                    alert('Unknown error occurred! ');
                    window.location.reload();
            }
        }
    };


    return (
        <Card variant="outlined">

            <PrevPageInfoBadge/>

            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
                Sign in
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
                    onChange={validateUsername}
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

                    <div>
                        <Button
                            onClick={handleSubmit}
                            type="submit"
                            fullWidth
                            variant="contained"
                        >
                            Sign in
                        </Button>
                    </div>
                </AnimatedElement>

                <Typography
                    variant="body2"
                    component="p"
                    sx={{textAlign: 'center', marginTop: 2}}
                >
                    Don't have an account?{' '}
                    <Link to="/registration" style={{color: '#1976d2'}}>
                        Sign up
                    </Link>
                </Typography>


            </Box>
        </Card>
    )
}
