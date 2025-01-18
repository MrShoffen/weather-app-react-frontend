import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

export function locationAlreadySaved(locationForSave, savedLocations) {
    return savedLocations.some(item => {
        return item.location.lat === locationForSave.lat && item.location.lon === locationForSave.lon;
    })
}

export function locationListUpdated(savedLocations, fetchedLocationsFromServer) {
    if (savedLocations.length !== fetchedLocationsFromServer.length) {
        return true;
    }
    for (let i = 0; i < savedLocations.length; i++) {
        if (JSON.stringify(savedLocations[i].location) !== JSON.stringify(fetchedLocationsFromServer[i])) {
            return true;
        }
    }

    return false;
}

export function getFullCountryNameFromCode(code) {
    countries.registerLocale(enLocale);

    return countries.getName(code, "en");
}