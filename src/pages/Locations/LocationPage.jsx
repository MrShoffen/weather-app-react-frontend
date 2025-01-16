import React, {useEffect, useState} from 'react';
import './LocationPage.css'
import SearchButton from "../../components/SearchButton/SearchButton.jsx";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {sendGetLocationsAndWeather} from "../../services/SengGetLocationsAndWeather.js";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import LocationWeatherCard from "../../components/LocationWeatherCard/LocationWeatherCard.jsx";
import LocationModal from "../../modal/LocationsModal/LocationModal.jsx";

function LocationPage() {
    const {isSmallScreen} = useThemeContext();

    const [loading, setLoading] = useState(false);

    const [foundLocations, setFoundLocations] = useState([]);

    const getWeather = async () => {

        setFoundLocations([]);

        try {
            const promise = await sendGetLocationsAndWeather();
            console.log(promise);
            setFoundLocations(promise);
        } catch (error) {
            switch (true) {
                case error instanceof WeatherApiException:
                    break;
                default:
                    alert('Unknown error occurred! ');

            }
        }

    };

    useEffect(() => {
        getWeather();
    }, [])


    const [isLocationModalOpen, setLocationModalOpen] = useState(false);
    const handleCloseLocationModal = () => {
        setLocationModalOpen(false);
    };

    const handleLocation = async () => {
        setLocationModalOpen(true);
    }

    return (
        <>
            <Container disableGutters>

                <SearchButton
                    onClick={!isLocationModalOpen && handleLocation}
                />


                <div className="homeContainer">
                    <Typography sx={{fontSize: 28, fontWeight: 500, mt: '75px', mb: '30px'}}>Saved
                        Locations</Typography>
                    {/* Здесь можно разместить содержимое для домашней страницы */}
                </div>

                <Box
                    sx={{
                        width: '100%',
                        pl: 2,
                        pr: 2,
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(min(328px, 100%), 1fr))',
                        gap: 2,
                        pb: 5,
                    }}
                >

                    {
                        foundLocations.length > 0 ? (
                            foundLocations.map(locAndWeath => <LocationWeatherCard locationAndWeather={locAndWeath}/>)
                        ) : null
                    }


                </Box>
                <div style={{
                    color: "rgba(0,0,0,0)",
                }}> first first first first first first first first first first first first first first first first
                    first
                    first first first fi rst fir i i i i i ааfi fi i i i i i i i i fi fi а rst first fir st fir st first
                    first first
                </div>
            </Container>
            <LocationModal onClose={handleCloseLocationModal}
                           open={isLocationModalOpen}
                           alreadySavedLocations={foundLocations}
                           setAlreadySavedLocations={setFoundLocations}
            />
        </>
    );
}

export default LocationPage;