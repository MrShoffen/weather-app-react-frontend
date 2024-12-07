import {styled} from "@mui/material/styles";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import * as React from "react";
import {CSSTransition} from "react-transition-group";
import {IconButton, InputAdornment} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import './CustomTextField.css'


const CustomAnimatedTextField = ({
                             animatePopupCondition = true,
                             id,
                             label,
                             value,
                             onChange,
                             error,
                             helperText,
                             placeholder,
                             autoComplete,
                             type

                         }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const handlePasswordVisibility = () => {
        setShowPassword((prev) => !prev); // Переключение состояния видимости пароля
    };

    const StyledFormLabel = styled(FormLabel)(({theme}) => ({
        position: "absolute", // Для размещения поверх TextField
        left: theme.spacing(1.5), // Смещение влево
        top: 0, // Начальная позиция чуть выше TextField
        transform: "translateY(-50%)", // Поднимаем label вверх
        backgroundColor: theme.palette.background.default, // Задаём фон для перекрытия границы поля
        padding: "0 4px", // Добавляем padding для надписи
        zIndex: 1,
    }));

    return (

        <CSSTransition
            in={animatePopupCondition}
            timeout={300}
            classNames="fade"
            unmountOnExit
        >
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

                    type={id !== 'password' ? 'text' : (showPassword ? "text" : "password")}
                    slotProps={type === 'password' ?
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
        </CSSTransition>
    );
};

export default CustomAnimatedTextField;
