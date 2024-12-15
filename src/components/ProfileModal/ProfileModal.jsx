import React, {useState, useEffect} from "react";
import {AppBar, Toolbar, Button, Box, Modal, TextField, Typography} from "@mui/material";
import {useAuth} from "../../context/Auth/AuthContext.jsx";

const ProfileModal = ({open, onClose}) => {

    const {auth, login} = useAuth();
    // Загружаем данные пользователя из localStorage при открытии модального окна
    useEffect(() => {
        if (open) {

        }
    }, [open]);

    // Обработчик изменения полей ввода
    const handleInputChange = (e) => {
        const {name, value} = e.target;
    };

    // Сохранение данных в localStorage
    const handleSave = () => {
        localStorage.setItem("User", JSON.stringify(userData));
        onClose(); // Закрываем модальное окно
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

export default ProfileModal;