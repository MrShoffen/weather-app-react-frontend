import LoadingButton from "@mui/lab/LoadingButton";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";


export default function DeleteLocationButton({onDelete, locationId}) {

    return (
        <LoadingButton size="small"
                       variant="outlined"
                       sx={{
                           position: 'absolute',
                           top: 11,
                           right: 8.5,
                           border: '2px solid',
                           borderColor: 'error.main',
                           color: 'error.main',
                           padding: 0,
                           opacity: 0.8,
                           '&:hover': {
                               backgroundColor: 'rgba(255,32,32,0.11)',
                               boxShadow: 5

                           },
                       }}
                       onClick={() => {
                           onDelete(locationId);
                       }}

        >
            <DeleteIcon style={{fontSize: 16, padding: 0}}/>
        </LoadingButton>
    )
}