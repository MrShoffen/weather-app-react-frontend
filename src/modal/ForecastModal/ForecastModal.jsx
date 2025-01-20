import React, {useEffect, useState} from "react";
import {Box, Modal, Paper, Slide, Typography} from "@mui/material";
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {sendGetForecast} from "../../services/fetch/auth/SendGetForecast.js";
import parseWeatherData from "../../services/util/ForecastParserUtil.jsx";
import ForecastRow from "./ForecastRow.jsx";

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

    [theme.breakpoints.up('md')]: {
        width: '840px',
        maxWidth: '840px',
    },
    [theme.breakpoints.up('lg')]: {
        width: '847px',
        maxWidth: '847px',
        minHeight: '700px',

    },

}));


export default function ForecastModal({activeLocationForecast, onClose}) {

    const [weatherData, setWeatherData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadWeather = async () => {
            setIsLoading(true);
            if (!weatherData) {

                try {
                    const weatherJson = await sendGetForecast(activeLocationForecast.id);

                    setWeatherData(parseWeatherData(weatherJson));

                } catch (error) {
                    console.log(error);
                }

                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            }

            setIsLoading(false);
        };

        if (activeLocationForecast !== null) {
            loadWeather();
        }
    }, [activeLocationForecast]);

    const handleMouseDragScroll = (event, rowRef) => {
        let isMouseDown = false;
        let startX;
        let scrollStart;

        const mouseDownHandler = (e) => {
            isMouseDown = true;
            startX = e.pageX - rowRef.current.offsetLeft;
            scrollStart = rowRef.current.scrollLeft;
        };

        const mouseMoveHandler = (e) => {
            if (!isMouseDown) return;
            e.preventDefault();

            const x = e.pageX - rowRef.current.offsetLeft;
            const walk = (x - startX) * 1.5;
            rowRef.current.scrollLeft = scrollStart - walk;
        };

        const mouseUpHandler = () => {
            isMouseDown = false;
        };

        return {mouseDownHandler, mouseMoveHandler, mouseUpHandler};
    };

    return (
        <Modal
            open={activeLocationForecast !== null}
            onClose={() => {
                onClose();
                setWeatherData(null);

            }}
        >

            <Slide in={activeLocationForecast} direction={'up'}
                   style={{
                       position: "relative",
                       transform: "translate(50%,50%)",
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
                            setWeatherData(null);
                        }}

                        sx={{
                            position: 'absolute',
                            top: 5,
                            right: 5,
                            width: '25px',
                            height: '25px',
                            zIndex: 5,
                        }}
                    >
                        <CloseIcon sx={{fontSize: '25px'}}/>
                    </IconButton>


                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            position: "relative",
                            zIndex: 2,
                            overflow: "hidden",
                            height: "100%",
                        }}
                    >
                        {
                            isLoading
                                ? (
                                    <Typography>loading...</Typography>
                                )
                                : (
                                    weatherData && activeLocationForecast &&
                                    <>
                                        {/* Заголовок с флагом и названием города */}
                                        <Paper
                                            elevation={3}
                                            sx={{
                                                position: "sticky",
                                                top: 0,
                                                zIndex: 3,
                                                backgroundColor: "background.paper",
                                                borderRadius: 0,
                                                height: "45px",
                                                padding: 1,
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="div"
                                                textAlign="center"
                                                sx={{  }}
                                            >
                                                <img
                                                    alt={activeLocationForecast.country}
                                                    src={
                                                        "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                                                        activeLocationForecast.country +
                                                        ".svg"
                                                    }
                                                    width="30"
                                                    style={{
                                                        position: "absolute",
                                                        left: 5,
                                                        top: 10,
                                                    }}
                                                />
                                                {activeLocationForecast.name}
                                            </Typography>
                                        </Paper>

                                        {/* Прокручиваемая часть */}
                                        <Box
                                            sx={{
                                                overflowY: "auto",
                                                height: "calc(100% - 50px)",
                                                "&::-webkit-scrollbar": {
                                                    display: "none", // Скрывает скроллбар во всех Webkit-совместимых браузерах.
                                                },
                                                scrollbarWidth: "none", // Скрывает скроллбар в Firefox.
                                            }}
                                        >
                                            {weatherData.map((row, index) => (
                                                <ForecastRow key={index} row={row} />
                                            ))}
                                        </Box>
                                    </>
                                )
                        }
                    </Box>
                </Card>
            </Slide>
        </Modal>
    );

};