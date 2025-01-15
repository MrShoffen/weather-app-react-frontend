import * as React from 'react';
import {useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import MuiCard from '@mui/material/Card';
import {styled} from '@mui/material/styles';
import '../InputElements/FadeAnimation.css'
import {Link} from 'react-router-dom';
import {sendLoginForm} from "../../services/SendLoginForm.js"
import AnimatedElement from '../InputElements/AnimatedElement.jsx'
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import UserNotFoundException from "../../exception/UserNotFoundException.jsx";
import IncorrectPasswordException from "../../exception/IncorrectPasswordException.jsx";
import PrevPageInfoBadge from "../PreviusPageInformationBadge/PrevPageInfoBadge.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import ValidatedUsernameTextField from "../InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../InputElements/TextField/ValidatedPasswordField.jsx";
import SessionNotFoundException from "../../exception/SessionNotFoundException.jsx";

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
    const {login} = useAuth();

    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');

    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (usernameError || passwordError) {
            return
        }

        const requestData = {
            username,
            password,
        };

        try {
            setLoading(true);
            const profile = await sendLoginForm(requestData);
            login(profile);
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
                    alert('Unknown error occurred! ');
                    window.location.reload();
            }
        }
        setLoading(false);
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
                        <div>
                            <LoadingButton
                                loadingPosition="center"
                                fullWidth
                                type="submit"
                                variant="contained"
                                // size="small"
                                onClick={handleSubmit}
                                loading={loading}
                            >
                                Sign in
                            </LoadingButton>
                        </div>
                    </AnimatedElement>

                    <Typography
                        variant="body2"
                        component="p"
                        sx={{textAlign: 'center', marginTop: 2}}
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
