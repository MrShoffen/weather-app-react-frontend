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
import {Divider} from "@mui/material";
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ProfileModal from '../ProfileModal/ProfileModal.jsx'
import {API_BASE_URL} from "../../UrlConstants.jsx";


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
    const handleLogout = async () => {
        try {
            await sendLogout();
            logout();
            setTimeout(() => navigate("/login"), 200)
        } catch (error) {
            alert('Unknown error occurred! ');
        }
    };

    const [isProfileModalOpen, setProfileModalOpen] = useState(false);
    const handleCloseProfileModal = () => {
        setProfileModalOpen(false);
    };

    const handleProfile = async () => {
        setProfileModalOpen(true);
    }

    function getAvatarMenu() {
        return <>
            <MenuItem key='Profile' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={handleProfile}>
                <Typography sx={{textAlign: 'center'}}>Profile</Typography>
                <AccountBoxIcon/>
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
                          navigate("/login");
                          handleCloseUserMenu()
                      }}>
                <Typography sx={{textAlign: 'center', marginLeft: '5px'}}>Sign in</Typography>
                <LoginIcon/>
            </MenuItem>
            <Divider/>

            <MenuItem key='Logout' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={() => {
                          navigate("/registration");
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

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title={auth.isAuthenticated ? "Home" : "Authenticate"}>
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    {getIcon()}
                </IconButton>
            </Tooltip>

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

            <ProfileModal open={isProfileModalOpen} onClose={handleCloseProfileModal}/>
        </Box>
    )
}