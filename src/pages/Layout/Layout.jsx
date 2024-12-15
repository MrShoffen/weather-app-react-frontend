import React from "react";
import {Outlet} from "react-router-dom";
import Header from "../../components/Header/Header.jsx";

const Layout = () => {
    return (
        <>
            <Header/>
            <Outlet/>
        </>
    );
};

export default Layout;