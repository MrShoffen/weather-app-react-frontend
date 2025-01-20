import {styled} from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";


export default function ValidatedTextField({
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




    return (
        <FormControl variant='outlined' style={{marginBottom: 25, width: '100%'}}
        >
            <FormLabel htmlFor={id}
                       sx={{
                           backgroundColor: 'background.paper',
                           position: "absolute",
                           left: 10,
                           top: 0,
                           transform: "translateY(-50%)",
                           padding: "0 4px",
                           zIndex: 1,
                       }}
            >{label}</FormLabel>
            <TextField
                id={id}
                name={id}
                value={value}
                onChange={onChange}
                error={error.length !== 0}
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
