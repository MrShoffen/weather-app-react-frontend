import * as React from 'react';
import Box from '@mui/material/Box';
import '../InputElements/FadeAnimation.css'
import CloseIcon from '@mui/icons-material/Close';
import {useLocation} from 'react-router-dom';
import IconButton from "@mui/material/IconButton";

const backgroundColors = {
    success: "rgba(76, 175, 80, 0.2)",
    info: "rgba(33, 150, 243, 0.1)",
    error: "rgba(244, 67, 54, 0.2)",
    warning: "rgba(255, 152, 0, 0.2)",
};

const colors = {
    info: "#1976d2",
    error: "#c60b28"
}
export default function PrevPageInfoBadge() {
    const location = useLocation();
    const type = location.state?.type;
    const message = location.state?.message;

    if (message) {
        const [isVisible, setIsVisible] = React.useState(!!message);


        const handleClose = () => {
            setIsVisible(false);
        };

        return (
            <>
                {isVisible && (
                    <Box
                        sx={{
                            position: 'relative',
                            backgroundColor: backgroundColors[type],
                            color: colors[type],
                            fontWeight: "bold",
                            padding: 2,
                            marginBottom: 2,
                            textAlign: "center",
                            borderRadius: "4px",
                            border: "1px solid",
                            borderColor: colors[type]
                        }}
                    >
                        {message}

                        <IconButton
                            aria-label="close"
                            size="small"
                            onClick={handleClose}

                            sx={{
                                position: 'absolute',
                                top: 3,
                                right: 3,
                                width: '15px',
                                height: '15px',
                                color: colors[type]
                            }}
                        >
                            <CloseIcon sx={{fontSize: '17px'}}/>
                        </IconButton>
                    </Box>
                )}
            </>
        );
    }
}
