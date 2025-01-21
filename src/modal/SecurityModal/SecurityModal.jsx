import React, {useState} from "react";
import {Box, Button, Divider, Modal, Slide, Typography} from "@mui/material";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import AnimatedElement from "../../components/InputElements/AnimatedElement.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import ValidatedPasswordField from "../../components/InputElements/TextField/ValidatedPasswordField.jsx";
import ValidatedPasswordConfirmField from "../../components/InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import IncorrectPasswordException from "../../exception/IncorrectPasswordException.jsx";
import {sendEdit} from "../../services/fetch/auth/SendEdit.js";
import {sendDeleteUser} from "../../services/fetch/auth/SendDeleteUser.js";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx";


const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
    maxWidth: '90%',
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        width: '400px',

        maxWidth: '400px',
    },
}));


export default function SecurityModal({open, onClose}) {

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);

    const handleDeleteClick = () => {
        setDeleteConfirmOpen(true);
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false);
    };

    const handleDeleteConfirm = async () => {
        setDeleteConfirmOpen(false);
        await handleDelete();
    };

    const {auth, logout} = useAuthContext();


    const [oldPassword, setOldPassword] = React.useState('');
    const [oldPasswordError, setOldPasswordError] = React.useState('');

    const [newPassword, setNewPassword] = React.useState('')
    const [newPasswordError, setNewPasswordError] = React.useState('');

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');


    const [loading, setLoading] = useState(false);

    const {showNotification} = useNotification();
    const handleSave = async () => {
        try {
            setLoading(true);

            const editInformation = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }

            await sendEdit(editInformation, "/password");
            showNotification({message: "Password updated!", severity: "success"});

        } catch (error) {
            switch (true) {
                case error instanceof IncorrectPasswordException:
                    setOldPasswordError(error.message);
                    break;

                default:
                    console.log('Unknown error occurred! ');
                    window.location.reload();
            }
        }
        setLoading(false);
        setNewPassword('')
        setConfirmPassword('')

    };

    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            setLoading(true);
            await sendDeleteUser();
            logout();
            setTimeout(() => {
                navigate("/weather-app/login");
                showNotification(
                    {
                        message: "Your account has been deleted!",
                        severity: "info"
                    })
            }, 200)


        } catch (error) {
            console.log('Unknown error occurred! ');
        }
        setLoading(false);
    }


    if (auth.isAuthenticated) {
        return (
            <>
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
                               marginTop: "70px",
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
                                Security Settings
                            </Typography>


                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: '100%',
                                    gap: 2,
                                }}
                            >

                                <ValidatedPasswordField
                                    password={oldPassword}
                                    setPassword={setOldPassword}

                                    passwordError={oldPasswordError}
                                    setPasswordError={setOldPasswordError}

                                    label="Current Password"
                                />


                                <AnimatedElement
                                    condition={!oldPasswordError && oldPassword.length > 0}>
                                    <ValidatedPasswordField
                                        password={newPassword}
                                        setPassword={setNewPassword}

                                        passwordError={newPasswordError}
                                        setPasswordError={setNewPasswordError}

                                        label="New Password"
                                    />
                                </AnimatedElement>

                                <AnimatedElement
                                    condition={!oldPasswordError && oldPassword.length > 0 && !newPasswordError && newPassword.length > 0}>
                                    <ValidatedPasswordConfirmField
                                        confirmPassword={confirmPassword}
                                        setConfirmPassword={setConfirmPassword}

                                        confirmPasswordError={confirmPasswordError}
                                        setConfirmPasswordError={setConfirmPasswordError}

                                        originalPassword={newPassword}

                                        label="Confirm New Password"
                                    />
                                </AnimatedElement>


                                <Box display="flex" justifyContent="flex-end" gap={2}>
                                    <Button size="small" variant="outlined" onClick={onClose}>
                                        Cancel
                                    </Button>


                                    <LoadingButton
                                        variant="contained"
                                        size="small"
                                        onClick={handleSave}
                                        loading={loading}
                                        disabled={oldPasswordError || oldPassword.length === 0 || newPasswordError || newPassword.length === 0 || confirmPasswordError || confirmPassword.length === 0}
                                    >
                                        Change Password
                                    </LoadingButton>

                                </Box>

                                <Divider/>


                                <LoadingButton size="small" loading={loading} style={{width: "100%"}} variant="text"
                                               onClick={handleDeleteClick} color="error">
                                    Delete Account <DeleteIcon/>
                                </LoadingButton>


                            </Box>
                        </Card>
                    </Slide>

                </Modal>


                <Modal
                    open={deleteConfirmOpen}
                    onClose={handleDeleteCancel}
                    aria-labelledby="confirm-delete-modal"
                    aria-describedby="confirm-delete-modal-description"
                >
                    <Slide in={deleteConfirmOpen} direction={'up'}
                           style={{
                               transform: "translate(-50%, 0%)",
                               marginTop: "170px",
                           }}
                    >
                        <Card variant="outlined"
                              sx={{
                                  position: "relative",
                                  backgroundColor: "background.paper",
                                  width: 300,
                                  boxShadow: 24,
                                  p: 4,
                                  borderRadius: "8px",
                              }}
                        >
                            <Typography
                                component="h2"
                                variant="h6"
                                sx={{textAlign: "center", mb: 2}}
                            >
                                Are you sure you want to delete your account?
                            </Typography>
                            <Box display="flex" justifyContent="space-between" mt={2}>
                                <Button variant="outlined" onClick={handleDeleteCancel}>
                                    No
                                </Button>
                                <Button variant="contained" color="error" onClick={handleDeleteConfirm}>
                                    Yes
                                </Button>
                            </Box>
                        </Card>
                    </Slide>
                </Modal>

            </>

        )
            ;
    }
};