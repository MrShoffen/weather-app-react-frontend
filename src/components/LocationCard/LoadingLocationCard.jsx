import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, Skeleton} from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";


export default function LoadingLocationCard() {
    return (
        <Card sx={{
            minWidth: 300,
            minHeight: 230,
            maxHeight: 230,

        }}
              elevation={3}
        >
            <CardHeader
                avatar={
                    <Skeleton animation="wave" variant="circular" width={40} height={40}/>
                }
                title={
                    <Skeleton
                        animation="wave"
                        height={10}
                        width="80%"
                        style={{marginBottom: 6}}
                    />
                }
                subheader={
                    <Skeleton animation="wave" height={9} width="40%"/>
                }
            />

                <Skeleton sx={{height: 95, marginRight: 2, marginLeft: 2}} animation="wave" variant="rectangular"/>

            <CardContent>

                    <React.Fragment>
                        <Skeleton animation="wave" height={10} style={{marginBottom: 6}}/>
                        <Skeleton animation="wave" height={10} width="80%"/>
                    </React.Fragment>

            </CardContent>

        </Card>
    );
}