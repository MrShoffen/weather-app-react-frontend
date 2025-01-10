import Typography from "@mui/material/Typography";
import CloudIcon from '@mui/icons-material/Cloud';

export default function MainLabel() {
    return (
            <Typography
                variant="h6"
                noWrap
                component="a"
                href="/weather-app/"
                sx={{
                    mr: 2,
                    marginTop: 1,
                    display: 'flex',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                        color: 'inherit',
                        textDecoration: 'none',
                    },
                }}
            >
                <CloudIcon sx={{display: 'flex', mr: 1,mt: "3px",}}/>
                WEATHER
            </Typography>
    )
}