import React from "react";
import {useAuth} from "./AuthContext.jsx";
import {Navigate} from "react-router-dom";

const AvailableAfterLoginRoute = ({children}) => {
    const {auth} = useAuth();

    console.log(auth);

    return auth.isAuthenticated
        ? children
        : <Navigate to="/weather-app/"/>;

};

export default AvailableAfterLoginRoute;