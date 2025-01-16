import {Button, Card, CardActions, CardContent, CardMedia, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {hasFlag} from 'country-flag-icons'
import {useEffect, useRef, useState} from "react";
import WeatherCard from "./WeatherCard.jsx";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ToFavoriteButton from "./ToFavoriteButton.jsx";



export default function LocationCard({location, alreadySavedLocations, setAlreadySavedLocations}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const {auth} = useAuth();


    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    countries.registerLocale(enLocale);

    const [isSaved, setIsSaved] = useState(false);

    const favoriteButton = <ToFavoriteButton location={location}
                                             isSaved={isSaved}
                                             setIsSaved={setIsSaved}
                                             alreadySavedLocations={alreadySavedLocations}
                                             setAlreadySavedLocations={setAlreadySavedLocations}
    />

    return (
        <div
            style={{
                perspective: "1000px", // Перспектива для 3D-эффекта
                display: "inline-block",
            }}
        >
            <div
                style={{
                    minWidth: "290px",
                    minHeight: 230,
                    maxHeight: 230,
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.4s ease-in-out",
                    transform: isFlipped ? "rotateY(180deg)" : "rotateY(0)",
                }}
            >

                <Card
                    elevation={3}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden", // Скрыть обратную сторону при фронтальной видимости
                    }}
                >
                    <CardContent sx={{textAlign: "left", fontSize: 16}}>
                        <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{
                                display: "flex",
                                alignItems: "center",
                            }}
                        >
                            {location.name}
                            <img
                                alt={location.country}
                                src={
                                    "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                                    location.country +
                                    ".svg"
                                }
                                width="30"
                                style={{marginLeft: "8px"}}
                            />
                        </Typography>

                        <Typography variant="body2" sx={{fontSize: 16}}>
                            Country: <span style={{fontWeight: 500}}>{countries.getName(location.country, "en")}</span>
                        </Typography>

                        <Typography variant="body2" sx={{fontSize: 16}}>
                            State: <span style={{fontWeight: 500}}>{location.state}</span>
                        </Typography>

                        <Divider sx={{mt: 1, mb: 1}}/>

                        <Typography
                            variant="body2"
                            sx={{fontSize: 16, color: "text.secondary"}}
                        >
                            Latitude: <span style={{fontWeight: 500}}>{location.lat}</span>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{fontSize: 16, color: "text.secondary"}}
                        >
                            Longitude: <span style={{fontWeight: 500}}>{location.lon}</span>
                        </Typography>
                    </CardContent>

                    <Button size="small" onClick={handleFlip}
                            style={{
                                position: 'absolute',
                                bottom: 11,
                                left: 8.1,
                            }}>
                        show weather
                    </Button>

                    {auth.isAuthenticated && favoriteButton}

                </Card>

                {/* Обратная сторона карточки */}
                <WeatherCard
                    location={location}
                    handleFlip={handleFlip}
                    flipped={isFlipped}
                    auth={auth}
                    favoriteButton={favoriteButton}
                />
            </div>
        </div>
    );
}