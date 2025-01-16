import {Button} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {sendFindLocations} from "../../services/SendFindLocations.js";
import WeatherApiException from "../../exception/WeatherApiException.jsx";
import {sendSaveLocation} from "../../services/SendSaveLocation.js";
import LocationAlreadySavedException from "../../exception/LocationAlreadySavedException.jsx";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import {IsoSharp} from "@mui/icons-material";
import CheckIcon from '@mui/icons-material/Check';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import {sendGetWeather} from "../../services/SendGetWeather.js";

function locationAlreadySaved(location, alreadySaved) {
    return alreadySaved.some(item => {
        return item.location.lat === location.lat && item.location.lon === location.lon;
    })
    return false;
}

async function updateSavedLocations(location, setAlreadySaved) {

}

export default function ToFavoriteButton({
                                             location,
                                             isSaved,
                                             setIsSaved,
                                             alreadySavedLocations,
                                             setAlreadySavedLocations
                                         }) {
    const [isLoading, setIsLoading] = useState(false);

    const alreadySaved = locationAlreadySaved(location, alreadySavedLocations);

    const handleSubmit = async () => {

        setIsLoading(true);
        try {
            const savedLocation = await sendSaveLocation(location);


            const weatherForSaved = await sendGetWeather(savedLocation.lat, savedLocation.lon);


            setAlreadySavedLocations([...alreadySavedLocations, {location: savedLocation, weather: weatherForSaved}]);

        } catch (error) {
            switch (true) {
                case error instanceof LocationAlreadySavedException:
                    break;
                default:
                    alert('Unknown error occurred! ');
                    window.location.reload();
            }
        }

        setTimeout(() => {
            setIsLoading(false);
            setIsSaved(true);
        }, 500);
        console.log("saved location", alreadySavedLocations);
    };


    return (
        <LoadingButton size="small"
                       variant="contained"
                       onClick={handleSubmit}
                       loading={isLoading}
                       style={{
                           position: 'absolute',
                           bottom: 11,
                           right: 8.5,
                           paddingRight: 35,
                       }}
                       sx={{
                           backgroundColor: isSaved || alreadySaved ? 'success.main' : 'primary.dark',
                           ...((isSaved || alreadySaved) && {
                               pointerEvents: 'none', // Дополнительно игнорируем клики

                           })
                       }}

        >

            {isSaved || alreadySaved ?
                (
                    <>saved
                        <CheckIcon style={{fontSize: 16, position: 'absolute', right: 0, top: -3}}/>
                    </>
                )
                :
                (<>save
                        <FavoriteIcon style={{fontSize: 16, position: 'absolute', right: 0, top: -3}}/>
                    </>
                )
            }
        </LoadingButton>
    )
}