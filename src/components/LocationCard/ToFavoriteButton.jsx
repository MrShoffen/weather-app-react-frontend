import FavoriteIcon from "@mui/icons-material/Favorite";
import {sendSaveLocation} from "../../services/fetch/SendSaveLocation.js";
import LocationAlreadySavedException from "../../exception/LocationAlreadySavedException.jsx";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from '@mui/icons-material/Check';
import {sendGetWeather} from "../../services/fetch/SendGetWeather.js";
import {useLocations} from "../../pages/Locations/SavedLocationsPage.jsx";

function locationAlreadySaved(location, alreadySaved) {
    return alreadySaved.some(item => {
        return item.location.lat === location.lat && item.location.lon === location.lon;
    })
    return false;
}

export default function ToFavoriteButton({
                                             location,
                                             isSaved,
                                             setIsSaved,
                                         }) {
    const {foundLocations, setFoundLocations} = useLocations();
    const isAlreadySaved = locationAlreadySaved(location, foundLocations);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {

        setIsLoading(true);
        try {
            const savedLocation = await sendSaveLocation(location);


            const weatherForSaved = await sendGetWeather(savedLocation.lat, savedLocation.lon);


            setFoundLocations([...foundLocations, {location: savedLocation, weather: weatherForSaved}]);

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
                           backgroundColor: isSaved || isAlreadySaved ? 'success.main' : 'primary.dark',
                           ...((isSaved || isAlreadySaved) && {
                               pointerEvents: 'none', // Дополнительно игнорируем клики

                           })
                       }}

        >

            {isSaved || isAlreadySaved ?
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