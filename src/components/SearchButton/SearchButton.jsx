import * as React from "react";
import SearchIcon from '@mui/icons-material/Search';
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import AddIcon from '@mui/icons-material/Add';
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";


const Card = styled(MuiCard)(({theme, isVisible}) => ({
    position: "fixed",
    top: 70,
    bottom: 'auto',
    display: "flex", // центровка иконки
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(47,155,255,0.8)", // полупрозрачный фон
    borderRadius: "50%", // круглая форма
    border: "1px solid",
    color: "white",
    marginLeft: 20,
    transform: isVisible ? "scale(1.0) translateY(0)" : " scale(1.0) translateY(-90%)",
    transition: "transform 0.3s ease-in-out",
    '&:hover': {
        transform: isVisible ? "scale(1.1) translateY(0)" : " scale(1.1) translateY(-90%)",
        cursor: 'pointer',

    },
    zIndex: 3,

    [theme.breakpoints.down('md')]: {
        top: 'auto',
        bottom: 65,
        right: 15,
        transform: isVisible ? "scale(1.0) translateY(0)" : " scale(1.0) translateY(80%)",
        '&:hover': {
            transform: isVisible ? "scale(1.1) translateY(0)" : " scale(1.1) translateY(80%)",
            cursor: 'pointer',

        },
    },


}));

export default function SearchButton({onClick}) {
    const {isDarkMode, isVisible} = useThemeContext();


    return (

        <Card
            isVisible={isVisible}
            sx={{
                borderColor: isDarkMode ? "rgb(18,18,18, 0.2)" : "rgba(0,114,227,0.4)",
            }}
            onClick={onClick}
        >
            <SearchIcon sx={{fontSize:  "45px",}}/>
            <AddIcon sx={{
                position: "absolute",
                left: "35%",
                top: "-10%",
            }}/>
        </Card>
    );
}