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

export default function Header() {
    const {isDarkMode, toggleTheme, isSmallScreen} = useThemeContext();
    const [isVisible, setIsVisible] = useState(true); // состояние видимости заголовка
    const [prevScrollY, setPrevScrollY] = useState(0); // предыдущее значение прокрутки

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY < prevScrollY) {
                // Если любое движение вверх - показываем хедер
                setIsVisible(true);
            } else if (Math.abs(currentScrollY - prevScrollY) > 3 && prevScrollY) {
                // Если скроллим вниз на >50px - прячем хедер
                setIsVisible(false);
            }

            // Обновляем значение предыдущего скролла
            setPrevScrollY(currentScrollY);
        };

        // Подписываемся на событие скролла
        window.addEventListener("scroll", handleScroll);

        // Отписываемся от события при размонтировании компонента
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
                backgroundColor: isDarkMode ? "rgb(18,18,18, 0.5)" : "rgba(0,114,227,0.66)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.3s ease-in-out",
            }}
        >
            <Container disableGutters>
                <Toolbar>



                    <MainLabel/>

                    <Box sx={{flexGrow: 1}}/>


                    <Box
                        sx={{
                            position: "absolute",
                            top: 70,
                            right: '7%',
                            width: "48px", // фиксированная ширина кнопки
                            height: "48px", // фиксированная высота кнопки
                            display: "flex", // центровка иконки
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "50%",
                            border: "1px solid",
                            borderColor: isDarkMode ? "rgb(18,18,18, 0.5)" : "rgba(0,114,227,0.66)",
                            backgroundColor: "rgba(255, 255, 255, 0.3)", // полупрозрачный фон

                            // Анимация исчезновения
                            opacity: isVisible ? 1 : 0,
                            visibility: isVisible ? "visible" : "hidden", // Дополнительно скрываем элемент
                            transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
                        }}
                    >
                        <ThemeSwitcher
                            sx={{m: 1}}
                            checked={isDarkMode}
                            onChange={toggleTheme}
                        />
                    </Box>


                    <HomeButton/>
                    <AvatarMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}