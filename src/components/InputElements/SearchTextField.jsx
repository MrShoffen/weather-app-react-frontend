import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import {getAutofilledCities} from "../../services/SendNameForAutofill.js";
import {Autocomplete} from "@mui/lab";

function sleep(duration) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, duration);
    });
}

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
                borderRadius: 3,
                border: "1px solid",
                borderColor: isDarkMode ? "rgba(210,210,210,0.65)" : "rgba(47,155,255,0.53)", // полупрозрачный фон
            }}
        >

            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
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

            {/*<TextField*/}
            {/*    variant='outlined'*/}
            {/*    placeholder="Search Locations"*/}
            {/*    value={locationName}*/}
            {/*    onChange={event => {*/}
            {/*        onChange(event);*/}

            {/*    }*/}
            {/*    }*/}
            {/*    onKeyDown={(event) => {*/}
            {/*        if (loading) {*/}
            {/*            event.preventDefault();*/}
            {/*            return;*/}
            {/*        }*/}
            {/*        if (event.key === 'Enter') {*/}
            {/*            event.preventDefault();*/}
            {/*            handleSubmit();*/}
            {/*        }*/}
            {/*    }} // Обработка Enter*/}

            {/*    error={errors}*/}
            {/*    helperText={errors}*/}

            {/*    sx={{*/}
            {/*        ml: 1,*/}
            {/*        flex: 1,*/}
            {/*        position: "absolute",*/}
            {/*        width: "85%",*/}
            {/*        top: 0,*/}
            {/*        left: 0,*/}
            {/*        '& input:-webkit-autofill': {*/}
            {/*            WebkitBoxShadow: 'none', // Заменяем фон*/}
            {/*            WebkitTextFillColor: isDarkMode ? 'white' : 'black', // Цвет текста*/}
            {/*            transition: 'background-color 5000s ease-in-out 0s', // Убираем голубой переход*/}
            {/*        },*/}
            {/*        '& .MuiOutlinedInput-root': {*/}
            {/*            '& fieldset': {*/}
            {/*                border: 'none', // Убираем границы*/}
            {/*            },*/}
            {/*        },*/}
            {/*    }}*/}
            {/*/>*/}
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

const topFilms = [
    {title: 'The Shawshank Redemption', year: 1994},
    {title: 'The Godfather', year: 1972},
    {title: 'The Godfather: Part II', year: 1974},
    {title: 'The Dark Knight', year: 2008},
    {title: '12 Angry Men', year: 1957},
    {title: "Schindler's List", year: 1993},
    {title: 'Pulp Fiction', year: 1994},
    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    {title: 'The Good, the Bad and the Ugly', year: 1966},
    {title: 'Fight Club', year: 1999},
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    {title: 'Forrest Gump', year: 1994},
    {title: 'Inception', year: 2010},
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    {title: "One Flew Over the Cuckoo's Nest", year: 1975},
    {title: 'Goodfellas', year: 1990},
    {title: 'The Matrix', year: 1999},
    {title: 'Seven Samurai', year: 1954},
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    {title: 'City of God', year: 2002},
    {title: 'Se7en', year: 1995},
    {title: 'The Silence of the Lambs', year: 1991},
    {title: "It's a Wonderful Life", year: 1946},
    {title: 'Life Is Beautiful', year: 1997},
    {title: 'The Usual Suspects', year: 1995},
    {title: 'Léon: The Professional', year: 1994},
    {title: 'Spirited Away', year: 2001},
    {title: 'Saving Private Ryan', year: 1998},
    {title: 'Once Upon a Time in the West', year: 1968},
    {title: 'American History X', year: 1998},
    {title: 'Interstellar', year: 2014},
];