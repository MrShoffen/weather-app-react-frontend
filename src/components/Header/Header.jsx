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
    const { isVisible} = useCustomThemeContext();

    return (
        <AppBar
            component="nav"
            position="fixed"
            elevation={0}
            sx={{
                borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
                transform: isVisible ? "translateY(0)" : "translateY(-100%)",
                transition: "transform 0.3s linear",
                boxShadow:  5,
                height: "65px",
            }}
        >
            <Container disableGutters>
                <Toolbar  sx={{height: "65px"}} disableGutters>
                    <MainLabel/>

                    <Box sx={{flexGrow: 1, height: 1}}/>



                    <HomeButton/>

                    <AvatarMenu/>
                </Toolbar>
            </Container>
        </AppBar>
    );
}