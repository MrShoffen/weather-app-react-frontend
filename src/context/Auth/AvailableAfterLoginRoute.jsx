import React from "react";
import {useAuth} from "./AuthContext.jsx";
import HomePage from "../../pages/Home/HomePage.jsx";
import LoadingPage from "../../pages/Loading/LoadingPage.jsx";
import loadingPage from "../../pages/Loading/LoadingPage.jsx";
import {Navigate} from "react-router-dom";

const AvailableAfterLoginRoute = ({children}) => {
    const {auth} = useAuth();

    console.log(auth);

    return auth.isAuthenticated
        ? children
        : <Navigate to="/"/>;

};

export default AvailableAfterLoginRoute;