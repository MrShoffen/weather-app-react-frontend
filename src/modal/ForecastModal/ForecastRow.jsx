import {Box, Divider} from "@mui/material";
import ForecastCell from "./ForecastCell.jsx";
import React from "react";
import Typography from "@mui/material/Typography";

export default function ForecastRow({row}) {



    return (
        <>
           <Box>
               <Typography variant="h6" textAlign='center' component="div" >
                     {row  ? row[0].date : '...' }
               </Typography>
           </Box>
        <Box
        sx={{
            display: "flex",
            overflowX: "auto",
            whiteSpace: "nowrap",
            gap: "5px",
            padding: "3px",
            paddingLeft: '5px',
            paddingRight: '0px',
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
                row ?
                row.map((weather) =>
                    <ForecastCell weather={weather}/>
                ) :
                    <>
                        <ForecastCell/>
                        <ForecastCell/>
                        <ForecastCell/>
                        <ForecastCell/>
                        <ForecastCell/>
                        <ForecastCell/>
                        <ForecastCell/>
                        <ForecastCell/>
                    </>

            }
        </Box>
            <Divider />
        </>
    )
}