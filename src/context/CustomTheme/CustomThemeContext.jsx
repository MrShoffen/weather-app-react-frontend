import React, { createContext, useState, useMemo, useEffect, useContext } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Создаем контекст
const ThemeContext = createContext();

export const useThemeContext = () => useContext(ThemeContext);

export const CustomThemeContext = ({ children }) => {
    // Сохраняем состояние темы в локальном хранилище
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Изначально проверяем `localStorage` для значения темы
        const savedTheme = localStorage.getItem('isDarkMode');
        return savedTheme ? JSON.parse(savedTheme) : false; // По умолчанию -> light
    });

    // Функция для переключения темы
    const toggleTheme = () => {
        setIsDarkMode((prevMode) => {
            const newMode = !prevMode;
            localStorage.setItem('isDarkMode', JSON.stringify(newMode)); // Сохранение в localStorage
            return newMode;
        });
    };

    // Создаем тему (MUI) на основе текущего состояния
    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode: isDarkMode ? 'dark' : 'light',
                },
            }),
        [isDarkMode]
    );

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </ThemeContext.Provider>
    );
};