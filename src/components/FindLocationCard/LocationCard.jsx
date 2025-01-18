import {Button, Card, CardContent, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";
import WeatherCard from "./WeatherCard.jsx";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import ToFavoriteButton from "./ToFavoriteButton.jsx";
import {getFullCountryNameFromCode} from "../../services/util/LocationsUtil.jsx";
import Box from "@mui/material/Box";


export default function LocationCard({location}) {
    const [isFlipped, setIsFlipped] = useState(false);
    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };
    const [isSaved, setIsSaved] = useState(false);

    const {auth} = useAuth();

    const favoriteButton = <ToFavoriteButton location={location}
                                             isSaved={isSaved}
                                             setIsSaved={setIsSaved}/>

    return (
        <Box
            style={{
                perspective: "1000px",
                display: "inline-block",
            }}
        >
            <Box
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
                    elevation={5}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backfaceVisibility: "hidden",
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
                            Country: <span
                            style={{fontWeight: 500}}>{getFullCountryNameFromCode(location.country)}</span>
                        </Typography>

                        <Typography variant="body2" sx={{fontSize: 16}}>
                            State: <span style={{fontWeight: 500}}>{location.state}</span>
                        </Typography>

                        <Divider sx={{mt: 1, mb: 1}}/>

                        <Typography
                            variant="body2"
                            sx={{fontSize: 16, color: "text.secondary"}}
                        >
                            Latitude: <span style={{fontWeight: 500}}>{location.lat.toFixed(5)}</span>
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{fontSize: 16, color: "text.secondary"}}
                        >
                            Longitude: <span style={{fontWeight: 500}}>{location.lon.toFixed(5)}</span>
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

                <WeatherCard
                    location={location}
                    handleFlip={handleFlip}
                    flipped={isFlipped}
                    auth={auth}
                    favoriteButton={favoriteButton}
                />
            </Box>
        </Box>
    );
}