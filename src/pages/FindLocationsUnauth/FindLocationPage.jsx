import React, {useState} from 'react';
import './FindLocationPage.css'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LocationCard from "../../components/FindLocationCard/LocationCard.jsx";
import {sendFindLocations} from "../../services/fetch/unauth/SendFindLocations.js";
import LoadingLocationCard from "../../components/FindLocationCard/LoadingLocationCard.jsx";
import SearchTextField from "../../components/InputElements/SearchLocationField/SearchTextField.jsx";
import Typography from "@mui/material/Typography";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import thunderstorm from "../../assets/img/weather-state/thunderstorms.svg";
import ClearLocationBadge from "../../components/InputElements/SearchLocationField/ClearLocationBadge.jsx";
import {Paper} from "@mui/material";
import {useCustomThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx";


function FindLocationPage() {

    const [currentLocationName, setCurrentLocationName] = useState('');
    const [locationNameForSearch, setLocationNameForSearch] = useState('');

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [foundLocations, setFoundLocations] = useState([]);

    const {showWarn} = useNotification();

    const handleLocationSearch = async () => {
        if (!currentLocationName) {
            setErrors("Field can't be empty");
            return;
        }

        if (currentLocationName && currentLocationName.length > 20) {
            setErrors('Length is above 20 characters.')
            return;
        }
        setLoading(true);

        setFoundLocations([]);

        try {
            const promise = await sendFindLocations(currentLocationName);
            setFoundLocations(promise);
        } catch (error) {
            switch (true) {
                case error instanceof WeatherApiException:
                    handleReset();
                    setErrors(error.message);
                    showWarn('Failed to retrieve locations');
                    break;
                default:
                    showWarn('Unknown error occurred! ');
            }
        }

        setLocationNameForSearch(currentLocationName);

        setTimeout(() => setLoading(false), 500)
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

    const {isScrolled, isVisible} = useCustomThemeContext();


    return (
        <Container disableGutters className={"locationUnauthPage"}>

            <Box className="homeContainer"
                   // elevation={isScrolled ? 3 : 0}
                   sx={{
                       position: 'fixed',
                       borderRadius: 0,
                       left: 0,
                       top: 0,
                       zIndex: 2,

                       paddingTop: '70px',
                       backgroundColor: 'background.default',
                       width: '100%',
                       transform: isVisible ? "translateY(0)" : "translateY(-60px)",
                       transition: "transform 0.3s linear",
                   }}>
                <Typography
                    sx={{fontSize: 28, fontWeight: 500}}>Locations
                </Typography>

                <Container disableGutters>


                    <SearchTextField
                        locationName={currentLocationName}
                        setLocationName={setCurrentLocationName}
                        handleSubmit={handleLocationSearch}
                        onChange={handleInputChange}
                        errors={errors}
                        loading={loading}/>

                    {locationNameForSearch && (
                        <Box position="relative" top={-119} right={0}>
                            <ClearLocationBadge
                                handleReset={handleReset}
                                locationNameForSearch={locationNameForSearch}
                            />
                        </Box>
                    )}

                </Container>


            </Box>


            <Box
                sx={{
                    mt: 7,
                    pl: 2,
                    pr: 2,
                    pt: 13,
                    width: '100%',
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(328px, 100%), 1fr))',
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
                userSelect: "none",
            }}> first first first first first first first first first first first first first first first first
                first
                first first first fi rst fir ааfi fi fi fi а а а а а а а
                а а а а а а а а а а а rst first fir st fir st first first first
            </div>
        </Container>
    );
}

export default FindLocationPage;