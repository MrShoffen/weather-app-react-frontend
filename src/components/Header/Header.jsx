import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import {ThemeSwitcher} from "./ThemeSwitcher.jsx";
import AvatarMenu from "./AvatarMenu.jsx";
import MainLabel from "./MainLabel.jsx";
import {useCustomThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import Box from "@mui/material/Box";
import HomeButton from "./HomeButton.jsx";
import {useScrollTrigger} from "@mui/material";

export default function Header() {
    const {isDarkMode, isVisible} = useCustomThemeContext();

    useScrollTrigger()

    return (
        <AppBar
            component="nav"
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: isDarkMode ? "rgba(0,0,0,0.6)" : "rgba(0,114,227,0.66)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.3s ease-in-out",
                boxShadow:  5,

            }}
        >
            <Container disableGutters>
                <Toolbar>
                    <MainLabel/>

                    <Box sx={{flexGrow: 1}}/>



                    <HomeButton/>

                    <AvatarMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}