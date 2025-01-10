import React, {useState, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {ThemeSwitcher} from "./ThemeSwitcher.jsx";
import AvatarMenu from "./AvatarMenu.jsx";
import MainLabel from "./MainLabel.jsx";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import Box from "@mui/material/Box";
import HomeButton from "./HomeButton.jsx";
import SearchButton from "./SearchButton.jsx";
import SearchIcon from "@mui/icons-material/Search";

export default function SearchHeaderBar() {
    const { isSmallScreen} = useThemeContext();
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
        <AppBar
            component="nav"
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: "rgba(255,255,255,0)",
                transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.3s ease-in-out",
                zIndex: -999,
            }}
        >
            <Container disableGutters>
                <Toolbar>
                    <SearchButton shouldShow={!isSmallScreen}/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}