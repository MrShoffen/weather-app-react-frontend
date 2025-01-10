import React from "react";
import {useAuth} from "./AuthContext.jsx";
import {Navigate} from "react-router-dom";

const UnavailableAfterLoginRoute = ({children}) => {
    const {auth} = useAuth();

    return auth.isAuthenticated
        ? <Navigate to="/weather-app/locations/"/>
        : children;

};

export default UnavailableAfterLoginRoute;