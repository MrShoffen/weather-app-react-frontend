import React from 'react';
import './LocationPage.css'
import SearchButton from "../../components/Header/SearchButton.jsx";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import SearchHeaderBar from "../../components/Header/SearchHeaderBar.jsx";
import Container from "@mui/material/Container";

function LocationPage() {
    const {isDarkMode, isSmallScreen} = useThemeContext();

    return (
        <>
            <SearchHeaderBar/>

            <Container disableGutters>
                <SearchButton shouldShow={isSmallScreen}/>



                <div className="homeContainer">
                    <h2>Профиль</h2>
                    {/* Здесь можно разместить содержимое для домашней страницы */}
                </div>
                <div> first</div>
                <div> first</div>
                <div> first first first first first first first first first first first first first first first first
                    first
                    first first first first first first first
                </div>
                <div> first</div>
                <div> first</div>
            </Container>
        </>
    );
}

export default LocationPage;