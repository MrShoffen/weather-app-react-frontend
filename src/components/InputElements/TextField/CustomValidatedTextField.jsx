import {styled} from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {IconButton, InputAdornment} from "@mui/material";
import {Image, Visibility, VisibilityOff} from "@mui/icons-material";


export default function CustomValidatedTextField({
                                                     id,
                                                     label,
                                                     value,
                                                     onChange,
                                                     error,
                                                     helperText,
                                                     placeholder,
                                                     autoComplete

                                                 }) {
    const [showPassword, setShowPassword] = React.useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const StyledFormLabel = styled(FormLabel)(({theme}) => ({
        position: "absolute",
        left: theme.spacing(1.5),
        top: 0,
        transform: "translateY(-50%)",
        backgroundColor: theme.palette.background.default,
        padding: "0 4px",
        zIndex: 1,
    }));

    return (
        <FormControl variant='outlined' style={{marginBottom: 25}}>
            <StyledFormLabel htmlFor={id}>{label}</StyledFormLabel>
            <TextField
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                error={error}
                helperText={helperText}
                placeholder={placeholder}
                autoComplete={autoComplete}
                variant='outlined'

                type={!id.startsWith("password") ? 'text' : (showPassword ? "text" : "password")}
                slotProps={id.startsWith("password") ?
                    {
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={handlePasswordVisibility}
                                        edge="end"
                                        aria-label="toggle password visibility"
                                    >
                                        {showPassword ? <Visibility/> : <VisibilityOff/>}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }
                    : null}
            />
        </FormControl>
    );
};
