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
import squall from '../../assets/img/weather-state/squall.svg'

import lightSnowDay from '../../assets/img/weather-state/partly-cloudy-day-snow.svg'
import lightSnowNight from '../../assets/img/weather-state/partly-cloudy-night-snow.svg'

import snowCloud from '../../assets/img/weather-state/overcast-snow.svg'
import snowNight from '../../assets/img/weather-state/overcast-night-snow.svg'
import snowDay from '../../assets/img/weather-state/overcast-day-snow.svg'

import heavySnow from '../../assets/img/weather-state/heavySnow.svg'

import heavySleet from '../../assets/img/weather-state/overcast-sleet.svg'

import sleetCloud from '../../assets/img/weather-state/sleet.svg'
import sleetNight from '../../assets/img/weather-state/partly-cloudy-night-sleet.svg'
import sleetDay from '../../assets/img/weather-state/partly-cloudy-day-sleet.svg'

import showerSnow from '../../assets/img/weather-state/shower-snow.svg'
import showerSnowHard from '../../assets/img/weather-state/showe-snow-hard.svg'

import showerRainCloud from '../../assets/img/weather-state/extreme-rain.svg'
import showerRainDay from '../../assets/img/weather-state/extreme-day-rain.svg'
import showerRainNight from '../../assets/img/weather-state/extreme-night-rain.svg'

import hailCloud from '../../assets/img/weather-state/extreme-hail.svg'
import hailDay from '../../assets/img/weather-state/extreme-day-hail.svg'
import hailNight from '../../assets/img/weather-state/extreme-night-hail.svg'

import lightRainCloud from '../../assets/img/weather-state/rain.svg'
import lightRainDay from '../../assets/img/weather-state/partly-cloudy-day-rain.svg'
import lightRainNight from '../../assets/img/weather-state/partly-cloudy-night-rain.svg'

import mediumRainCloud from '../../assets/img/weather-state/overcast-rain.svg'
import mediumRainDay from '../../assets/img/weather-state/overcast-day-rain.svg'
import mediumRainNight from '../../assets/img/weather-state/overcast-night-rain.svg'

import drizzleCloud from '../../assets/img/weather-state/overcast-drizzle.svg'
import drizzleDay from '../../assets/img/weather-state/overcast-day-drizzle.svg'
import drizzleNight from '../../assets/img/weather-state/overcast-night-drizzle.svg'

import thunderCloud from '../../assets/img/weather-state/thunderstorms-extreme-rain.svg'
import thunderDay from '../../assets/img/weather-state/thunderstorms-day-extreme-rain.svg'
import thunderNight from '../../assets/img/weather-state/thunderstorms-night-extreme-rain.svg'

import thunder from '../../assets/img/weather-state/thunderstorms.svg'

import notFound from '../../assets/img/weather-state/not-available.svg'

export default function weatherStatePictureFromCode(code, isDay, isCloudy) {
    if (isCloudy === true) {
        return cloudPicture(code, isDay);
    }
    if (isDay === true) {
        return dayPicture(code);
    }

    return nightPicture(code);
}

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
            return squall;
        case 781:
            return tornado;

        case 600:
            return lightSnowDay;
        case 601:
            return snowDay;
        case 602:
            return heavySnow;
        case 611:
        case 612:
        case 615:
            return sleetDay;
        case 613:
        case 616:
            return heavySleet;
        case 620:
        case 621:
            return showerSnow;
        case 622:
            return showerSnowHard;

        case 500:
        case 501:
            return lightRainDay;
        case 502:
        case 503:
        case 504:
            return mediumRainDay;
        case 511:
            return hailDay;
        case 520:
        case 521:
        case 522:
        case 531:
            return showerRainDay;


        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return drizzleDay;


        case 210:
        case 211:
        case 212:
        case 221:
            return thunder;

        case 200:
        case 201:
        case 202:
        case 230:
        case 231:
        case 232:
            return thunderDay;


        default:
            return notFound;

    }

}

function nightPicture(code) {


    switch (code) {
        case 800:
            return clearNight;
        case 801:
        case 802:
            return partlyCloudyNight;
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
            return squall;
        case 781:
            return tornado;

        case 600:
            return lightSnowNight;
        case 601:
            return snowNight;
        case 602:
            return heavySnow;
        case 611:
        case 612:
        case 615:
            return sleetNight;
        case 613:
        case 616:
            return heavySleet;
        case 620:
        case 621:
            return showerSnow;
        case 622:
            return showerSnowHard;

        case 500:
        case 501:
            return lightRainNight;
        case 502:
        case 503:
        case 504:
            return mediumRainNight;
        case 511:
            return hailNight;
        case 520:
        case 521:
        case 522:
        case 531:
            return showerRainNight;

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return drizzleNight;

        case 210:
        case 211:
        case 212:
        case 221:
            return thunder;

        case 200:
        case 201:
        case 202:
        case 230:
        case 231:
        case 232:
            return thunderNight;


        default:
            return notFound;

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
            return isDay ? dayPicture(code) : nightPicture(code);
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
            return squall;
        case 781:
            return tornado;

        case 600:
            return snowCloud;
        case 601:
            return snowCloud;
        case 602:
            return heavySnow;
        case 611:
        case 612:
        case 615:
            return sleetCloud;
        case 613:
        case 616:
            return heavySleet;
        case 620:
        case 621:
            return showerSnow;
        case 622:
            return showerSnowHard;

        case 500:
        case 501:
            return lightRainCloud;
        case 502:
        case 503:
        case 504:
            return mediumRainCloud;
        case 511:
            return hailCloud;
        case 520:
        case 521:
        case 522:
        case 531:
            return showerRainCloud;

        case 300:
        case 301:
        case 302:
        case 310:
        case 311:
        case 312:
        case 313:
        case 314:
        case 321:
            return drizzleCloud;

        case 210:
        case 211:
        case 212:
        case 221:
            return thunder;

        case 200:
        case 201:
        case 202:
        case 230:
        case 231:
        case 232:
            return thunderCloud;


        default:
            return notFound;

    }

}
