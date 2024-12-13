import React, {createContext, useContext, useState, useEffect} from "react";

// Создаем контекст
const AuthContext = createContext();

// Кастомный хук для доступа к контексту
export const useAuth = () => useContext(AuthContext);

// Провайдер для контекста
export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        isAuthenticated: false,
        user: null
    });

    useEffect(() => {
        setTimeout(() => {
            const isAuth = localStorage.getItem("isAuthenticated");
            const userData = localStorage.getItem("user");

            if (isAuth && userData) {
                // Устанавливаем состояние с данными из localStorage
                setAuth({
                    isAuthenticated: true,
                    user: JSON.parse(userData), // Парсим сохранённый JSON из localStorage
                });
            }
        }, 500)
    }, []);

    const login = (userInfo) => {
        localStorage.setItem("isAuthenticated", "true"); // Сохраняем, что пользователь авторизован
        localStorage.setItem("user", JSON.stringify(userInfo)); // Сохраняем данные пользователя как строку в формате JSON
        setAuth({
            isAuthenticated: true,
            user: userInfo,
        });
    };

    // Выйти (удаляем токен)
    const logout = () => {
        localStorage.removeItem("isAuthenticated"); // Удаляем флаг авторизации
        localStorage.removeItem("user"); // Удаляем данные пользователя
        setAuth({
            isAuthenticated: false,
            user: null,
        });
    };

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};