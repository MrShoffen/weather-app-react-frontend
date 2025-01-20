import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import {sendLogout} from "../../services/fetch/auth/SendLogout.js";
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import {Collapse, Divider, Drawer, Slide, Zoom} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ProfileModal from '../../modal/ProfileModal/ProfileModal.jsx'
import KeyIcon from '@mui/icons-material/Key';
import sunset from "../../assets/img/weather-state/sunset.svg"
import SecurityModal from "../../modal/SecurityModal/SecurityModal.jsx";
import {useCustomThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";
import {ThemeSwitcher} from "./ThemeSwitcher.jsx";
import {useNotification} from "../../context/Notification/NotificationProvider.jsx";


export default function AvatarMenu() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();
    const {auth, logout} = useAuthContext();
    const [loading, setLoading] = useState(false);

    const {isDarkMode, toggleTheme, isVisible} = useCustomThemeContext();


    const {showNotification} = useNotification();

    const handleLogout = async () => {
        try {
            setLoading(true);
            await sendLogout();
            logout();
            setTimeout(() => {
                navigate("/weather-app/login");
                showNotification({
                    message: "You've successfully logged out.",
                    severity: "info"
                });
            }, 400);



            handleCloseUserMenu()
        } catch (error) {
            console.log('Unknown error occurred! ');
        }
        setLoading(false);
    };

    const {windowWidth} = useCustomThemeContext();
    const isSmallScreen = windowWidth <= 900;

    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const handleProfile = async () => {
        setProfileModalOpen(true);
    }
    const handleCloseProfileModal = () => {
        setProfileModalOpen(false);
    };


    const [isSecurityModalOpen, setSecurityModalOpen] = useState(false);
    const handleSecurity = async () => {
        setSecurityModalOpen(true);
    }
    const handleCloseSecurityModal = () => {
        setSecurityModalOpen(false);
    };

    if (loading) {
        return <img src={sunset} alt style={{height: '60px'}}/>

    }

    function getAvatarMenu() {
        return <>
            <MenuItem key='Profile' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={handleProfile}>
                <Typography sx={{textAlign: 'center'}}>Profile</Typography>
                <AccountBoxIcon/>
            </MenuItem>
            <MenuItem key='Security' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={handleSecurity}>
                <Typography sx={{textAlign: 'center'}}>Security</Typography>
                <KeyIcon/>
            </MenuItem>
            <Divider/>
            <MenuItem key='Theme' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={toggleTheme}>
                <Typography sx={{textAlign: 'center'}}>Theme</Typography>
                <ThemeSwitcher
                    checked={isDarkMode}
                />
            </MenuItem>

            <Divider/>
            <MenuItem key='Logout' style={{display: 'flex', justifyContent: 'space-between'}} onClick={handleLogout}>
                <Typography sx={{textAlign: 'center'}}>Logout</Typography>
                <LogoutIcon/>
            </MenuItem>
        </>;
    }

    function getAuthMenu() {
        return <>
            <MenuItem key='Profile' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={() => {
                          navigate("/weather-app/login");
                          handleCloseUserMenu()
                      }}>
                <Typography sx={{textAlign: 'center', marginLeft: '5px'}}>Sign in</Typography>
                <LoginIcon/>
            </MenuItem>
            <Divider/>

            <MenuItem key='Logout' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={() => {
                          navigate("/weather-app/registration");
                          handleCloseUserMenu()
                      }}>

                <Typography sx={{textAlign: 'center', marginLeft: '5px'}}>Sign up</Typography>
                <PersonAddIcon/>
            </MenuItem>

            <Divider/>
            <MenuItem key='Theme' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={toggleTheme}>
                <Typography sx={{textAlign: 'center'}}>Theme</Typography>
                <ThemeSwitcher
                    checked={isDarkMode}
                />
            </MenuItem>
        </>;
    }

    function getIcon() {
        return auth.isAuthenticated
            ? <Avatar alt={auth.user.username}
                      style={{width: 42, height: 42}}
                      src={auth.user.avatarUrl}>
                {auth.user.username.slice(0, 2)}
            </Avatar>
            : <MenuIcon/>
    }

    return (
        <Box sx={{flexGrow: 0, mr: 2}}>
            <Tooltip title={auth.isAuthenticated ? "Home" : "Authenticate"}>
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    {getIcon()}
                </IconButton>
            </Tooltip>

            {isSmallScreen ?
                <Drawer
                    anchor='right'
                    id="menu-appbar"

                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {
                        auth.isAuthenticated
                            ? getAvatarMenu()
                            : getAuthMenu()
                    }
                </Drawer>
                :
                <Menu
                    sx={{
                        mt: '53px',
                        "& .MuiPaper-root": {
                            width: "140px",
                        },
                        zIndex: 2
                    }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    TransitionComponent={Slide}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    {
                        auth.isAuthenticated
                            ? getAvatarMenu()
                            : getAuthMenu()
                    }
                </Menu>
            }

            <ProfileModal open={isProfileModalOpen} onClose={handleCloseProfileModal}/>
            <SecurityModal open={isSecurityModalOpen} onClose={handleCloseSecurityModal}/>
        </Box>
    )
}