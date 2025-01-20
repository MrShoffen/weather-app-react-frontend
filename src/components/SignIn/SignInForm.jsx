import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import '../InputElements/FadeAnimation.css'
import {Link} from 'react-router-dom';
import {sendLoginForm} from "../../services/fetch/unauth/SendLoginForm.js"
import AnimatedElement from '../InputElements/AnimatedElement.jsx'
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import UserNotFoundException from "../../exception/UserNotFoundException.jsx";
import IncorrectPasswordException from "../../exception/IncorrectPasswordException.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import ValidatedUsernameTextField from "../InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../InputElements/TextField/ValidatedPasswordField.jsx";
import SessionNotFoundException from "../../exception/SessionNotFoundException.jsx";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx";
import {Button} from "@mui/material";

const Card = styled(MuiCard)(({theme}) => ({
    padding: theme.spacing(4),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(2),
    gap: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
        width: '400px',
        maxWidth: '400px',
    },
}));

export default function SignInForm() {
    const {login} = useAuthContext();

    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');

    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const [loading, setloading] = useState(false);

    const {showNotification, showWarn} = useNotification();


    const handleSubmit = async () => {
        if (usernameError || passwordError) {
            return
        }

        const requestData = {
            username,
            password,
        };

        try {
            setloading(true);
            const profile = await sendLoginForm(requestData);
            login(profile);
            showNotification({ message: "You've successfully logged in", severity: "info", duration: 2000 });
        } catch (error) {
            switch (true) {
                case error instanceof UserNotFoundException:
                    setUsernameError(error.message);
                    break;
                case error instanceof IncorrectPasswordException:
                    console.log(error.message);
                    setPasswordError(error.message);
                    break;
                case error instanceof SessionNotFoundException:
                    console.log(error.message);
                    await handleSubmit();
                    break;
                default:
                    showWarn("Failed to log in! Try again please.");
            }
        }
        setloading(false);
    };

    const shouldShowPasswordField = !usernameError && username.length > 0;
    const shouldShowButton = !passwordError && shouldShowPasswordField && password.length > 0;



    return (
        <Card variant="outlined"
              sx={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'center',
                  width: '320px',
                  maxWidth: '320px',
                  margin: 'auto',

                  height: shouldShowButton ? '370px' : shouldShowPasswordField ? '330px' : '240px',
                  transition: 'height 0.5s ease',
              }}>

            <Typography
                component="h1"
                variant="h4"
                sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
            >
                Sign in
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
                        condition={shouldShowButton}>
                        <div>
                            <LoadingButton
                                loadingPosition="center"
                                fullWidth
                                type="submit"
                                variant="contained"
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                Sign in
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
                        Don't have an account?{' '}
                        <Link to="/weather-app/registration" style={{color: '#1976d2'}}>
                            Sign up
                        </Link>

                    </Typography>
                </Box>
            </form>
        </Card>
    )
}
