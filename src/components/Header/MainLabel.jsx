import Typography from "@mui/material/Typography";
import CloudIcon from '@mui/icons-material/Cloud';

export function MainLabel() {
    return (
            <Typography
                variant="h5"
                noWrap
                component="a"
                href="/"
                sx={{
                    mr: 2,
                    display: 'flex',
                    fontWeight: 700,
                    letterSpacing: '.2rem',
                    color: 'inherit',
                    textDecoration: 'none',
                    '&:hover': {
                        color: 'inherit', // Указываем, что цвет не должен меняться при наведении
                        textDecoration: 'none', // Убираем любые дополнительные изменения декорации ссылки
                    },
                }}
            >
                <CloudIcon sx={{display: 'flex', mr: 1,mt: "3px",}}/>
                WEATHER
            </Typography>
    )
}