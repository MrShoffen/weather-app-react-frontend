import React from "react";
import {useAuth} from "./AuthContext.jsx";
import {Navigate} from "react-router-dom";

const AvailableAfterLoginRoute = ({children}) => {
    const {auth} = useAuth();

    return auth.isAuthenticated
        ? children
        : <Navigate to="/weather-app/login"/>;

};

export default AvailableAfterLoginRoute;