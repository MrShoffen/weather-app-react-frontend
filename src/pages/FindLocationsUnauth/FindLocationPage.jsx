import React, {useState} from 'react';
import './FindLocationPage.css'
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import LocationCard from "../../components/LocationCard/LocationCard.jsx";
import {sendFindLocations} from "../../services/SendFindLocations.js";
import LoadingLocationCard from "../../components/LocationCard/LoadingLocationCard.jsx";
import SearchTextField from "../../components/InputElements/SearchTextField.jsx";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import thunderstorm from "../../assets/img/weather-state/thunderstorms.svg";


function FindLocationPage() {
    const {isDarkMode, isSmallScreen} = useThemeContext();

    const [currentLocationName, setCurrentLocationName] = useState('');
    const [locationNameForSearch, setLocationNameForSearch] = useState('');

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [foundLocations, setFoundLocations] = useState([]);

    const handleSubmit = async () => {

        if (!currentLocationName) {
            setErrors("Field can't be empty");
            return;
        }
        setLoading(true);
        console.log(foundLocations);


        try {
            const promise = await sendFindLocations(currentLocationName);
            console.log(promise);
            setFoundLocations(promise);
        } catch (error) {
            switch (true) {
                case error instanceof WeatherApiException:
                    setErrors(error.message);
                    break;
                default:
                    alert('Unknown error occurred! ');
                    window.location.reload();
            }
        }

        setLocationNameForSearch(currentLocationName);

        setTimeout(() => setLoading(false), 500)
        console.log('-----------------------');
    };

    const handleInputChange = event => {
        setErrors('');
        setCurrentLocationName(event.target.value);
    }

    const handleReset = () => {
        setCurrentLocationName('');
        setLocationNameForSearch('');
        setFoundLocations([]);
        setErrors('');
    };


    return (
        <Container disableGutters className={"locationUnauthPage"}>

                <Typography sx={{fontSize: 28, fontWeight: 500, mb: 2}}>Locations</Typography>


            <SearchTextField
                locationName={currentLocationName}
                handleSubmit={handleSubmit}
                onChange={handleInputChange}
                errors={errors}/>

            {locationNameForSearch && (
                <Box className={"locationDeleteBadge"}
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        width: '150px',
                        height: '40px',
                        justifyContent: 'space-between',
                        mt: 2,
                        p: 1,
                        backgroundColor: isDarkMode ? '#424242' : '#f5f5f5',
                        borderRadius: 1,
                        position: 'absolute', // Абсолютное позиционирование
                        right: '16px', // Отступ от правого края Container
                        top: '110px',
                        maxWidth: '150px', // Ограничиваем максимальную ширину Box
                        overflow: 'hidden', // Скрываем содержимое за пределами Box
                        border: '1px solid',
                        borderColor: isDarkMode ? "rgba(210,210,210,0.65)" : "rgba(47,155,255,0.53)", // полупрозрачный фон

                    }}
                >
                    <Typography
                        sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            mr: 1,
                            whiteSpace: 'nowrap',       // Запрещаем тексту переноситься на следующую строку
                            overflow: 'hidden',        // Скрываем текст, выходящий за пределы контейнера
                            textOverflow: 'ellipsis',  // Добавляем многоточие для длинного текста
                            maxWidth: '100%',          // Ограничиваем ширину текста до размеров родителя (Box)
                        }}
                    >
                        {locationNameForSearch}
                    </Typography>
                    <IconButton size="small" onClick={handleReset}
                                sx={{
                                    mr: -1.5,
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
                    }}>
                        <CloseIcon fontSize="small"/>
                    </IconButton>
                </Box>
            )}


            <Box
                sx={{
                    mt: 7,
                    pl: 2,
                    pr: 2,
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                    gap: 2,
                }}
            >

                {
                    loading ? (
                        <>
                            <LoadingLocationCard/>
                            <LoadingLocationCard/>
                            <LoadingLocationCard/>
                            <LoadingLocationCard/>
                        </>
                    ) : (
                        foundLocations.length > 0 ? (
                            foundLocations.map(location => <LocationCard location={location}/>)
                        ) : (
                            locationNameForSearch ?
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        left: '50%',
                                        transform: "translateX(-50%)"
                                    }}>
                                    <Typography sx={{
                                        fontSize: 28,
                                        fontWeight: 500,

                                    }}>Location Not Found</Typography>
                                    <img src={thunderstorm} alt style={{width: "80%", mt: 5}}/>
                                </Box>
                                :
                                null
                        )
                    )
                }

            </Box>


            <div style={{
                color: "rgba(0,0,0,0)",
            }}> first first first first first first first first first first first first first first first first
                first
                first first first fi rst first fi rst first fir st fir st first first first
            </div>
        </Container>
    );
}

export default FindLocationPage;