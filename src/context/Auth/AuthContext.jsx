import React, {createContext, useContext, useEffect, useState} from "react";
import {checkSession} from "../../services/fetch/auth/CheckSession.js";
import {useLocation, useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({children}) => {
    const [savedLocations, setSavedLocations] = useState([]);

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
        setSavedLocations([]);
    };


    const urlLocation = useLocation();
    const [pageVisits, setPageVisits] = useState(0);
    const navigate = useNavigate();
    const validateSession = async () => {
        if (auth.isAuthenticated) {
            console.log('validating session....')
            try {
                const user = await checkSession();
                if (user !== auth.user) {
                    console.log(user);
                    login(user);
                }
            } catch (error) {
                if (auth.isAuthenticated) {
                    logout();

                    setTimeout(() => navigate("/weather-app/login", {
                        state: {
                            message: "Session is expired! Please login again",
                            type: "error"
                        },
                    }), 300)
                }
            }
        }
    };

    useEffect(() => {
        setPageVisits((prev) => prev + 1);

        if (pageVisits === 3) {
            validateSession();
            setPageVisits(0);
        }
    }, [urlLocation.pathname]);


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
        validateSession();
        validateCookieIsAlive();
    }, []);


    return (
        <AuthContext.Provider value={{auth, login, logout, validateSession, savedLocations, setSavedLocations}}>
            {children}
        </AuthContext.Provider>
    );
};