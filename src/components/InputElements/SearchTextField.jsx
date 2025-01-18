import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import {getAutofilledCities} from "../../services/fetch/unauth/SendNameForAutofill.js";
import {Autocomplete} from "@mui/material";

export default function SearchTextField({locationName, setLocationName, onChange, handleSubmit, errors, loading}) {
    const {isDarkMode} = useThemeContext();

    const [options, setOptions] = React.useState([]);

    const changeAutofillCities = async event => {
        const value = event.target.value;
        if (!value || value.length < 3) {
            setOptions([]);
            return;
        }
        const citiesJson = await getAutofilledCities(value);
        setOptions(citiesJson);

    }


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
                borderRadius: '8px',
                border: "1px solid",
                borderColor: isDarkMode ? "rgba(210,210,210,0.65)" : "rgba(47,155,255,0.53)", // полупрозрачный фон
            }}
        >

            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                filterOptions={(x) => x}
                onChange={(event, newValue) => {
                    // Обработка выбора значения
                    setLocationName(newValue || ""); // Если пусто, то передаётся пустая строка
                    setOptions([]);
                }}
                value={locationName}


// Обработка Enter

                options={options.map((option) => option.cityName)}
                renderInput={(params) => (
                    <TextField
                        {...params}

                        variant='outlined'
                        placeholder="Search Locations"
                        value={locationName}
                        onChange={(event) => {
                            onChange(event); // Пользовательский обработчик
                            setLocationName(event.target.value); // Сохранить значение в состоянии
                            changeAutofillCities(event); // Обновление опций
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && loading) {
                                event.preventDefault();
                                return;
                            }
                            if (event.key === "Enter" && options.length === 0) {
                                event.preventDefault();
                                setLocationName(event.target.value); // Сохранить значение в состоянии
                                event.target.blur();
                                handleSubmit();
                            }

                            if (event.key === "Enter" ) {
                                event.preventDefault();
                                setOptions([]);

                            }
                        }} // Обработка Enter

                        error={errors}
                        helperText={errors}

                        sx={{
                            ml: 1,
                            flex: 1,
                            position: "absolute",
                            width: "85%",
                            top: 0,
                            left: 0,
                            '& input:-webkit-autofill': {
                                WebkitBoxShadow: 'none', // Заменяем фон
                                WebkitTextFillColor: isDarkMode ? 'white' : 'black', // Цвет текста
                                transition: 'background-color 5000s ease-in-out 0s', // Убираем голубой переход
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none', // Убираем границы
                                },
                            },
                        }}
                    />
                )}
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
                disabled={loading}
                aria-label="search"
                onClick={handleSubmit}
            >
                <SearchIcon/>
            </IconButton>
        </Box>
    )
}