import React, {createContext, useContext, useState, useEffect} from "react";
import {checkSession} from "../../services/CheckSession.js";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(extractAuthUser);

    function extractAuthUser() {
        const isAuth = localStorage.getItem("isAuthenticated");
        const userData = localStorage.getItem("user");

        if (isAuth && userData) {
            return {
                isAuthenticated: true,
                user: JSON.parse(userData),
            };
        }

        return {
            isAuthenticated: false,
            user: null
        };
    }

    const login = (userInfo) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("user", JSON.stringify(userInfo));
        setAuth({
            isAuthenticated: true,
            user: userInfo,
        });
    };

    const logout = () => {
        localStorage.removeItem("isAuthenticated");
        localStorage.removeItem("user");
        setAuth({
            isAuthenticated: false,
            user: null,
        });
    };

    const navigate = useNavigate();

    const validateSession = async () => {
        if (auth.isAuthenticated) {

          try {
              await checkSession();
          } catch (error){
              logout();
              navigate("/login", {
                  state: {
                      message: "Session is expired! Please login again",
                      type: "error"
                  },
              });
              window.location.reload();

          }
        }

    };

    useEffect(() => {
        const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // Каждые 5 минут
        const intervalId = setInterval(validateSession, SESSION_CHECK_INTERVAL);

        // Также сразу проверяем сессию при загрузке приложения

        validateSession();

        return () => clearInterval(intervalId); // Очищаем интервал при размонтировании
    }, []);

    return (
        <AuthContext.Provider value={{auth, login, logout}}>
            {children}
        </AuthContext.Provider>
    );
};