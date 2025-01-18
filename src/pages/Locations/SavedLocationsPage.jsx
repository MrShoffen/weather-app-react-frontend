import React, {useEffect, useState} from 'react';
import './LocationPage.css'
import SearchButton from "../../components/SearchButton/SearchButton.jsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {sendGetLocationsAndWeather} from "../../services/fetch/auth/SendGetLocationsAndWeather.js";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import LocationWeatherCard from "../../components/LocationWeatherCard/LocationWeatherCard.jsx";
import LocationModal from "../../modal/LocationsModal/LocationModal.jsx";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import {sendGetSavedLocations} from "../../services/fetch/auth/SendGetSavedLocations.js";
import {locationListUpdated} from "../../services/util/LocationsUtil.jsx";
import LoadingLocationCard from "../../components/FindLocationCard/LoadingLocationCard.jsx";
import {sendDeleteSavedLocations} from "../../services/fetch/auth/SendDeleteSavedLocations.js";

function SavedLocationsPage() {
    const [loading, setLoading] = useState(false);

    const {savedLocations, setSavedLocations} = useAuthContext();

    const getSavedLocations = async () => {
        try {
            const locationsFromServer = await sendGetSavedLocations();

            if (locationListUpdated(savedLocations, locationsFromServer)) {
                setLoading(true);
                const locationsAndWeather = await sendGetLocationsAndWeather();
                setSavedLocations(locationsAndWeather);
            }


        } catch (error) {
            switch (true) {
                case error instanceof WeatherApiException:
                    console.log(error.message);
                    break;
                default:
                    console.log('Unknown error occurred! ');

            }
        }
        setLoading(false);

    };

    useEffect(() => {
        getSavedLocations();
    }, [])


    const [isLocationModalOpen, setLocationModalOpen] = useState(false);
    const handleCloseLocationModal = () => {
        setLocationModalOpen(false);
    };

    const handleOpenLocationModal = async () => {
        const locationsFromServer = await sendGetSavedLocations();

        if (locationListUpdated(savedLocations, locationsFromServer)) {
            const locationsAndWeather = await sendGetLocationsAndWeather();
            setSavedLocations(locationsAndWeather);
        }
        setLocationModalOpen(true);
    }


    const [deletingLocations, setDeletingLocations] = useState([]); // Хранение удаляемых локаций

    const handleDelete = (locationId) => {
        setDeletingLocations((prev) => [...prev, locationId]);
        console.log(locationId);

        try {
            sendDeleteSavedLocations(locationId);
        } catch (error) {
            switch (true) {
                case error instanceof WeatherApiException:
                    break;
                default:
                    console.log('Unknown error occurred! ');

            }
        }

        // Удалить карту с задержкой после анимации
        setTimeout(() => {

            const updatedLocations = savedLocations.filter((item) => item.location.id !== locationId);
            console.log(updatedLocations);
            setSavedLocations(updatedLocations);

            setDeletingLocations((prev) =>
                prev.filter((id) => id !== locationId)
            );
        }, 500); // Время соответствует длительности анимации
    };

    return (
        <>
            <Container disableGutters>

                <SearchButton
                    onClick={!isLocationModalOpen && handleOpenLocationModal}
                />


                <div className="homeContainer">
                    <Typography sx={{fontSize: 28, fontWeight: 500, mt: '75px', mb: '30px'}}>Saved
                        Locations</Typography>
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

                    {loading ? (
                            <>
                                <LoadingLocationCard/>
                                <LoadingLocationCard/>
                                <LoadingLocationCard/>
                                <LoadingLocationCard/>
                            </>
                        )
                        :
                        (
                            savedLocations.length > 0
                            &&
                            savedLocations.map((locAndWeath) => (

                                <LocationWeatherCard
                                    locationAndWeather={locAndWeath}
                                    onDelete={handleDelete}
                                    isDeleting={deletingLocations.includes(locAndWeath.location.id)}
                                />
                            ))
                        )
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
                           alreadySavedLocations={savedLocations}
                           setAlreadySavedLocations={setSavedLocations}
            />
        </>
    )
}

export default SavedLocationsPage;