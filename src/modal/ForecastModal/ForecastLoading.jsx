import {Box, Paper, Typography} from "@mui/material";
import ForecastRow from "./ForecastRow.jsx";
import React from "react";
import ForecastCell from "./ForecastCell.jsx";


export default function ForecastLoading({country, name, isDarkMode}) {


    return (
        <>
            {/* Заголовок с флагом и названием города */}
            <Paper
                elevation={2}
                sx={{
                    position: "sticky",
                    top: 0,
                    zIndex: 3,
                    backgroundColor: isDarkMode ? "background.paper" : "primary.main",
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
                    color="white"
                    component="div"
                    textAlign="center"
                    sx={{paddingTop: '7px'}}
                >
                    <img
                        alt={country}
                        src={
                            "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                            country +
                            ".svg"
                        }
                        width="30"
                        style={{
                            position: "absolute",
                            left: 5,
                            top: 13,
                        }}
                    />
                    {name}
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
                <ForecastRow />
                <ForecastRow />
                <ForecastRow />
                <ForecastRow />
                <ForecastRow />



            </Box>
        </>
    )
}