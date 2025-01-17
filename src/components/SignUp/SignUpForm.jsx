import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import '../InputElements/FadeAnimation.css'
import LoadingButton from '@mui/lab/LoadingButton';
import {sendRegistrationForm} from "../../services/fetch/SendRegistrationForm.js"

import AnimatedElement from '../InputElements/AnimatedElement.jsx'
import {Link, useNavigate} from 'react-router-dom';
import UserAlreadyExistException from "../../exception/UserAlreadyExistException.jsx";
import ValidatedAvatarInput from "../InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import ValidatedUsernameTextField from "../InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../InputElements/TextField/ValidatedPasswordField.jsx";
import ValidatedPasswordConfirmField from "../InputElements/TextField/ValidatedPasswordConfirmField.jsx"; // Иконка плюса

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

export default function SignUpForm() {
    const [avatarUrl, setAvatarUrl] = React.useState('');

    const [username, setUsername] = React.useState('')
    const [usernameError, setUsernameError] = React.useState('');

    const [password, setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('');

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (usernameError || passwordError || confirmPasswordError) {
            return;
        }

        const requestData = {
            username,
            password,
            avatarUrl
        };

        try {
            setLoading(true);
            await sendRegistrationForm(requestData);

            navigate("/weather-app/login", {
                state: {
                    message: "You've successfully signed up. Now you can log in to your account.",
                    type: "info"
                },
            });
        } catch (error) {
            switch (true) {
                case error instanceof UserAlreadyExistException:
                    setUsernameError(error.message);
                    break;

                default:
                    alert('Unknown error occurred! ');
                    window.location.reload();
            }
        }
        setLoading(false);
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
            <form onSubmit={handleSubmit}>


                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',
                        gap: 2,
                    }}
                >
                    <ValidatedAvatarInput
                        setAvatarUrl={setAvatarUrl}
                    />

                    <ValidatedUsernameTextField
                        username={username}
                        setUsername={setUsername}

                        usernameError={usernameError}
                        setUsernameError={setUsernameError}
                    />

                    <AnimatedElement
                        condition={!usernameError && username.length > 0}>
                        <ValidatedPasswordField
                            password={password}
                            setPassword={setPassword}

                            passwordError={passwordError}
                            setPasswordError={setPasswordError}
                        />
                    </AnimatedElement>

                    <AnimatedElement
                        condition={!passwordError && !usernameError && username.length > 0 && password.length > 0}>
                        <ValidatedPasswordConfirmField
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}

                            confirmPasswordError={confirmPasswordError}
                            setConfirmPasswordError={setConfirmPasswordError}

                            originalPassword={password}
                        />
                    </AnimatedElement>

                    <AnimatedElement
                        condition={!passwordError && !usernameError && !confirmPasswordError && username.length > 0 && password.length > 0 && confirmPassword.length > 0}>
                        <div>
                            <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                // size="small"
                                onClick={handleSubmit}
                                loading={loading}
                                loadingPosition="center"
                            >
                                Sign up
                            </LoadingButton>
                        </div>
                    </AnimatedElement>


                    <Typography
                        variant="body2"
                        component="p"
                        sx={{textAlign: 'center', marginTop: 2}}
                    >
                        Already have an account?{' '}
                        <Link to="/weather-app/login" style={{color: '#1976d2'}}>
                            Sign in
                        </Link>
                    </Typography>

                </Box>
            </form>

        </Card>
    )
}