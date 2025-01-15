import React from 'react';
import './LocationPage.css'
import SearchButton from "../../components/SearchButton/SearchButton.jsx";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import SearchHeaderBar from "../../components/SearchButton/SearchHeaderBar.jsx";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function LocationPage() {
    const {isSmallScreen} = useThemeContext();



    return (
        <>
            <SearchHeaderBar/>

            <Container disableGutters>
                <SearchButton shouldShow={isSmallScreen}/>



                <div className="homeContainer">
                    <Typography sx={{fontSize: 28, fontWeight: 500, mb: 2}}>Saved Locations</Typography>

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