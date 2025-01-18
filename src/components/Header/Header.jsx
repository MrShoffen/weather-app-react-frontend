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

export default function Header() {
    const {isDarkMode, toggleTheme, isVisible} = useCustomThemeContext();

    return (
        <AppBar
            component="nav"
            position="fixed"
            elevation={0}
            sx={{
                backgroundColor: isDarkMode ? "rgb(18,18,18, 0.5)" : "rgba(0,114,227,0.66)",
                backdropFilter: "blur(10px)",
                WebkitBackdropFilter: "blur(10px)",
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.3s ease-in-out",
            }}
        >
            <Container disableGutters>
                <Toolbar>
                    <MainLabel/>

                    <Box sx={{flexGrow: 1}}/>

                    <Box
                        elevation={0}

                        sx={{
                            position: "absolute",
                            top: 70,
                            right: '7%',
                            width: "48px",
                            height: "48px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "25%",
                            border: "1px solid",
                            borderColor: isDarkMode ? "rgb(18,18,18, 0.5)" : "rgba(47,155,255,0.53)",
                            backgroundColor: "rgba(255, 255, 255, 0.3)",

                            opacity: isVisible ? 1 : 0,
                            visibility: isVisible ? "visible" : "hidden",
                            transition: "opacity 0.3s ease-in-out, visibility 0.3s ease-in-out",
                        }}
                    >
                        <ThemeSwitcher
                            sx={{m: 1}}
                            checked={isDarkMode}
                            onChange={toggleTheme}
                        />
                    </Box>

                    <HomeButton/>

                    <AvatarMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}