import React, {useState} from "react";
import {Box, Modal, Slide, Typography} from "@mui/material";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchTextField from "../../components/InputElements/SearchLocationField/SearchTextField.jsx";
import {sendFindLocations} from "../../services/fetch/unauth/SendFindLocations.js";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import ClearLocationBadge from "../../components/InputElements/SearchLocationField/ClearLocationBadge.jsx";
import LoadingLocationCard from "../../components/FindLocationCard/LoadingLocationCard.jsx";
import LocationCard from "../../components/FindLocationCard/LocationCard.jsx";
import thunderstorm from "../../assets/img/weather-state/thunderstorms.svg";


const Card = styled(MuiCard)(({theme}) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '90%',
    maxWidth: '90%',
    margin: 'auto',
    minHeight: '500px',
    maxHeight: '80%',
    position: "absolute",
    top: "70px",
    left: "50%",
    backgroundColor: "background.paper",
    transform: "translate(-50%, 0%)",
    boxShadow: 24,
    borderRadius: "8px",
    [theme.breakpoints.up('sm')]: {
        width: '550px',
        maxWidth: '550px',
    },
    [theme.breakpoints.up('md')]: {
        width: '800px',
        maxWidth: '800px',
    },
    [theme.breakpoints.up('lg')]: {
        width: '1150px',
        maxWidth: '1150px',
        minHeight: '700px',

    },

}));


export default function LocationModal({open, onClose}) {

    const {auth} = useAuthContext();

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

        if (currentLocationName && currentLocationName.length <2) {
            setErrors("Length must be at least 2 characters");
            return;
        }

        if (currentLocationName && currentLocationName.length > 20) {
            setErrors('Length is above 20 characters.');
            return;
        }

        setLoading(true);
        setFoundLocations([]);

        try {
            const firstChunk = await sendFindLocations(currentLocationName);
            const secondName = currentLocationName.substring(0,currentLocationName.length-1);
            const secondChunk = await sendFindLocations(secondName);

            const mergedLocations = [...firstChunk, ...secondChunk];
            const uniqueLocations = mergedLocations.filter((location, index, self) =>
                index === self.findIndex((loc) => loc.lat === location.lat && loc.lon === location.lon) // Условие уникальности по `id`
            );

            setFoundLocations(uniqueLocations);

            const scrollableBox = document.getElementById('scrollable-box');
            if (scrollableBox) {
                scrollableBox.scrollTop = 0;
            }
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

        setTimeout(() => setLoading(false), 500);
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

    if (auth.isAuthenticated) {
        return (
            <Modal
                open={open}
                onClose={() => {
                    onClose();
                    handleReset();
                }}
            >

                <Slide in={open} direction={'up'}
                       style={{
                           position: "relative",
                           transform: "translate(50%,50%) 0.5s",
                           left: "0%",
                       }}
                >

                    <Card variant="outlined"
                          sx={{
                              boxShadow: 24,
                              transform: "translate(50%,50%)",

                          }}
                    >

                        <IconButton
                            aria-label="close"
                            size="small"
                            onClick={() => {
                                onClose();
                                handleReset();
                            }}

                            sx={{
                                position: 'absolute',
                                top: 5,
                                right: 5,
                                width: '25px',
                                height: '25px',
                            }}
                        >
                            <CloseIcon sx={{fontSize: '25px'}}/>
                        </IconButton>

                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                width: '100%',
                                position: 'sticky',
                                marginTop: 4,
                                zIndex: 2,
                            }}
                        >
                            <SearchTextField
                                locationName={currentLocationName}
                                setLocationName={setCurrentLocationName}
                                handleSubmit={handleLocationSearch}
                                onChange={handleInputChange}
                                errors={errors}
                                loading={loading}/>

                            {locationNameForSearch && (
                                <Box position="absolute" top={-59} right={2}>
                                    <ClearLocationBadge
                                        handleReset={handleReset}
                                        locationNameForSearch={locationNameForSearch}
                                    />
                                </Box>
                            )}
                        </Box>

                        <Box
                            id="scrollable-box"
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                flexGrow: 1,
                                overflowY: 'auto',
                                maxHeight: '80vh',
                                paddingLeft: 2,
                                paddingRight: 2,
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(auto-fill, minmax(min(300px, 100%), 1fr))',
                                    gap: 2,
                                    paddingBottom: 2,
                                    paddingTop: 2,
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
                                            foundLocations.map(location =>
                                                <LocationCard location={location}/>
                                            )
                                        ) : (
                                            locationNameForSearch &&
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

                                        )
                                    )
                                }
                            </Box>
                        </Box>
                    </Card>
                </Slide>
            </Modal>
        );
    }
};