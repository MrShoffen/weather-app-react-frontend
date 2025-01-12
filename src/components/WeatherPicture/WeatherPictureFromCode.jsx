import sunset from '../../assets/img/weather-state/sunset.svg'
import clearDay from '../../assets/img/weather-state/clear-day.svg'
import clearNight from '../../assets/img/weather-state/clear-night.svg'

import partlyCloudyDay from '../../assets/img/weather-state/partly-cloudy-day.svg'
import partlyCloudyNight from '../../assets/img/weather-state/partly-cloudy-night.svg'

import cloudy from '../../assets/img/weather-state/cloudy.svg'
import hardlyCloudy from '../../assets/img/weather-state/hardly-cloudy.svg'

import mist from '../../assets/img/weather-state/mist.svg'

import smokeCloud from '../../assets/img/weather-state/smoke.svg';
import smokeDay from '../../assets/img/weather-state/overcast-day-smoke.svg'
import smokeNight from '../../assets/img/weather-state/overcast-night-smoke.svg'

import hazeCloud from '../../assets/img/weather-state/haze.svg'
import hazeDay from '../../assets/img/weather-state/haze-day.svg';
import hazeNight from '../../assets/img/weather-state/haze-night.svg'

import dustWhirl from '../../assets/img/weather-state/dust-wind.svg'
import sandDay from '../../assets/img/weather-state/dust-day.svg'
import sandNight from '../../assets/img/weather-state/dust-night.svg'
import sandCloud from '../../assets/img/weather-state/dust.svg'

import fogCloud from '../../assets/img/weather-state/fog.svg'
import fogNight from '../../assets/img/weather-state/partly-cloudy-night-fog.svg'
import fogDay from '../../assets/img/weather-state/partly-cloudy-day-fog.svg'

import tornado from '../../assets/img/weather-state/tornado.svg'
import ash from '../../assets/img/weather-state/smoke-particles.svg'

function dayPicture(code) {

    switch (code) {
        case 800:
            return clearDay;
        case 801:
        case 802:
            return partlyCloudyDay;
        case 803:
            return cloudy;
        case 804:
            return hardlyCloudy;
        case 701:
            return mist;
        case 711:
            return smokeDay;
        case 721:
            return hazeDay;
        case 731:
            return dustWhirl;
        case 741:
            return fogDay;
        case 751:
            return sandDay;
        case 761:
            return sandCloud;
        case 762:
            return ash;
        case 771:
            return;
        case 781:
            return tornado;

    }


}

function nightPicture(code) {

    switch (code) {
        case 800:
            return clearDay;
        case 801:
        case 802:
            return partlyCloudyDay;
        case 803:
            return cloudy;
        case 804:
            return hardlyCloudy;
        case 701:
            return mist;
        case 711:
            return smokeNight;
        case 721:
            return hazeNight;
        case 731:
            return dustWhirl;
        case 741:
            return fogNight;
        case 751:
            return sandNight;
        case 761:
            return sandCloud;
        case 762:
            return ash;
        case 771:
            return;
        case 781:
            return tornado;


    }


}

function cloudPicture(code, isDay) {
    switch (code) {
        case 800:
        case 801:
        case 802:
        case 803:
        case 804:
        case 701:
            return isDay ? dayPicture(code, isDay) : nightPicture(code, isDay);
        case 711:
            return smokeCloud;
        case 721:
            return hazeCloud;
        case 731:
            return dustWhirl;
        case 741:
            return fogCloud;
        case 751:
        case 761:
            return sandCloud;
        case 762:
            return ash;
        case 771:
            return;
        case 781:
            return tornado;



    }
}

export default function WeatherPictureFromCode(code, isDay, isCloudy) {
    if (isCloudy) {
        return cloudPicture(code, isDay);
    } else if (isDay) {
        return dayPicture(code);
    } else {
        return nightPicture(code);
    }
}