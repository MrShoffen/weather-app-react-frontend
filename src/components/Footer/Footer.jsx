import './footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import Box from "@mui/material/Box";
import {ThemeSwitcher} from "../Header/ThemeSwitcher.jsx";
import React, {useEffect, useState} from "react";
import SearchButton from "../SearchButton/SearchButton.jsx";

export default function Footer() {
    const {isDarkMode, isSmallScreen} = useThemeContext();

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


        <footer className="footer mt-auto py-3"
                style={{
                    color: isDarkMode ? "#d2d2d2" : "#2c2c2c",
                    backgroundColor: isDarkMode ? "rgb(18,18,18, 0.5)" : "rgba(255, 255, 255, 0.5)",
                    transform: isVisible ? "translateY(0)" : "translateY(100%)",
                    transition: "transform 0.3s ease-in-out",
                }}
        >

            <span className="text-muted">2024 Roadmap:</span>
            <a className="contact_link" href="/currency-exchange"
               style={{position: "absolute", left: "132px"}}><CurrencyExchangeIcon/></a>

            <a className="contact_link" href="/tennis-scoreboard"
               style={{position: "absolute", left: "165px"}}><SportsTennisIcon/></a>

            <ul className="footer_links">
                <a href="https://t.me/MrShoffen" className="contact_link">
                    <TelegramIcon/>
                </a>

                <a href="https://github.com/MrShoffen" className="contact_link">
                    <GitHubIcon/>
                </a>

            </ul>


        </footer>
    )
}