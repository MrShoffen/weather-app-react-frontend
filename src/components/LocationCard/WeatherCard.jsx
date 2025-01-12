import {Button, Card, CardActions, CardContent, CardMedia, Divider, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import {hasFlag} from 'country-flag-icons'
import React, {useEffect, useState} from "react";

export default function WeatherCard({location, flipped, handleFlip}) {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (flipped && !weatherData) {
            setWeatherData('dfdfd');
            console.log('start fetchin weather data')

            // setTimeout(() => {setIsLoading(false);}, 1000);
            setIsLoading(false);
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

                {isLoading ? (
                    <>
                    <Skeleton sx={{height: 60, mb: 1, marginRight: 1, marginLeft: 1}} animation="wave" variant="rectangular"/>
                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{marginBottom: 6, marginRight: 8, marginLeft: 8}}/>
                        <Skeleton animation="wave" height={10} width="75%" style={{marginBottom: 6, marginRight: 8, marginLeft: 8}}/>
                        <Skeleton animation="wave" height={10} width="60%" style={{ marginRight: 6, marginLeft: 8}}/>
                    </React.Fragment>
                    </>
                ) : (
                    <Typography variant="body2">
                        Display relevant weather data here...
                    </Typography>
                )
                }


            </CardContent>
            <CardActions>

                {isLoading ? (
                    <>
                        <Skeleton variant="rectangular" width={70} height={22} style={{marginBottom: 6, marginRight: 8, marginLeft: 10}}/>
                    </>
                ) : (
                    <Button size="small" onClick={handleFlip}>
                        Back
                    </Button>
                )
                }

            </CardActions>
        </Card>
    );
}