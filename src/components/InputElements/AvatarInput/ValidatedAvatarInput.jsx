import FormControl from "@mui/material/FormControl";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import * as React from "react";
import {useState} from "react";
import FormLabel from "@mui/material/FormLabel";
import {CircularProgress, FormHelperText} from "@mui/material";
import {uploadAvatar} from "../../../services/fetch/unauth/UploadAvatar.js";


export default function ValidatedAvatarInput({setAvatarUrl, initialAvatarUrl = '', avatarLoading, setAvatarLoading}) {
    const [avatarPreview, setAvatarPreview] = useState(initialAvatarUrl || null);
    const [avatarError, setAvatarError] = React.useState(false);
    const [avatarErrorMessage, setAvatarErrorMessage] = React.useState('');

    const validateAvatar = (file) => {
        const acceptedFileTypes = ["image/jpeg", "image/png", "image/jpg"];
        if (!acceptedFileTypes.includes(file.type)) {
            setAvatarErrorMessage("Invalid file type. Only .jpg and .png allowed");
            setAvatarError(true)
            return false;
        }

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            setAvatarErrorMessage("Maximum file size is 5MB");
            setAvatarError(true)
            return false;
        }

        return true;
    }

    const handleAvatarChange = async (e) => {
        setAvatarLoading(true);
        const file = e.target.files[0];
        if (file && validateAvatar(file)) {

            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result);
            };
            reader.readAsDataURL(file);

            const formData = new FormData();
            formData.append('image', file);

            try {
                const avatar = await uploadAvatar(formData);
                setAvatarUrl(avatar.imageUrl);
                setAvatarError(false)
                setAvatarErrorMessage('')
            } catch (error) {
                console.log(error.message);
                setAvatarError(true);
                setAvatarErrorMessage('Failed to upload avatar');
            }
        }

        setAvatarLoading(false);
    };

    const handleDeleteAvatar = () => {
        setAvatarPreview(null);
        setAvatarUrl('');
    };


    return (
        <FormControl style={{marginBottom: 25}}
                     variant='outlined'
        >

            <FormLabel htmlFor="avatar-upload" sx={{
                backgroundColor: 'background.default',
                position: "absolute",
                left: 10,
                top: 0,
                transform: "translateY(-50%)",
                padding: "0 4px",
                zIndex: 1,
            }}>
                Upload avatar (Optional)
            </FormLabel>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                    border: "1px solid",
                    borderRadius: "4px",
                    borderColor: "gray",
                    padding: "6px",
                    paddingLeft: 1,
                    paddingRight: 1,
                    paddingTop: 2,
                    paddingBottom: 1
                }}
            >
                <Box
                    sx={{
                        width: 70,
                        height: 70,
                        position: "relative",
                        border: avatarPreview ? "none" : "2px dashed #bbb",
                        justifyContent: "center",
                        borderRadius: "6px",
                        backgroundColor: avatarPreview ? "#fff" : "transparent",

                        "&:hover": {
                            cursor: "pointer",
                            borderColor: 'text.primary',
                            "& > label > svg": {
                                color: 'text.primary',
                                cursor: "pointer",
                            }
                        }

                    }}
                >
                    <input
                        type="file"
                        accept="image/jpeg, image/png, image/jpg"
                        style={{display: "none"}}
                        id="avatar-upload"
                        onChange={handleAvatarChange}
                        disabled={avatarPreview}
                    />
                    <label
                        htmlFor="avatar-upload"
                        style={{width: "100%", height: "100%", borderRadius: "50%"}}
                    >
                        {!avatarPreview && (
                            <AddIcon
                                sx={{
                                    fontSize: 42,
                                    color: "#bbb",
                                    alignItems: "center",
                                    marginTop: "12px",

                                }}
                            />
                        )}
                        {avatarPreview && (<>
                                <Box
                                    component="img"
                                    src={avatarPreview}
                                    alt="Avatar Preview"
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        borderRadius: "6px"
                                    }}
                                />
                                {avatarLoading &&
                                    <CircularProgress size={50} sx={{top: 10, left: 10, position: "absolute"}}/>
                                }
                            </>
                        )}


                    </label>

                    {avatarPreview && !avatarLoading && (
                        <IconButton
                            aria-label="close"
                            size="small"
                            onClick={handleDeleteAvatar}

                            sx={{
                                position: "absolute",
                                top: 3,
                                right: 3,
                                width: "15px",
                                height: "15px",
                                backgroundColor: "rgba(151,151,151,0.77)",
                                "&:hover": {
                                    backgroundColor: "rgba(244, 67, 54, 0.3)",
                                },
                            }}
                        >
                            <CloseIcon sx={{fontSize: "17px"}}/>
                        </IconButton>
                    )}
                </Box>
            </Box>

            <FormHelperText
                error={avatarError}
                sx={{
                    mt: 1,
                    color: avatarError ? 'error.main' : 'text.secondary',
                }}
            >
                {avatarErrorMessage}
            </FormHelperText>

        </FormControl>
    )
}