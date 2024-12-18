import React, {useEffect, useState} from 'react';
import Header from "../../components/Header/Header.jsx";
import './Loading.css'
import sunset from "../../assets/img/weather-state/sunset.svg";

import {Skeleton} from "@mui/material";
import Container from "@mui/material/Container";
import thunderstorm from "../../assets/img/weather-state/thunderstorms.svg";

function LoadingPage({message}) {

    return (
        <Container disableGutters>
            <div className={"loadingContainer"}>
                <h2 style={{width: "100%", marginBottom: 0}}>{message}</h2>
                <img src={sunset} alt style={{width: "100%", mt: 0}}/>
            </div>
        </Container>
    );
}

export default LoadingPage;