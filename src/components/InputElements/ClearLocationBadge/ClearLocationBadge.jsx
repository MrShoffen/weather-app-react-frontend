import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import React from "react";


export default function ClearLocationBadge({locationNameForSearch, handleReset}) {

    return (
        <Box className={"locationDeleteBadge"}
             sx={{
                 display: 'flex',
                 alignItems: 'center',
                 width: '150px',
                 height: '40px',
                 justifyContent: 'space-between',
                 mt: 2,
                 p: 1,
                 opacity: 0.9,
                 backgroundColor: 'text.disabled',
                 borderRadius: '8px',
                 position: 'absolute',
                 right: '16px',
                 top: '110px',
                 maxWidth: '150px',
                 overflow: 'hidden',
                 border: '1px solid',
                 borderColor: "divider",

             }}
        >
            <Typography
                sx={{
                    fontSize: 16,
                    fontWeight: 500,
                    mr: 1,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                }}
            >
                {locationNameForSearch}
            </Typography>
            <IconButton size="small" onClick={handleReset}
                        sx={{
                            mr: -1.5,
                            '&:hover': {
                                backgroundColor: 'transparent',
                                transform: 'scale(1.1)',
                            },
                            '&:active': {
                                backgroundColor: 'transparent',
                            },
                            '&:focus': {
                                outline: 'none',

                            },
                        }}>
                <CloseIcon fontSize="small"/>
            </IconButton>
        </Box>
    )
}