import React from "react";
import {useAuthContext} from "./AuthContext.jsx";
import {Navigate} from "react-router-dom";

const UnavailableAfterLoginRoute = ({children}) => {
    const {auth} = useAuthContext();

    return auth.isAuthenticated
        ? <Navigate to="/weather-app/locations/"/>
        : children;

};

export default UnavailableAfterLoginRoute;