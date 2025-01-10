import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {useState} from "react";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import {useAuth} from "../../context/Auth/AuthContext.jsx";
import {sendLogout} from "../../services/SendLogout.js";
import {useNavigate} from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import {Divider, Drawer, useMediaQuery} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ProfileModal from '../ProfileModal/ProfileModal.jsx'
import {API_BASE_URL} from "../../UrlConstants.jsx";
import LoadingPage from "../../pages/Loading/LoadingPage.jsx";
import LoadingButton from "@mui/lab/LoadingButton";
import KeyIcon from '@mui/icons-material/Key';
import sunset from "../../assets/img/weather-state/sunset.svg"
import SecurityModal from "../SecurityModal/SecurityModal.jsx";
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";


export default function AvatarMenu() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const navigate = useNavigate();
    const {auth, logout} = useAuth();
    const [loading, setLoading] = useState(false);

    const {isSmallScreen} = useThemeContext();

    const handleLogout = async () => {
        try {
            setLoading(true);
            await sendLogout();
            logout();
            setTimeout(() => navigate("/weather-app/login", {
                state: {
                    message: "You have successfully logged out.",
                    type: "info"
                },
            }), 400)

            handleCloseUserMenu()
        } catch (error) {
            alert('Unknown error occurred! ');
        }
        setLoading(false);
    };

    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const handleCloseProfileModal = () => {
        setProfileModalOpen(false);
    };

    const handleProfile = async () => {
        setProfileModalOpen(true);
    }


    const [isSecurityModalOpen, setSecurityModalOpen] = useState(false);
    const handleCloseSecurityModal = () => {
        setSecurityModalOpen(false);
    };

    const handleSecurity = async () => {
        setSecurityModalOpen(true);
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
        </>;
    }

    function getIcon() {
        return auth.isAuthenticated
            ? <Avatar alt={auth.user.username} src={API_BASE_URL + auth.user.avatarUrl}>
                {auth.user.username.slice(0, 2)}
            </Avatar>
            : <MenuIcon/>
    }



    if (loading) {
        return <img src={sunset} alt style={{height: '60px'}}/>

    }


    return (
        <Box sx={{flexGrow: 0}}>
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
                        mt: '45px',
                        "& .MuiPaper-root": {
                            width: "140px",
                        }
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