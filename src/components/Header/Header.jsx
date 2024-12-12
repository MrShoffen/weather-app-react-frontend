import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import {MaterialUISwitch} from "./MaterialUISwitch.jsx";
import {AvatarMenu} from "./AvatarMenu.jsx";
import {MainLabel} from "./MainLabel.jsx";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import Box from "@mui/material/Box";
import {useAuth} from "../../context/Auth/AuthContext.jsx";


function Header() {
    const {isDarkMode, toggleTheme} = useThemeContext();

    const { auth } = useAuth();




    return (
        <AppBar component="nav">
            <Container disableGutters>
                <Toolbar>
                    <MainLabel/>

                    <Box sx={{flexGrow: 1,}}/>

                    <MaterialUISwitch
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

export default Header;