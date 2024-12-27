import './footer.css'
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import SportsTennisIcon from '@mui/icons-material/SportsTennis';
import {useThemeContext} from "../../context/CustomTheme/CustomThemeContext.jsx";

export default function Footer() {

    const {isDarkMode} = useThemeContext();

    return (
        <footer className="footer mt-auto py-3"
                style={{color: isDarkMode ? "#d2d2d2" : "#2c2c2c",
            backgroundColor: isDarkMode ? "rgb(18,18,18, 0.5)" : "rgba(255, 255, 255, 0.5)"}}
        >

            <span className="text-muted">2024 Roadmap:</span>
            <a className="contact_link" href="/currency-exchange"
               style={{position: "absolute", left: "132px"}}><CurrencyExchangeIcon/></a>

            <a className="contact_link" href="/tennis-scoreboard"
               style={{position: "absolute", left: "165px"}}><SportsTennisIcon/></a>

            <ul className="footer_links">
                <a href="https://t.me/MrShoffen" className="contact_link">
                    <TelegramIcon/>
                </a>

                <a href="https://github.com/MrShoffen" className="contact_link">
                    <GitHubIcon/>
                </a>

            </ul>

        </footer>
    )
}