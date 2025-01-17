import {Card, CardContent, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useRef, useState} from "react";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import weatherStatePictureFromCode from "../../services/util/WeatherStatePictureFromCode.jsx";
import temper from "../../assets/img/weather-state/thermometer-celsius.svg";
import windSock from "../../assets/img/weather-state/windsock.svg";
import barometer from "../../assets/img/weather-state/barometer.svg";
import Box from "@mui/material/Box";
import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from '@mui/icons-material/Delete';
import {CSSTransition} from "react-transition-group";
import './LocWeather.css';

export default function LocationWeatherCard({locationAndWeather, onDelete, isDeleting}) {
    const location = locationAndWeather.location;
    const weather = locationAndWeather.weather;

    //todo move to util
    countries.registerLocale(enLocale);


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


    const isDay = (weather) => {

        return weather && weather.weather[0].icon.endsWith("d");
    }

    const isCloudy = (weather) => {
        return weather && weather.clouds.all > 60
    }

    const windDirection = (weather) => {
        const wind = weather.wind.deg;
        if (!weather.wind.speed) {
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

    const nodeRef = React.useRef(null)

    // const [isDeleting, setIsDeleting] = useState(true)

    return (
        <CSSTransition
            in={!isDeleting}
            timeout={500}
            classNames="fade-shrink"
            nodeRef={nodeRef}
            key={locationAndWeather.location.id}
        >

            <div
                ref={nodeRef}

                style={{
                    minWidth: "290px",
                    minHeight: 320,
                    maxHeight: 400,
                    position: "relative",

                }}
            >

                <Card
                    ref={parentRef}
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

                        <Box>
                            <img
                                src={weatherStatePictureFromCode(weather.weather[0].id, isDay(weather), isCloudy(weather))}
                                alt
                                style={{
                                    width: "100px",
                                    right: 65,
                                    top: 108,
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
                                    top: 200,
                                    transform: "translateX(50%)"
                                }}
                            >
                            <span style={{fontWeight: 500}}>

                            {weather.weather[0].description}
                            </span>
                            </Typography>


                            <Typography
                                gutterBottom
                                variant="h4"
                                component="div"
                                sx={{
                                    position: "absolute",
                                    top: 148,
                                    right: 102,
                                    fontWeight: 500

                                }}
                            >
                                {Math.round(weather.main.temp)}°
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
                                            top: 162
                                        }}/>
                                    : 'Feels like:'

                                }
                            </Typography>

                            <Typography variant="body2"
                                        sx={{
                                            fontSize: 16,
                                            position: "absolute",
                                            right: isCompressed() ? '62%' : '53%',
                                            top: 169
                                        }}
                            >
                            <span style={{fontWeight: 500}}>
                                {Math.round(weather.main.feels_like)}°
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
                                            top: 190
                                        }}/>
                                    : 'Wind:'

                                }
                            </Typography>


                            <Typography variant="body2"
                                        sx={{
                                            fontSize: 16,
                                            position: "absolute",
                                            right: isCompressed() ? '62%' : '53%',
                                            top: 197
                                        }}
                            >
                            <span style={{fontWeight: 500}}>
                            {weather.wind.speed.toFixed(1)} m/s
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
                                            top: 218,
                                        }}/>
                                    : 'Pressure:'

                                }
                            </Typography>

                            <Typography variant="body2"
                                        sx={{
                                            fontSize: 16,
                                            position: "absolute",
                                            right: isCompressed() ? '62%' : '53%',
                                            top: 226
                                        }}
                            >
                            <span style={{fontWeight: 500}}>
                            {Math.round(weather.main.pressure * 0.75)} mm
                        </span>
                            </Typography>

                            <Divider sx={{mt: '2px', mb: '2px'}}/>


                            <Typography
                                variant="body2"
                                sx={{fontSize: 16, color: "text.secondary"}}
                            >
                                Humidity: <span
                                style={{fontWeight: 500}}>{weather.main.humidity}%</span>
                                {'. Cloudiness: '}<span
                                style={{fontWeight: 500}}>{weather.clouds.all}%</span>
                            </Typography>


                            <Typography
                                variant="body2"
                                sx={{fontSize: 16, color: "text.secondary"}}
                            >
                                Wind direction: <span
                                style={{fontWeight: 500}}>{windDirection(weather)}</span>
                            </Typography>

                        </Box>

                    </CardContent>

                    <LoadingButton size="small"
                                   variant="contained"
                                   style={{
                                       position: 'absolute',
                                       bottom: 11,
                                       right: 8.5,
                                       paddingRight: 35,
                                   }}
                                   sx={{
                                       backgroundColor: 'error.main',
                                   }}
                                   onClick={() => {
                                       onDelete(locationAndWeather.location.id);
                                   }}

                    >

                        delete
                        <DeleteIcon style={{fontSize: 16, position: 'absolute', right: 0, top: -3}}/>


                    </LoadingButton>

                </Card>


            </div>
        </CSSTransition>

    );
}