import React, {useEffect, useState} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import ValidatedAvatarInput from "../InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import ValidatedTextField from "../InputElements/TextField/ValidatedTextField.jsx";
import AnimatedElement from "../InputElements/AnimatedElement.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import ValidatedUsernameTextField from "../InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../InputElements/TextField/ValidatedPasswordField.jsx";
import ValidatedPasswordConfirmField from "../InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import LoadingPage from "../../pages/Loading/LoadingPage.jsx";
import {sendLoginForm} from "../../services/SendLoginForm.js";
import UserNotFoundException from "../../exception/UserNotFoundException.jsx";
import IncorrectPasswordException from "../../exception/IncorrectPasswordException.jsx";


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


export default function ProfileModal({open, onClose}) {

    const {auth, login} = useAuth();

    const [avatarUrl, setAvatarUrl] = React.useState('');

    const [username, setUsername] = React.useState( '');
    const [usernameError, setUsernameError] = React.useState('');

    const [password, setPassword] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('');

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');


    useEffect(() => {

        setAvatarUrl(auth.isAuthenticated ? auth.user.avatarUrl : '');
        setUsername(auth.isAuthenticated ? auth.user.username : '')


    }, [open, auth.isAuthenticated]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
    };


    const [loading, setLoading] = useState(false);


    const handleSave = () => {


        // const requestData = {
        //     username,
        //     password,
        // };

        try {
            setLoading(true);
            // const profile = await sendLoginForm(requestData);

            const profile = {
                username: username,
                avatarUrl: avatarUrl
            }

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

                default:
                    alert('Unknown error occurred! ');
                    window.location.reload();
            }
        }
        setLoading(false);
        // onClose();
    };


    if (auth.isAuthenticated) {
        return (
            <Modal
                open={open}
                onClose={() => {
                    onClose();
                }}
                aria-labelledby="profile-modal"
                aria-describedby="profile-modal-description"
            >

                <Card variant="outlined"
                      sx={{
                          position: "absolute",
                          top: "70px",
                          left: "50%",
                          backgroundColor: "background.paper",
                          transform: "translate(-50%, 0%)",
                          width: 400,
                          boxShadow: 24,
                          p: 4,
                          borderRadius: "8px",
                      }}
                >

                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                    >
                        Edit Profile
                    </Typography>


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
                            initialAvatarUrl={avatarUrl}
                        />

                        <ValidatedUsernameTextField
                            username={username}
                            setUsername={setUsername}

                            usernameError={usernameError}
                            setUsernameError={setUsernameError}
                        />

                        <ValidatedPasswordField
                            password={password}
                            setPassword={setPassword}

                            passwordError={passwordError}
                            setPasswordError={setPasswordError}

                            label="New Password"
                        />

                        <ValidatedPasswordConfirmField
                            confirmPassword={confirmPassword}
                            setConfirmPassword={setConfirmPassword}

                            confirmPasswordError={confirmPasswordError}
                            setConfirmPasswordError={setConfirmPasswordError}

                            originalPassword={password}

                            label="Confirm New Password"
                        />


                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <LoadingButton variant="contained" onClick={handleSave} loading={loading}>
                                Save
                            </LoadingButton>
                        </Box>

                    </Box>
                </Card>
            </Modal>
        );
    }
};