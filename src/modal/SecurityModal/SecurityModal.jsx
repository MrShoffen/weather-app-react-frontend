import React, {useState} from "react";
import {Box, Button, Divider, Modal, Typography} from "@mui/material";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import AnimatedElement from "../../components/InputElements/AnimatedElement.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import {useNavigate} from "react-router-dom";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import ValidatedPasswordField from "../../components/InputElements/TextField/ValidatedPasswordField.jsx";
import ValidatedPasswordConfirmField from "../../components/InputElements/TextField/ValidatedPasswordConfirmField.jsx";
import IncorrectPasswordException from "../../exception/IncorrectPasswordException.jsx";
import {sendEdit} from "../../services/fetch/auth/SendEdit.js";
import InformationBadge from "../../components/InformationBadge/InformationBadge.jsx";
import {sendDeleteUser} from "../../services/fetch/auth/SendDeleteUser.js";
import DeleteIcon from '@mui/icons-material/Delete';
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


export default function SecurityModal({open, onClose}) {

    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false); // Стейт для второго модального окна

    const handleDeleteClick = () => {
        setDeleteConfirmOpen(true); // Открываем модальное окно подтверждения
    };

    const handleDeleteCancel = () => {
        setDeleteConfirmOpen(false); // Закрываем модальное окно подтверждения
    };

    const handleDeleteConfirm = async () => {
        setDeleteConfirmOpen(false); // Закрываем модалку
        await handleDelete(); // Удаляем пользователя
    };

    const {auth, logout} = useAuth();


    const [oldPassword, setOldPassword] = React.useState('');
    const [oldPasswordError, setOldPasswordError] = React.useState('');

    const [newPassword, setNewPassword] = React.useState('')
    const [newPasswordError, setNewPasswordError] = React.useState('');

    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [confirmPasswordError, setConfirmPasswordError] = React.useState('');


    const [loading, setLoading] = useState(false);


    const handleSave = async () => {
        try {
            setSuccessMessage('');
            setLoading(true);

            const editInformation = {
                oldPassword: oldPassword,
                newPassword: newPassword,
            }

            const newData = await sendEdit(editInformation, "/password");
            setSuccessMessage("Password updated!.");

        } catch (error) {
            switch (true) {
                case error instanceof IncorrectPasswordException:
                    setOldPasswordError(error.message);
                    break;

                default:
                    alert('Unknown error occurred! ');
                    window.location.reload();
            }
        }
        setLoading(false);
        setNewPassword('')
        setConfirmPassword('')
        // onClose();
    };

    const navigate = useNavigate();
    const handleDelete = async () => {
        try {
            setLoading(true);
            await sendDeleteUser();
            logout();
            setTimeout(() => navigate("/weather-app/login", {
                state: {
                    message: "Your account has been deleted.",
                    type: "info"
                },
            }), 200)


        } catch (error) {
            alert('Unknown error occurred! ');
        }
        setLoading(false);
    }


    const [successMessage, setSuccessMessage] = React.useState('');


    if (auth.isAuthenticated) {
        return (
            <>
                <Modal
                    open={open}
                    onClose={() => {
                        onClose();
                        setSuccessMessage('');
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

                            <InformationBadge message={successMessage} type="info"/>

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
                                <Button variant="outlined" onClick={onClose}>
                                    Cancel
                                </Button>


                                <LoadingButton
                                    variant="contained"
                                    onClick={handleSave}
                                    loading={loading}
                                    disabled={oldPasswordError || oldPassword.length === 0 || newPasswordError || newPassword.length === 0 || confirmPasswordError || confirmPassword.length === 0}
                                >
                                    Change Password
                                </LoadingButton>

                            </Box>

                            <Divider/>


                            <LoadingButton loading={loading} style={{width: "100%"}} variant="text"
                                           onClick={handleDeleteClick} color="error">
                                Delete Account <DeleteIcon/>
                            </LoadingButton>


                        </Box>
                    </Card>
                </Modal>

                <Modal
                    open={deleteConfirmOpen}
                    onClose={handleDeleteCancel}
                    aria-labelledby="confirm-delete-modal"
                    aria-describedby="confirm-delete-modal-description"
                >
                    <Card variant="outlined"
                          sx={{
                              position: "absolute",
                              top: "50%",
                              left: "50%",
                              backgroundColor: "background.paper",
                              transform: "translate(-50%, -50%)",
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
                </Modal>

            </>

        );
    }
};