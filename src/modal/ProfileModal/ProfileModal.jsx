import React, {useEffect, useState} from "react";
import {Box, Button, Divider, Modal, TextField, Typography} from "@mui/material";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import ValidatedAvatarInput from "../../components/InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import ValidatedTextField from "../../components/InputElements/TextField/ValidatedTextField.jsx";
import AnimatedElement from "../../components/InputElements/AnimatedElement.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link} from "react-router-dom";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import ValidatedUsernameTextField from "../../components/InputElements/TextField/ValidatedUsernameTextField.jsx";
import ValidatedPasswordField from "../../components/InputElements/TextField/ValidatedPasswordField.jsx";
import ValidatedPasswordConfirmField from "../../components/InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import LoadingPage from "../../pages/Loading/LoadingPage.jsx";
import {sendLoginForm} from "../../services/fetch/unauth/SendLoginForm.js";
import UserNotFoundException from "../../exception/UserNotFoundException.jsx";
import IncorrectPasswordException from "../../exception/IncorrectPasswordException.jsx";
import {sendEdit} from "../../services/fetch/auth/SendEdit.js";
import UserAlreadyExistException from "../../exception/UserAlreadyExistException.jsx";
import InformationBadge from "../../components/InformationBadge/InformationBadge.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


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

    const {auth, login, validateSession} = useAuth();

    const [avatarUrl, setAvatarUrl] = React.useState('');

    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');


    useEffect(() => {
        validateSession();
        setAvatarUrl(auth.isAuthenticated ? auth.user.avatarUrl : '');
        setUsername(auth.isAuthenticated ? auth.user.username : '')


    }, [open, auth.isAuthenticated]);


    const [loading, setLoading] = useState(false);


    const handleSave = async () => {
        try {
            setSuccessMessage('');
            setLoading(true);
            const editInformation = {
                newUsername: username,
                newAvatarUrl: avatarUrl,
            }

            const newData = await sendEdit(editInformation, "/profile");

            login(newData);
            setSuccessMessage("Information updated successfully.");
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

        // onClose();
    };


    const [successMessage, setSuccessMessage] = React.useState('');


    if (auth.isAuthenticated) {
        return (
            <Modal
                open={open}
                onClose={() => {
                    onClose();
                    setSuccessMessage("");
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
                    <IconButton
                        aria-label="close"
                        size="small"
                        onClick={() => {
                            onClose();
                            setSuccessMessage("");
                        }}

                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            width: '25px',
                            height: '25px',
                        }}
                    >
                        <CloseIcon sx={{fontSize: '25px'}}/>
                    </IconButton>


                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}
                    >
                        Edit Profile
                    </Typography>

                    <InformationBadge message={successMessage} type="info"/>


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

                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <LoadingButton
                                variant="contained"
                                onClick={handleSave}
                                loading={loading}
                                disabled={(usernameError || username === auth.user.username || username.length === 0) && (avatarUrl === auth.user.avatarUrl)}
                            >
                                Save
                            </LoadingButton>
                        </Box>

                    </Box>
                </Card>
            </Modal>
        );
    }
};