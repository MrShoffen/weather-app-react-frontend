import React, {useEffect, useState} from "react";
import {Box, Button, Divider, Modal, TextField, Typography} from "@mui/material";
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
import {sendEdit} from "../../services/SendEdit.js";
import UserAlreadyExistException from "../../exception/UserAlreadyExistException.jsx";
import InformationBadge from "../InformationBadge/InformationBadge.jsx";


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

    const {auth, login} = useAuth();


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


    const [successMessage, setSuccessMessage] = React.useState('');


    if (auth.isAuthenticated) {
        return (
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

                        <InformationBadge message={successMessage} type="info" />

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

                        <AnimatedElement
                            condition={!oldPasswordError && oldPassword.length > 0}>
                            <div>
                                <Button style={{width: "100%"}} variant="outlined" onClick={onClose} color="error">
                                    Delete Account
                                </Button>
                            </div>
                        </AnimatedElement>

                    </Box>
                </Card>
            </Modal>
        );
    }
};