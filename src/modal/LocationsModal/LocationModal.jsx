import React, {useState} from "react";
import {Box, Modal, Typography} from "@mui/material";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import InformationBadge from "../../components/InformationBadge/InformationBadge.jsx";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import SearchTextField from "../../components/InputElements/SearchTextField.jsx";
import {sendFindLocations} from "../../services/fetch/SendFindLocations.js";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import ClearLocationBadge from "../../components/InputElements/ClearLocationBadge/ClearLocationBadge.jsx";
import LoadingLocationCard from "../../components/LocationCard/LoadingLocationCard.jsx";
import LocationCard from "../../components/LocationCard/LocationCard.jsx";
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

    const {auth} = useAuth();

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

        if (currentLocationName && currentLocationName.length > 20) {
            setErrors('Length is above 20 characters.');
            return;
        }

        setLoading(true);
        setFoundLocations([]);

        try {
            const promise = await sendFindLocations(currentLocationName);
            setFoundLocations(promise);

            // Прокрутите к началу
            const scrollableBox = document.getElementById('scrollable-box');
            if (scrollableBox) {
                scrollableBox.scrollTop = 0; // Прокручиваем вверх
            }
        } catch (error) {
            switch (true) {
                case error instanceof WeatherApiException:
                    handleReset();
                    setErrors(error.message);
                    break;
                default:
                    alert('Unknown error occurred! ');
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


    const [successMessage, setSuccessMessage] = React.useState('');


    if (auth.isAuthenticated) {
        return (
            <Modal
                open={open}
                onClose={() => {
                    onClose();
                    setSuccessMessage("");
                    handleReset();
                }}
            >

                <Card variant="outlined">
                    <IconButton
                        aria-label="close"
                        size="small"
                        onClick={() => {
                            onClose();
                            setSuccessMessage("");
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

                    <Typography
                        component="h1"
                        variant="h4"
                        sx={{
                            textAlign: 'center',
                            width: '100%',
                            fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                            p: 1.5,
                        }}
                    >
                        Find Locations
                    </Typography>

                    <InformationBadge message={successMessage} type="info"/>

                    {/* Фиксированный верхний блок */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '100%',
                            position: 'sticky',
                            top: 0,
                            zIndex: 2, // Устанавливаем элемент поверх прокручиваемой части
                        }}
                    >
                        <SearchTextField
                            locationName={currentLocationName}
                            setLocationName={setCurrentLocationName}
                            handleSubmit={handleSubmit}
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


                    {/* Прокручиваемая часть */}
                    <Box
                        id="scrollable-box" // Добавьте идентификатор
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            flexGrow: 1,
                            overflowY: 'auto', // Включаем вертикальный скролл
                            maxHeight: '80vh', // Ограничиваем максимальную высоту прокрутки
                            paddingLeft: 2, // Визуальный отступ для содержимого внутри
                            paddingRight: 2, // Визуальный отступ для содержимого внутри
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
                    </Box>
                </Card>
            </Modal>
        );
    }
};