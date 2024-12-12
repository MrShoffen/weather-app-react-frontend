import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as React from "react";
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


export function AvatarMenu() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const {auth} = useAuth();

    const navigate = useNavigate();

    const {logout} = useAuth();

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = async () => {

        try {
            await sendLogout();
            logout();
            navigate("/login");
        } catch (error) {
            alert('Unknown error occurred! ');
        }


    };

    function getAvatarMenu() {
        return <>
            <MenuItem key='Profile' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={handleCloseUserMenu}>
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
                      onClick={() => {navigate("/login") ; handleCloseUserMenu()}}>
                <Typography sx={{textAlign: 'center', marginLeft: '5px'}}>Sign in</Typography>
                <LoginIcon/>
            </MenuItem>
            <Divider/>

            <MenuItem key='Logout' style={{display: 'flex', justifyContent: 'space-between'}}
                      onClick={() => {navigate("/registration") ; handleCloseUserMenu()}}>

                <Typography sx={{textAlign: 'center', marginLeft: '5px'}}>Sign up</Typography>
                <PersonAddIcon/>
            </MenuItem>
        </>;
    }

    return (
        <Box sx={{flexGrow: 0}}>
            <Tooltip title={auth.isAuthenticated ? "Profile" : "Authenticate"}>
                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                    {
                        auth.isAuthenticated
                            ? <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                            : <MenuIcon/>
                    }
                </IconButton>
            </Tooltip>


            <Menu
                sx={{
                    mt: '45px',
                    "& .MuiPaper-root": {
                        width: "140px", // Установка ширины меню
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
        </Box>
    )
}