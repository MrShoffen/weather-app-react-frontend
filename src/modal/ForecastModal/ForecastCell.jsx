import {Paper} from "@mui/material";
import React from "react";
import Typography from "@mui/material/Typography";
import weatherStatePictureFromCode from "../../services/util/WeatherStatePictureFromCode.jsx";
import {isCloudy, isDay} from "../../services/util/WeatherStateUtil.jsx";


export default function ForecastCell({weather}) {

    return (
        <Paper
            elevation={0}
            sx={{
                minWidth: "100px",
                height: "80px",
                backgroundColor: 'background.paper',
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px",
                border: "1px solid",
                borderColor: 'divider',
                flexShrink: 0,
                position: "relative",
                userSelect: "none",
            }}>
            <Typography
                variant="body2"
                sx={{position: 'absolute', top: 3, left: 5, fontSize: 16, color: "text.secondary"}}
            >
                {weather.time}
            </Typography>

            <img
                src={weatherStatePictureFromCode(weather.weather[0].id,
                    isDay(weather),
                    isCloudy(weather),)}
                alt
                style={{
                    width: "50px",
                    right: 30,
                    top: 0,
                    mt: 0,
                    position: "absolute",
                    transform: "translateX(50%)"
                }}/>

            <Typography
                gutterBottom
                variant="h5"
                component="div"
                sx={{
                    position: "absolute",
                    top: 30,
                    right: 50,
                    fontWeight: 400
                }}
            >
                {Math.round(weather.main.temp)}°
            </Typography>


            <Typography

                sx={{
                    fontSize: 12,
                    color: "text.secondary",
                    position: "absolute",
                    left: '50%',
                    bottom: 2,
                    transform: "translateX(-50%)"
                }}>

                {weather.weather[0].description}

            </Typography>

            <Typography variant="body2"
                        sx={{
                            fontSize: 12,
                            position: "absolute",
                            bottom: 18,
                            right: 3,

                        }}
            >
                <span style={{fontWeight: 500}}>
                          {weather.wind.speed.toFixed(1)} m/s
                        </span>
            </Typography>
        </Paper>
    )
}