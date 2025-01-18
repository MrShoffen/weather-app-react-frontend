import {Link} from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import * as React from "react";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import SearchIcon from '@mui/icons-material/Search';
import Box from "@mui/material/Box";
import {useCustomThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";


export default function HomeButton() {
    const {auth} = useAuthContext();
    const {isDarkMode} = useCustomThemeContext();

    return (
        <Box
            sx={{
                display: "flex",
                width: 42,
                height: 42,
                marginRight: '8px',
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isDarkMode ? "rgba(0,0,0,0.32)" : "rgba(47,155,255,0.53)",
                borderRadius: "8px",
                border: "1px solid",
                color: "white",
                '&:hover': {
                    transform: 'scale(1.1)',
                },
            }}
        >
            {auth.isAuthenticated ?
                <Link to="/weather-app/locations" style={{
                    textDecoration: 'none',
                    color: 'inherit',
                }}>
                    <HomeIcon sx={{
                        marginTop: 2,
                        fontSize: '28px',

                    }}/>
                </Link>
                :
                <Link to="/weather-app/find" style={{
                    textDecoration: 'none',
                    color: 'inherit',

                }}>
                    <SearchIcon sx={{
                        marginTop: 2,
                        fontSize: '28px',
                    }}/>
                </Link>
            }

        </Box>
    )
}