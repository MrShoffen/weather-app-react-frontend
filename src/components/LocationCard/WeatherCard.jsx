import {Button, Card, CardActions, CardContent, CardMedia, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {hasFlag} from 'country-flag-icons'
import {useEffect, useState} from "react";

export default function WeatherCard({location, flipped, handleFlip}) {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        if (flipped && !weatherData) {
            setIsLoading(true); // Установить индикатор загрузки
            setWeatherData('dfdfd');
           console.log('start fetchin weather data')
        }
    }, [flipped]);


    return (
        <Card
            elevation={3}
            style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)", // Повернуть обратную сторону
                textAlign: "center",
            }}
        >
            <CardContent>
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

                <Typography variant="body2">
                    Display relevant weather data here...
                </Typography>

            </CardContent>
            <CardActions>
                <Button size="small" onClick={handleFlip}>
                    Back
                </Button>
            </CardActions>
        </Card>
    );
}