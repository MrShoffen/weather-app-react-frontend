import React, {useEffect} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import ValidatedAvatarInput from "../InputElements/AvatarInput/ValidatedAvatarInput.jsx";
import ValidatedTextField from "../InputElements/TextField/ValidatedTextField.jsx";
import AnimatedElement from "../InputElements/AnimatedElement.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import {Link} from "react-router-dom";

export default function ProfileModal({open, onClose}) {

    const {auth, login} = useAuth();

    useEffect(() => {
        if (open) {

        }
    }, [open]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
    };

    const handleSave = () => {
        localStorage.setItem("User", JSON.stringify(userData));
        onClose();
    };

    const [avatarUrl, setAvatarUrl] = React.useState('');


    if (auth.isAuthenticated) {
        return (
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="profile-modal"
                aria-describedby="profile-modal-description"
            >

                {/*<Card variant="outlined">*/}

                {/*    <Typography*/}
                {/*        component="h1"*/}
                {/*        variant="h4"*/}
                {/*        sx={{width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)'}}*/}
                {/*    >*/}
                {/*        Sign up*/}
                {/*    </Typography>*/}


                {/*    <Box*/}
                {/*        sx={{*/}
                {/*            display: 'flex',*/}
                {/*            flexDirection: 'column',*/}
                {/*            width: '100%',*/}
                {/*            gap: 2,*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <ValidatedAvatarInput setAvatarUrl={setAvatarUrl}/>*/}

                {/*        <ValidatedTextField*/}
                {/*            id="username"*/}
                {/*            label="Username"*/}
                {/*            autoComplete="username"*/}
                {/*            placeholder="Latin letters and underline"*/}
                {/*            type="text"*/}

                {/*            value={username}*/}
                {/*            onChange={(e) => validateUsername(e.target.value)}*/}
                {/*            error={usernameError}*/}
                {/*            helperText={usernameErrorMessage}*/}
                {/*        />*/}

                {/*            <ValidatedTextField*/}
                {/*                id="password"*/}
                {/*                label="Password"*/}
                {/*                autoComplete="current-password"*/}
                {/*                placeholder="Latin latters and numbers"*/}
                {/*                type="password"*/}

                {/*                value={password}*/}
                {/*                onChange={(e) => validatePassword(e.target.value)}*/}
                {/*                error={passwordError}*/}
                {/*                helperText={passwordErrorMessage}*/}

                {/*            />*/}



                {/*            <ValidatedTextField*/}
                {/*                id="password_confirm"*/}
                {/*                label="Confirm Password"*/}
                {/*                autoComplete="off"*/}
                {/*                placeholder="Latin latters and numbers"*/}
                {/*                type="password_confirm"*/}

                {/*                value={confirmPassword}*/}
                {/*                onChange={(e) => validatePasswordConfirm(e.target.value)}*/}
                {/*                error={confirmPasswordError}*/}
                {/*                helperText={confirmPasswordErrorMessage}*/}
                {/*            />*/}



                {/*            <LoadingButton*/}
                {/*                fullWidth*/}
                {/*                type="submit"*/}
                {/*                variant="contained"*/}
                {/*                // size="small"*/}
                {/*                onClick={handleSubmit}*/}
                {/*                loading={loading}*/}
                {/*                loadingPosition="end"*/}
                {/*            >*/}
                {/*                Sign up*/}
                {/*            </LoadingButton>*/}




                {/*    </Box>*/}
                {/*</Card>*/}

                <Box
                    sx={{
                        position: "absolute",
                        top: "40%",
                        left: "50%",
                        backgroundColor: "background.paper",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        boxShadow: 24,
                        p: 4,
                        borderRadius: "8px",
                    }}
                >
                    <Typography id="profile-modal" variant="h6" component="h2" mb={2}>
                        Edit Profile
                    </Typography>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Username"
                        name="username"
                        value={auth.user.username}
                        onChange={handleInputChange}
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Password"
                        name="password"
                        type="password"

                        onChange={handleInputChange}
                    />
                    <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
                        <Button variant="outlined" onClick={onClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" onClick={handleSave}>
                            Save
                        </Button>
                    </Box>
                </Box>
            </Modal>
        );
    }
};