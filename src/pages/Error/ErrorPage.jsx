import React from 'react'
import Header from "../../components/Header/Header.jsx";
import thunderstorm from "../../assets/img/weather-state/thunderstorms.svg";
import Container from "@mui/material/Container";

import './Error.css'

const ErrorPage = ({status, description}) => {
    return (

            <Container disableGutters>
                <div className={"errorContainer"}>
                    <h1 style={{width: "100%", marginBottom: 0}}>{status}</h1>
                    <h2 style={{width: "100%", marginBottom: 0}}>{description}</h2>
                    <img src={thunderstorm} alt style={{width: "100%", mt: 0}}/>
                </div>
            </Container>

    )
}

export default ErrorPage