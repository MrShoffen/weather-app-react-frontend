import React, {useEffect} from "react";
import {Box, Button, Modal, TextField, Typography} from "@mui/material";
import {useAuth} from "../../context/Auth/AuthContext.jsx";

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

    if (auth.isAuthenticated) {
        return (
            <Modal
                open={open}
                onClose={onClose}
                aria-labelledby="profile-modal"
                aria-describedby="profile-modal-description"
            >
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