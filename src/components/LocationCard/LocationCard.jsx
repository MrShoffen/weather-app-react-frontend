import {Button, Card, CardActions, CardContent, CardMedia, Divider} from "@mui/material";
import Typography from "@mui/material/Typography";
import {hasFlag} from 'country-flag-icons'

export default function LocationCard({location}) {
    return (
        <Card sx={{
            minWidth: 300,
            minHeight: 200,

        }}
              elevation={3}
        >
            <CardContent sx={{textAlign: "left", fontSize: 16}}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    {location.name}
                    <img
                        alt="United States"
                        src={
                            "http://purecatamphetamine.github.io/country-flag-icons/3x2/" +
                            location.country +
                            ".svg"
                        }
                        width="30"
                        style={{ marginLeft: "8px" }}
                    />
                </Typography>

                <Typography variant="body2" sx={{fontSize: 16}}>
                    Country:{' '}
                    <span style={{fontWeight: 500}}>{location.country}</span>
                </Typography>

                <Typography variant="body2" sx={{fontSize: 16}}>
                    State:{' '}
                    <span style={{fontWeight: 500}}>{location.state}</span>
                </Typography>

                <Divider sx={{mt: 1, mb: 1}}/>

                <Typography variant="body2" sx={{fontSize: 16, color: "text.secondary"}}>
                    Latitude:{' '}
                    <span style={{fontWeight: 500}}>{location.lat}</span>
                </Typography>
                <Typography variant="body2" sx={{fontSize: 16, color: "text.secondary"}}>
                    Longitude:{' '}
                    <span style={{fontWeight: 500}}>{location.lon}</span>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
}