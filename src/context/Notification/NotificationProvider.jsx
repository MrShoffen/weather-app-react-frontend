import React, {createContext, useContext, useState} from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import {Slide} from "@mui/material";
import {useCustomThemeContext} from "../CustomTheme/CustomThemeContext.jsx";


const backgroundColors = {
    success: "rgba(76,175,80,0.71)",
    info: "rgba(33,150,243,0.71)",
    error: "rgba(244,67,54,0.71)",
    warning: "rgba(255,152,0,0.71)",
};

const colors = {
    info: "#1976d2",
    error: "#c60b28",
    success: "rgb(76,175,80)",
    warning: "rgb(255,152,0)",
}
const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

function SlideTransition(props) {
    const {windowWidth} = useCustomThemeContext();
    const isSmall = windowWidth < 1050;
    return <Slide {...props} direction={isSmall ? "up" : "down"}/>;
}


export const NotificationProvider = ({children}) => {
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'info',
    });


    const showNotification = ({message, severity = 'info', duration = 90000}) => {
        setNotification({
            open: true,
            message,
            severity,
        });

        setTimeout(() => {
            setNotification((prev) => ({...prev, open: false}));
        }, duration);
    };


    const closeNotification = () => {
        setNotification((prev) => ({...prev, open: false}));
    };

    const {windowWidth} = useCustomThemeContext();


    const isSmall = windowWidth < 1050;

    const smallStyle = {
        marginBottom: 7,
    }

    const bigStyle = {
        marginTop: 7,
    }

    const showWarn = (warning) => {
        showNotification({
            message: warning,
            severity: 'warning',
        })
    }

    return (
        <NotificationContext.Provider value={{showNotification, showWarn}}>
            {children}

            {/* Snackbar с уведомлением */}
            <Snackbar
                open={notification.open}

                onClose={closeNotification}
                anchorOrigin={{vertical: isSmall ? 'bottom' : 'top', horizontal: 'right'}}
                sx={isSmall ? smallStyle : bigStyle}
                TransitionComponent={SlideTransition}
            >

                <Alert
                    variant='filled'

                    onClose={closeNotification}
                    severity={notification.severity}
                    sx={{
                        width: '100%',
                        fontSize: '15px',
                        alignItems: 'center',
                        backgroundColor: backgroundColors[notification.severity],
                        borderColor: colors[notification.severity],
                        color: 'text.secondary',


                    }}
                >
                    {notification.message}
                </Alert>

            </Snackbar>
        </NotificationContext.Provider>
    );
};
