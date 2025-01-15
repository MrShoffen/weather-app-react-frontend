import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import {useState} from "react";
import LocationModal from "../../modal/LocationsModal/LocationModal.jsx";
import AddIcon from '@mui/icons-material/Add';

export default function SearchButton({shouldShow}) {
    const {auth} = useAuth();
    const {isDarkMode, isSmallScreen} = useThemeContext();


    const [isLocationModalOpen, setLocationModalOpen] = useState(false);
    const handleCloseLocationModal = () => {
        setLocationModalOpen(false);
        console.log(isLocationModalOpen);
    };

    const handleLocation = async () => {
        setLocationModalOpen(true);
    }

    return (

        <Box
            sx={{
                position: isSmallScreen ? "fixed" : "absolute",
                top: isSmallScreen ? 'auto' : 70,
                bottom: isSmallScreen ? 65 : 'auto',
                left: isSmallScreen ? 'auto' : '7%',
                right: isSmallScreen ? 15 : 'auto',
                width: isSmallScreen ? "70px" : "52px", // фиксированная ширина кнопки
                height: isSmallScreen ? "70px" : "52px", // фиксированная ширина кнопки
                display: "flex", // центровка иконки
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(47,155,255,0.8)", // полупрозрачный фон
                borderRadius: "50%", // круглая форма
                border: "1px solid",
                color: "white",
                borderColor: isDarkMode ? "rgb(18,18,18, 0.2)" : "rgba(0,114,227,0.4)",
                visibility: shouldShow ? "visible" : "hidden",
                '&:hover': {
                    transform: 'scale(1.1)',
                    cursor: 'pointer',

                },

            }}
            onClick={!isLocationModalOpen && handleLocation}


        >
            <SearchIcon
                sx={{
                    fontSize: isSmallScreen ? "45px" : "30px",


                }}

            />
            <AddIcon sx={{
                position: "absolute",
                left: "35%",
                top: "-10%",
            }}/>
            <LocationModal onClose={handleCloseLocationModal}
                           open={isLocationModalOpen}
            />
        </Box>
    );
}