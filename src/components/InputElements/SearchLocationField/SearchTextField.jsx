import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import {Divider} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import React from "react";
import {useCustomThemeContext} from "../../../context/CustomTheme/CustomThemeContext.jsx";
import {getAutofilledCities} from "../../../services/fetch/unauth/SendNameForAutofill.js";
import {Autocomplete} from "@mui/material";

export default function SearchTextField({locationName, setLocationName, onChange, handleSubmit, errors, loading}) {
    const [autofillOptions, setAutofillOptions] = React.useState([]);

    const changeAutofillCities = async event => {
        const value = event.target.value;
        if (!value || value.length < 3) {
            setAutofillOptions([]);
            return;
        }
        const citiesJson = await getAutofilledCities(value);
        setAutofillOptions(citiesJson);
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
                borderColor: 'text.disabled'
            }}
        >

            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                disableClearable
                filterOptions={(x) => x}
                onChange={(event, newValue) => {
                    setLocationName(newValue || "");
                    setAutofillOptions([]);
                }}
                value={locationName}


                options={autofillOptions.map((option) => option.cityName)}
                renderInput={(params) => (
                    <TextField
                        {...params}

                        variant='outlined'
                        placeholder="Search Locations"
                        value={locationName}
                        onChange={(event) => {
                            onChange(event);
                            setLocationName(event.target.value);
                            changeAutofillCities(event);
                        }}
                        onKeyDown={(event) => {
                            if (event.key === "Enter" && loading) {
                                event.preventDefault();
                                return;
                            }
                            if (event.key === "Enter" && autofillOptions.length === 0) {
                                event.preventDefault();
                                setLocationName(event.target.value);
                                event.target.blur();
                                handleSubmit();
                            }

                            if (event.key === "Enter") {
                                event.preventDefault();
                                setAutofillOptions([]);

                            }
                        }}

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
                                WebkitBoxShadow: 'none',
                                WebkitTextFillColor: 'background.default',
                                transition: 'background-color 5000s ease-in-out 0s',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    border: 'none',
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

                    position: "absolute",
                    top: -4,
                    right: -4,
                    outline: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent',
                        transform: 'scale(1.1)',
                    },
                    '&:active': {
                        backgroundColor: 'transparent',
                    },
                    '&:focus': {
                        outline: 'none',

                    },

                }}
                disabled={loading}
                aria-label="search"
                onClick={handleSubmit}
            >
                <SearchIcon sx={{fontSize: '32px'}}/>
            </IconButton>
        </Box>
    )
}