import * as React from "react";
import {useEffect, useState} from "react";
import SearchIcon from '@mui/icons-material/Search';
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import LocationModal from "../../modal/LocationsModal/LocationModal.jsx";
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
    transform: isVisible ? "translateY(0)" : "translateY(-100%)",
    transition: "transform 0.3s ease-in-out",
    '&:hover': {
        transform: 'scale(1.1)',
        cursor: 'pointer',

    },
    zIndex: 3,

    [theme.breakpoints.down('md')]: {
        top: 'auto',
        bottom: 65,
        right: 15,
        transform: isVisible ? "translateY(0)" : "translateY(80%)",
    },


}));

export default function SearchButton({onClick}) {
    const {isDarkMode} = useThemeContext();

    const [isVisible, setIsVisible] = useState(true); // состояние видимости заголовка
    const [prevScrollY, setPrevScrollY] = useState(0); // предыдущее значение прокрутки


    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY < prevScrollY) {
                setIsVisible(true);
            } else if (Math.abs(currentScrollY - prevScrollY) > 3 && prevScrollY) {
                setIsVisible(false);
            }

            setPrevScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [prevScrollY]); // Обновляем при изменении prevScrollY

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