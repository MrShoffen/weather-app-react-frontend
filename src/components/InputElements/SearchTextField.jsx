import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import LoadingLocationCard from "../LocationCard/LoadingLocationCard.jsx";
import LocationCard from "../LocationCard/LocationCard.jsx";
import React from "react";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";


export default function SearchTextField({locationName,onChange, handleSubmit, errors}){

    const {isDarkMode} = useThemeContext();


    return (
        <Box
            component="form"

            sx={{
                position: "relative",
                ml: 1,
                mr: 1,
                height: '60px',
                display: 'flex',
                alignItems: 'center',
                borderRadius: 3,
                border: "1px solid",
                borderColor: isDarkMode ? "rgba(210,210,210,0.65)" : "rgba(47,155,255,0.53)", // полупрозрачный фон
            }}
        >
            <TextField
                variant='outlined'
                placeholder="Search Locations"
                value={locationName}
                onChange={onChange}
                onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                        event.preventDefault(); // предотвращение стандартного поведения Enter (если нужно)
                        handleSubmit();
                    }
                }} // Обработка Enter

                error={errors}
                helperText={errors}
                helpe
                sx={{
                    ml: 1,
                    flex: 1,
                    position: "absolute",
                    width: "85%",
                    top: 0,
                    left: 0,
                    '& input:-webkit-autofill': {
                        WebkitBoxShadow: 'none', // Заменяем фон
                        WebkitTextFillColor:  isDarkMode ?  'white': 'black', // Цвет текста
                        transition: 'background-color 5000s ease-in-out 0s', // Убираем голубой переход
                    },
                    '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                            border: 'none', // Убираем границы
                        },
                    },
                }}
            />
            <Divider sx={{
                height: 40,
                m: 0.5,
                position: "absolute",
                top: 6,
                right: 50,

            }} orientation="vertical"/>

            <IconButton
                sx={{
                    p: '10px',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    outline: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent', // Отключаем фон при наведении
                        transform: 'scale(1.1)',
                    },
                    '&:active': {
                        backgroundColor: 'transparent', // Убираем нажимание
                    },
                    '&:focus': {
                        outline: 'none', // Убираем фокус

                    },

                }}
                aria-label="search"
                onClick={handleSubmit}
            >
                <SearchIcon/>
            </IconButton>
        </Box>
    )
}