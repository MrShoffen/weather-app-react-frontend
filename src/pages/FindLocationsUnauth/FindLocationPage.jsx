import React, {useState} from 'react';
import './FindLocationPage.css'
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import LocationCard from "../../components/FindLocationCard/LocationCard.jsx";
import {sendFindLocations} from "../../services/fetch/unauth/SendFindLocations.js";
import LoadingLocationCard from "../../components/FindLocationCard/LoadingLocationCard.jsx";
import SearchTextField from "../../components/InputElements/SearchTextField.jsx";
import Typography from "@mui/material/Typography";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import thunderstorm from "../../assets/img/weather-state/thunderstorms.svg";
import ClearLocationBadge from "../../components/InputElements/ClearLocationBadge/ClearLocationBadge.jsx";


function FindLocationPage() {

    const [currentLocationName, setCurrentLocationName] = useState('');
    const [locationNameForSearch, setLocationNameForSearch] = useState('');

    const [errors, setErrors] = useState('');
    const [loading, setLoading] = useState(false);

    const [foundLocations, setFoundLocations] = useState([]);

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
                    break;
                default:
                    console.log('Unknown error occurred! ');
                    window.location.reload();
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

    return (
        <Container disableGutters className={"locationUnauthPage"}>

            <Typography sx={{fontSize: 28, fontWeight: 500, mb: 2}}>Locations</Typography>


            <SearchTextField
                locationName={currentLocationName}
                setLocationName={setCurrentLocationName}
                handleSubmit={handleLocationSearch}
                onChange={handleInputChange}
                errors={errors}
                loading={loading}/>

            {locationNameForSearch && (
                <ClearLocationBadge
                    handleReset={handleReset}
                    locationNameForSearch={locationNameForSearch}
                />
            )}


            <Box
                sx={{
                    mt: 7,
                    pl: 2,
                    pr: 2,
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
            }}> first first first first first first first first first first first first first first first first
                first
                first first first fi rst fir ааfi fi fi fi а rst first fir st fir st first first first
            </div>
        </Container>
    );
}

export default FindLocationPage;