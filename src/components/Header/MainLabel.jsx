import Typography from "@mui/material/Typography";
import CloudIcon from '@mui/icons-material/Cloud';
import {useNavigate} from "react-router-dom";

export default function MainLabel() {
    const navigate = useNavigate();

    return (
            <Typography
                variant="h6"
                noWrap
                component="a"
                onClick={() => {
                    navigate("/weather-app/");
                }}
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
                        cursor: 'pointer',
                    },
                }}
            >
                <CloudIcon sx={{display: 'flex', mr: 1,mt: "3px",}}/>
                WEATHER
            </Typography>
    )
}