import * as React from 'react';
import Box from '@mui/material/Box';
import '../InputElements/FadeAnimation.css'
import CloseIcon from '@mui/icons-material/Close';
import IconButton from "@mui/material/IconButton";
import {Zoom} from "@mui/material";

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
export default function InformationBadge({message, type}) {

    if (message) {
        const [isVisible, setIsVisible] = React.useState(true);

        const handleClose = () => {
            setIsVisible(false);
        };

        return (

            <Zoom in={isVisible} unmountOnExit>

                <Box
                    sx={{
                        position: 'relative',
                        backgroundColor: backgroundColors[type],
                        color: colors[type],
                        fontWeight: "500",
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

            </Zoom>

        );
    }

}
