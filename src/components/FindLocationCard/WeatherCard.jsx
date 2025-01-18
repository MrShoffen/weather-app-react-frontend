import {Button, Card, CardContent, Divider, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useRef, useState} from "react";
import weatherStatePictureFromCode from "../../services/util/WeatherStatePictureFromCode.jsx";
import {sendGetWeather} from "../../services/fetch/unauth/SendGetWeather.js";
import windSock from "../../assets/img/weather-state/windsock.svg"
import barometer from "../../assets/img/weather-state/barometer.svg"
import temper from "../../assets/img/weather-state/thermometer-celsius.svg"

export default function WeatherCard({location, flipped, handleFlip, auth, favoriteButton}) {
    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const isDay = (weatherData) => {

        return weatherData && weatherData.weather[0].icon.endsWith("d");
    }

    const isCloudy = (weatherData) => {
        return weatherData && weatherData.clouds.all > 60
    }

    const windDirection = (weatherData) => {
        const wind = weatherData.wind.deg;
        if (!weatherData.wind.speed) {
            return '';
        }

        if (wind > 337 || wind <= 22) {
            return 'N';
        } else if (wind > 22 && wind <= 67) {
            return 'NE';
        } else if (wind > 67 && wind <= 112) {
            return 'E';
        } else if (wind > 112 && wind <= 157) {
            return 'SE';
        } else if (wind > 157 && wind <= 202) {
            return 'S';
        } else if (wind > 202 && wind <= 247) {
            return 'SW';
        } else if (wind > 247 && wind <= 292) {
            return 'W';
        } else if (wind > 292 && wind <= 337) {
            return 'NW';
        }

    }

    useEffect(() => {
        const effect = async () => {
            if (flipped && !weatherData) {

                try {
                    const weatherJson = await sendGetWeather(location.lat, location.lon);
                    setWeatherData(weatherJson);
                } catch (error) {
                }

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }
        };

        effect();
    }, [flipped]);


    const [parentWidth, setParentWidth] = useState(0); // Хранение ширины родителя
    const parentRef = useRef(null); // Реф для контейнера

    useEffect(() => {
        const updateParentWidth = () => {
            if (parentRef.current) {
                setParentWidth(parentRef.current.offsetWidth);
            }
        };
        updateParentWidth();

        // Опционально обработка изменения размеров окна
        window.addEventListener("resize", updateParentWidth);
        return () => {
            window.removeEventListener("resize", updateParentWidth);
        };
    }, []);

    const isCompressed = () => {
        return parentWidth < 320;
    }


    return (
        <Card
            ref={parentRef}

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
                        <Skeleton sx={{height: 60, mb: 1, marginRight: 1, marginLeft: 1}} animation="wave"
                                  variant="rectangular"/>
                        <React.Fragment>
                            <Skeleton animation="wave" height={10}
                                      style={{marginBottom: 6, marginRight: 8, marginLeft: 8}}/>
                            <Skeleton animation="wave" height={10} width="75%"
                                      style={{marginBottom: 6, marginRight: 8, marginLeft: 8}}/>
                            <Skeleton animation="wave" height={10} width="60%" style={{marginRight: 6, marginLeft: 8}}/>
                        </React.Fragment>
                    </>
                ) : (
                    <>
                        <img
                            src={weatherStatePictureFromCode(weatherData.weather[0].id, isDay(weatherData), isCloudy(weatherData))}
                            alt
                            style={{
                                width: "100px",
                                right: 65,
                                top: 20,
                                mt: 0,
                                position: "absolute",
                                transform: "translateX(50%)"
                            }}/>

                        <Typography
                            variant="body2"
                            sx={{
                                fontSize: 16,
                                color: "text.secondary",
                                position: "absolute",
                                right: 82,
                                top: 112,
                                transform: "translateX(50%)"
                            }}
                        >
                            <span style={{fontWeight: 500}}>

                            {weatherData.weather[0].description}
                            </span>
                        </Typography>


                        <Typography
                            gutterBottom
                            variant="h4"
                            component="div"
                            sx={{
                                position: "absolute",
                                top: 60,
                                right: 102,
                                fontWeight: 500

                            }}
                        >
                            {Math.round(weatherData.main.temp)}°
                        </Typography>
                        <Divider sx={{mb: '2px', width: isCompressed() ? '38%' : '47%'}}/>

                        <Typography variant="body2" sx={{fontSize: 16, height: '23px'}}>
                            {isCompressed() ?
                                <img
                                    src={temper}
                                    alt={'Feels like'}
                                    title="Feels like"
                                    style={{
                                        width: "35px",
                                        position: "absolute",
                                        left: 12,
                                        top: 54
                                    }}/>
                                : 'Feels like:'

                            }
                        </Typography>

                        <Typography variant="body2"
                                    sx={{
                                        fontSize: 16,
                                        position: "absolute",
                                        right: isCompressed() ? '62%' : '53%',
                                        top: '60px'
                                    }}
                        >
                            <span style={{fontWeight: 500}}>
                                {Math.round(weatherData.main.feels_like)}°
                            </span>
                        </Typography>
                        <Divider sx={{mt: '2px', mb: '2px', width: isCompressed() ? '38%' : '47%'}}/>


                        <Typography variant="body2" sx={{fontSize: 16, height: '23px'}}>
                            {isCompressed() ?
                                <img
                                    src={windSock}
                                    alt
                                    style={{
                                        width: "35px",
                                        position: "absolute",
                                        left: 12,
                                        top: 82
                                    }}/>
                                : 'Wind:'

                            }
                        </Typography>


                        <Typography variant="body2"
                                    sx={{
                                        fontSize: 16,
                                        position: "absolute",
                                        right: isCompressed() ? '62%' : '53%',
                                        top: '88px'
                                    }}
                        >
                            <span style={{fontWeight: 500}}>
                            {weatherData.wind.speed.toFixed(1)} m/s
                        </span>
                        </Typography>

                        <Divider sx={{mt: '2px', mb: '2px', width: isCompressed() ? '38%' : '47%'}}/>


                        <Typography variant="body2" sx={{fontSize: 16, height: '23px'}}>
                            {isCompressed() ?
                                <img
                                    src={barometer}
                                    alt
                                    style={{
                                        width: "35px",
                                        position: "absolute",
                                        left: 12,
                                        top: 110,
                                    }}/>
                                : 'Pressure:'

                            }
                        </Typography>

                        <Typography variant="body2"
                                    sx={{
                                        fontSize: 16,
                                        position: "absolute",
                                        right: isCompressed() ? '62%' : '53%',
                                        top: '115px'
                                    }}
                        >
                            <span style={{fontWeight: 500}}>
                            {Math.round(weatherData.main.pressure * 0.75)} mm
                        </span>
                        </Typography>

                        <Divider sx={{mt: '2px', mb: '2px'}}/>


                        <Typography
                            variant="body2"
                            sx={{fontSize: 16, color: "text.secondary"}}
                        >
                            Humidity: <span
                            style={{fontWeight: 500}}>{weatherData.main.humidity}%</span>
                            {'. Cloudiness: '}<span
                            style={{fontWeight: 500}}>{weatherData.clouds.all}%</span>
                        </Typography>


                        <Typography
                            variant="body2"
                            sx={{fontSize: 16, color: "text.secondary"}}
                        >
                            Wind direction: <span
                            style={{fontWeight: 500}}>{windDirection(weatherData)}</span>
                        </Typography>


                    </>

                )
                }


            </CardContent>

            {isLoading ? (
                <>
                    <Skeleton variant="rectangular" width={70} height={22}
                              style={{

                                  marginBottom: 6,
                                  marginRight: 8,
                                  marginLeft: 10
                              }}/>
                </>
            ) : (
                <>
                    <Button size="small" onClick={handleFlip}
                            style={{
                                position: 'absolute',
                                bottom: 11,
                                left: 8.1,
                            }}>
                        back
                    </Button>

                    {auth.isAuthenticated && favoriteButton}

                </>
            )
            }


        </Card>
    )
        ;
}