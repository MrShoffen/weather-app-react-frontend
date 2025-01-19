import * as React from "react";
import SearchIcon from '@mui/icons-material/Search';
import {useCustomThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import AddIcon from '@mui/icons-material/Add';
import {styled} from "@mui/material/styles";
import MuiCard from "@mui/material/Card";


const Card = styled(MuiCard)(({theme, isVisible, isDarkMode}) => ({
    position: "fixed",
    top: 73,
    bottom: 'auto',
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:  "#1976d2",
    borderRadius: "16px",
    border: "1px solid",
    boxShadow: 24,
    color: "white",
    opacity: 0.9,
    marginLeft: 20,
    width: "60px",
    height: '60px',
    transform: isVisible ? "scale(1.0) translateY(0)" : " scale(1.0) translateY(-65px)",
    transition: "transform 0.3s linear",
    '&:hover': {
        transform: isVisible ? "scale(1.05) translateY(0)" : " scale(1.05) translateY(-65px)",
        cursor: 'pointer',

    },
    zIndex: 3,

    [theme.breakpoints.down('md')]: {
        top: 'auto',
        bottom: 65,
        right: 15,
        transform: isVisible ? "scale(1.0) translateY(0)" : " scale(1.0) translateY(50px)",
        '&:hover': {
            transform: isVisible ? "scale(1.1) translateY(0)" : " scale(1.1) translateY(50px)",
            cursor: 'pointer',

        },

        width: "80px",
        height: '80px',
    },


}));

export default function SearchButton({onClick}) {
    const {isVisible, isDarkMode} = useCustomThemeContext();


    return (
        <Card
            isVisible={isVisible}
            isDarkMode={isDarkMode}
            sx={{
                borderColor: "action.selected",
            }}
            onClick={onClick}
        >
            <SearchIcon sx={{fontSize: "50px",}}/>
            <AddIcon sx={{
                position: "absolute",
                left: "45%",
                top: "-5%",
            }}/>
        </Card>
    );
}