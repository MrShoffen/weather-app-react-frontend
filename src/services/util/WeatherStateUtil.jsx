

export const isDay = (weather) => {

    return weather && weather.weather[0].icon.endsWith("d");
}

export const isCloudy = (weather) => {
    return weather && weather.clouds.all > 60
}

export const windDirection = (weather) => {
    const wind = weather.wind.deg;
    if (!weather.wind.speed) {
        return '';
    }

    if (wind > 337 || wind <= 22) {
        return 'N';
    } else if (wind > 22 && wind <= 67) {
        return 'NE';
    } else if (wind > 67 && wind <= 112) {
        return 'E';
    } else if (wind > 112 && wind <= 157) {
        return 'SE';
    } else if (wind > 157 && wind <= 202) {
        return 'S';
    } else if (wind > 202 && wind <= 247) {
        return 'SW';
    } else if (wind > 247 && wind <= 292) {
        return 'W';
    } else if (wind > 292 && wind <= 337) {
        return 'NW';
    }

}