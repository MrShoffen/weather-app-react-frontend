import {Button, Card, CardActions, CardContent, CardMedia, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {hasFlag} from 'country-flag-icons'
import {useState} from "react";
import WeatherCard from "./WeatherCard.jsx";

export default function LocationCard({location}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleFlip = () => {
        setIsFlipped(!isFlipped);
    };

    return (
        <div
            style={{
                perspective: "1000px", // Перспектива для 3D-эффекта
                display: "inline-block",
            }}
        >
            <div
                style={{
                    minWidth: "328px",
                    minHeight: 230,
                    maxHeight: 230,
                    position: "relative",
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s",
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
                            Country: <span style={{fontWeight: 500}}>{location.country}</span>
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
                    <CardActions>
                        <Button size="small" onClick={handleFlip}>
                            show weather
                        </Button>
                    </CardActions>
                </Card>

                {/* Обратная сторона карточки */}
                <WeatherCard location={location} handleFlip={handleFlip} flipped={isFlipped}/>
            </div>
        </div>
    );
}