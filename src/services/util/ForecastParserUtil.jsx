import {DateTime} from "luxon";


export default function parseWeatherData(data) {

    const offset = data.timezone;
    const format = "yyyy-MM-dd HH:mm:ss";
    data.list.forEach(item => {
        const date = item.dt_txt;
        let localTime = DateTime.fromFormat(date, format, {zone: 'utc'});
        // console.log(localTime.toString());
        if (offset !== 'Z') {
            localTime = localTime.setZone(offset);
        }
        // console.log(localTime.toFormat("dd.MM HH:mm").toString());

        item.dt_txt = localTime.toFormat("dd.MM HH:mm").toString();
    })

    const dailyWeather = {};

    // Пройдем по каждому объекту в `list` входных данных
    data.list.forEach((entry) => {
        // Извлекаем только дату (YYYY-MM-DD) из `dt_txt`
        const date = entry.dt_txt.split(" ")[0];
        console.log(date);


        const time = entry.dt_txt.split(" ")[1];
        // Если для этой даты массива еще нет, инициализируем его
        if (!dailyWeather[date]) {
            dailyWeather[date] = [];
        }

        // Добавляем запись о погоде к соответствующему дню
        dailyWeather[date].push({
            ...entry,
            time: time,
            date: date
        });
    });

    // Преобразуем объект в массив массивов
    const values = Object.values(dailyWeather);

    values.map(item => {
        console.log(item);
    })

    return values;
}