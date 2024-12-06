import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст
const AuthContext = createContext();

// Кастомный хук для доступа к контексту
export const useAuth = () => useContext(AuthContext);

// Провайдер для контекста
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: null,
        isAuthenticated: false,
    });

    // Проверяем localStorage при загрузке страницы
    useEffect(() => {
        const storedToken = localStorage.getItem("jwtToken");
        if (storedToken) {
            setAuth({ token: storedToken, isAuthenticated: true });
        }
    }, []);

    // Войти (сохраняем токен)
    const login = (token) => {
        localStorage.setItem("jwtToken", token);
        setAuth({ token, isAuthenticated: true });
    };

    // Выйти (удаляем токен)
    const logout = () => {
        localStorage.removeItem("jwtToken");
        setAuth({ token: null, isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};