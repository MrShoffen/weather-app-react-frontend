import React from "react";
import {Navigate} from "react-router-dom"; // Если используете react-router-dom v6
import {useAuth} from "./AuthContext.jsx";
import HomePage from "../../pages/Home/HomePage.jsx";

const ProtectedRoute = ({children}) => {
    const {auth} = useAuth();
    console.log(auth.isAuthenticated);
    const element = auth.isAuthenticated
        ? children
        : <HomePage/>;

    return element

};

export default ProtectedRoute;