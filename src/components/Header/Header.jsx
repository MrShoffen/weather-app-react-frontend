import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {ThemeSwitcher} from "./ThemeSwitcher.jsx";
import AvatarMenu from "./AvatarMenu.jsx";
import MainLabel from "./MainLabel.jsx";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import Box from "@mui/material/Box";


export default function Header() {
    const {isDarkMode, toggleTheme} = useThemeContext();

    return (
        <AppBar component="nav"
                elevation={0} // Убираем тень для "стеклянного" эффекта
                sx={{
                        backgroundColor: isDarkMode ? "rgb(18,18,18, 0.5)" : "rgba(0,114,227,0.66)", // Полупрозрачный фон
                        backdropFilter: "blur(10px)", // Эффект размытия
                        WebkitBackdropFilter: "blur(10px)", // Поддержка Safari
                        borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Лёгкая граница
                    }}
        >
            <Container disableGutters>
                <Toolbar>
                    <MainLabel/>

                    <Box sx={{flexGrow: 1,}}/>

                    <ThemeSwitcher
                        sx={{m: 1}}
                        checked={isDarkMode}
                        onChange={toggleTheme}
                    />
                    <AvatarMenu/>

                </Toolbar>
            </Container>
        </AppBar>

    );
}