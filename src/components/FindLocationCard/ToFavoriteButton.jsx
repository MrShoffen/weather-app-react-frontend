import FavoriteIcon from "@mui/icons-material/Favorite";
import {sendSaveLocation} from "../../services/fetch/auth/SendSaveLocation.js";
import LocationAlreadySavedException from "../../exception/LocationAlreadySavedException.jsx";
import {useState} from "react";
import LoadingButton from "@mui/lab/LoadingButton";
import CheckIcon from '@mui/icons-material/Check';
import {sendGetWeather} from "../../services/fetch/unauth/SendGetWeather.js";
import {useAuthContext} from "../../context/Auth/AuthContext.jsx";
import {locationAlreadySaved} from "../../services/util/LocationsUtil.jsx";


export default function ToFavoriteButton({
                                             location,
                                             isSaved,
                                             setIsSaved,
                                         }) {
    const {savedLocations, setSavedLocations} = useAuthContext();

    const isAlreadySaved = locationAlreadySaved(location, savedLocations);

    const [isLoading, setIsLoading] = useState(false);

    const handleSaveLocation = async () => {
        setIsLoading(true);
        try {
            const savedLocation = await sendSaveLocation(location);
            const weatherForSaved = await sendGetWeather(savedLocation.lat, savedLocation.lon);
            setSavedLocations([...savedLocations, {location: savedLocation, weather: weatherForSaved}]);
        } catch (error) {
            switch (true) {
                case error instanceof LocationAlreadySavedException:
                    console.log(error);
                    break;
                default:
                    console.log('Unknown error occurred! ');
                    window.location.reload();
            }
        }
        setTimeout(() => {
            setIsLoading(false);
            setIsSaved(true);
        }, 500);
    };

    return (
        <LoadingButton
            size="small"
            variant="contained"
            onClick={handleSaveLocation}
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
                    pointerEvents: 'none',
                })
            }}
        >
            {isSaved || isAlreadySaved ?
                (<>saved<CheckIcon style={{fontSize: 16, position: 'absolute', right: 0, top: -3}}/></>)
                :
                (<>save<FavoriteIcon style={{fontSize: 16, position: 'absolute', right: 0, top: -3}}/></>)
            }
        </LoadingButton>
    )
}