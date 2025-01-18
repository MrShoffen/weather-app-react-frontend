import React, {createContext, useContext, useEffect, useState} from "react";
import {checkSession} from "../../services/fetch/auth/CheckSession.js";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(extractAuthUser);
    const [savedLocations, setSavedLocations] = useState([]);

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
        setSavedLocations([]);
    };


    const validateSession = async () => {
        if (auth.isAuthenticated) {

            try {
                const user = await checkSession();
                if (user !== auth.user) {
                    login(user);
                }
            } catch (error) {
                if (auth.isAuthenticated) {
                    logout();
                    // navigate("/weather-app/login", {
                    //     state: {
                    //         message: "Session is expired! Please login again",
                    //         type: "error"
                    //     },
                    // });
                    // window.location.reload();
                }
            }
        }
    };

    useEffect(() => {
        const SESSION_CHECK_INTERVAL = 1000 * 60 * 5;
        const intervalId = setInterval(validateSession, SESSION_CHECK_INTERVAL);

        validateSession();

        return () => clearInterval(intervalId);
    }, []);

    const validateCookieIsAlive = async () => {
        if (!auth.isAuthenticated) {
            try {
                const user = await checkSession();
                if (user) {
                    login(user);
                }
            } catch (error) {
                logout();

            }
        }
    };

    useEffect(() => {
        validateCookieIsAlive()
    }, []);


    return (
        <AuthContext.Provider value={{auth, login, logout, validateSession, savedLocations, setSavedLocations}}>
            {children}
        </AuthContext.Provider>
    );
};