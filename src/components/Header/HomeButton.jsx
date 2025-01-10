import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
import {useAuth} from "../../context/Auth/AuthContext.jsx";

export default function HomeButton() {
    const {auth} = useAuth();

    return (
        auth.isAuthenticated ?
            <Link to="/weather-app/locations" style={{textDecoration: 'none',  color: 'inherit'}}>
                <HomeIcon sx={{
                    marginTop: 2,
                    fontSize: '28px'
                }}/>
            </Link>
            : null
    )
}