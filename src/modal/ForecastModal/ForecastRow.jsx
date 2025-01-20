import {Box, Divider} from "@mui/material";
import ForecastCell from "./ForecastCell.jsx";
import React from "react";
import Typography from "@mui/material/Typography";

export default function ForecastRow({row}) {


    return (
        <>
           <Box>
               <Typography variant="h6" textAlign='center' component="div" >
                   {row[0].date}
               </Typography>
           </Box>
        <Box
        sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            gap: "5px",
            padding: "5px 0",
            "&::-webkit-scrollbar": {
                height: "6px",
            },
            "&::-webkit-scrollbar-thumb": {
                backgroundColor: 'divider',
                borderRadius: "10px",
            },
        }}
        >

            {
                row.map((weather) =>
                    <ForecastCell weather={weather}/>
                )

            }
        </Box>
            <Divider />
        </>
    )
}