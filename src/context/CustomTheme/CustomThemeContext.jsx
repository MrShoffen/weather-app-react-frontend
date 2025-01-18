import React, {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';


const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeContext = ({children}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : false;
    });

    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('isDarkMode', JSON.stringify(newMode));
            return newMode;
        });
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                },
            }),
        [isDarkMode]
    );


    //size context
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    const handleResize = () => {
        setWindowWidth(window.innerWidth);
    };

    useEffect(() => {
        // Добавляем слушатель события
        window.addEventListener("resize", handleResize);

        // Удаляем слушатель при размонтировании компонента
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []); // Пустой массив зависимостей означает, что эффект выполнится лишь один раз


    //scroll context
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
        <ThemeContext.Provider value={{isDarkMode, toggleTheme, windowWidth, isVisible}}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};