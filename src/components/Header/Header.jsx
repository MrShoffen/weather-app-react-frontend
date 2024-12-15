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
        <AppBar component="nav">
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