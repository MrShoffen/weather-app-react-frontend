import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import '../InputElements/FadeAnimation.css'
import LoadingButton from '@mui/lab/LoadingButton';
import {sendRegistrationForm} from "../../services/fetch/unauth/SendRegistrationForm.js"

import AnimatedElement from '../InputElements/AnimatedElement.jsx'
import {Link, useNavigate} from 'react-router-dom';
import UserAlreadyExistException from "../../exception/UserAlreadyExistException.jsx";
import ValidatedAvatarInput from "../InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import ValidatedUsernameTextField from "../InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../InputElements/TextField/ValidatedPasswordField.jsx";
import ValidatedPasswordConfirmField from "../InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx"; // Иконка плюса

const Card = styled(MuiCard)(({theme}) => ({
        padding: theme.spacing(4),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        gap: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            width: '400px',
            maxWidth: '400px',
        },
    }))
;

export default function SignUpForm() {
    const [avatarUrl, setAvatarUrl] = React.useState('');

    const [username, setUsername] = React.useState('')
    const [usernameError, setUsernameError] = React.useState('');

    const [password, setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('');

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');

    const [registrationLoading, setRegistrationLoading] = useState(false);
    const navigate = useNavigate();

    const {showNotification} = useNotification();
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
            setRegistrationLoading(true);
            await sendRegistrationForm(requestData);

            navigate("/weather-app/login");

            showNotification({
                message: "You've successfully signed up. Now you can log in to your account.",
                severity: "success"
            })

        } catch (error) {
            switch (true) {
                case error instanceof UserAlreadyExistException:
                    setUsernameError(error.message);
                    break;

                default:
                    console.log('Unknown error occurred! ');
                    window.location.reload();
            }
        }
        setRegistrationLoading(false);
    };

    const [avatarLoading, setAvatarLoading] = React.useState(false);

    const shouldShowPasswordField = !usernameError && username.length > 0;
    const shouldShowValidatePasswordField = !passwordError && shouldShowPasswordField&& password.length > 0;
    const shouldShowButton = shouldShowValidatePasswordField && !confirmPasswordError && confirmPassword.length > 0;
    return (
        <Card variant="outlined"
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignSelf: 'center',
            width: '320px',
            maxWidth: '320px',
            margin: 'auto',
            position: 'relative',
            height: shouldShowButton ? '615px' : shouldShowValidatePasswordField ? '545px' : shouldShowPasswordField ? '475px' : '405px',
            transition: 'height 0.5s ease',
            marginBottom: '200px',

        }}>

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
                        avatarLoading={avatarLoading}
                        setAvatarLoading={setAvatarLoading}
                    />

                    <ValidatedUsernameTextField
                        username={username}
                        setUsername={setUsername}

                        usernameError={usernameError}
                        setUsernameError={setUsernameError}
                    />

                    <AnimatedElement
                        condition={shouldShowPasswordField}>
                        <ValidatedPasswordField
                            password={password}
                            setPassword={setPassword}

                            passwordError={passwordError}
                            setPasswordError={setPasswordError}
                        />
                    </AnimatedElement>

                    <AnimatedElement
                        condition={shouldShowValidatePasswordField}>
                        <ValidatedPasswordConfirmField
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}

                            confirmPasswordError={confirmPasswordError}
                            setConfirmPasswordError={setConfirmPasswordError}

                            originalPassword={password}
                        />
                    </AnimatedElement>

                    <AnimatedElement
                        condition={shouldShowButton}>
                        <div>
                            <LoadingButton
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit}
                                loading={registrationLoading || avatarLoading}
                                loadingPosition="center"
                            >
                                Sign up
                            </LoadingButton>
                        </div>
                    </AnimatedElement>


                    <Typography
                        variant="body1"
                        component="p"
                        sx={{
                            position: 'absolute',
                            transform: 'translateX(-50%)',
                            left: '50%',
                            width: '100%',
                            bottom: 10
                        }}
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