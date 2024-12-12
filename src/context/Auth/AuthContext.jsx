import React, { createContext, useContext, useState, useEffect } from "react";

// Создаем контекст
const AuthContext = createContext();

// Кастомный хук для доступа к контексту
export const useAuth = () => useContext(AuthContext);

// Провайдер для контекста
export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
    });

    const [isLoading, setIsLoading] = useState(true);

    // Проверяем localStorage при загрузке страницы
    useEffect(() => {
        setTimeout(() => {
            const isAuth = localStorage.getItem("isAuthenticated");
            if (isAuth) {
                setAuth({ isAuthenticated: true });
            }

        }, 500)


    }, []);

    // Войти (сохраняем токен)
    const login = () => {
        localStorage.setItem("isAuthenticated", true);
        setAuth({ /*token,*/ isAuthenticated: true });
    };

    // Выйти (удаляем токен)
    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        setAuth({ /*token: null,*/ isAuthenticated: false });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};