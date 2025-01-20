import React, {useEffect, useState} from "react";
import {Box, Button, Modal, Slide, Typography} from "@mui/material";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import ValidatedAvatarInput from "../../components/InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import ValidatedUsernameTextField from "../../components/InputElements/TextField/ValidatedUsernameTextField.jsx";
import {sendEdit} from "../../services/fetch/auth/SendEdit.js";
import UserAlreadyExistException from "../../exception/UserAlreadyExistException.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx";


const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
    maxWidth: '90%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '400px',
        maxWidth: '400px',
    },
}));



export default function ProfileModal({open, onClose}) {

    const {auth, login, validateSession} = useAuthContext();

    const [avatarUrl, setAvatarUrl] = React.useState('');

    const [username, setUsername] = React.useState('');
    const [usernameError, setUsernameError] = React.useState('');


    useEffect(() => {
        validateSession();
        setAvatarUrl(auth.isAuthenticated ? auth.user.avatarUrl : '');
        setUsername(auth.isAuthenticated ? auth.user.username : '')


    }, [open, auth.isAuthenticated]);


    const [loading, setLoading] = useState(false);

    const {showNotification} = useNotification();

    const handleSave = async () => {
        try {
            setLoading(true);
            const editInformation = {
                newUsername: username,
                newAvatarUrl: avatarUrl,
            }

            const newData = await sendEdit(editInformation, "/profile");

            login(newData);

            showNotification({message: "Information updated successfully.", severity: "success"});
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
        setLoading(false);
    };

    const [avatarLoading, setAvatarLoading] = React.useState(false);


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


            <Slide in={open} direction={'up'}
            style={{
                transform: "translate(-50%, 0%)",
                // top: "70px",
                marginTop: "70px",
                // position: "absolute",
            }}
            >
                <Card variant="outlined"
                      sx={{
                          backgroundColor: "background.paper",
                          width: 400,
                          boxShadow: 24,
                          p: 2,
                          borderRadius: "8px",
                          position: "relative",
                      }}
                >
                    <IconButton
                        aria-label="close"
                        size="small"
                        onClick={() => {
                            onClose();
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
                        variant="h5"
                        textAlign="center"
                        sx={{width: '100%', mb: 2}}
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
                            avatarLoading={avatarLoading}
                            setAvatarLoading={setAvatarLoading}
                        />

                        <ValidatedUsernameTextField
                            username={username}
                            setUsername={setUsername}

                            usernameError={usernameError}
                            setUsernameError={setUsernameError}
                        />

                        <Box display="flex" justifyContent="flex-end" gap={2}>
                            <Button size="small" variant="outlined" onClick={onClose}>
                                Cancel
                            </Button>
                            <LoadingButton
                                size="small"
                                variant="contained"
                                onClick={handleSave}
                                loading={loading || avatarLoading}
                                disabled={(usernameError || username === auth.user.username || username.length === 0) && (avatarUrl === auth.user.avatarUrl)}
                            >
                                Save
                            </LoadingButton>
                        </Box>

                    </Box>
                </Card>
            </Slide>
            </Modal>
        );
    }
};