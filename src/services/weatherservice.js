import { transformTimesTampToDate } from "../assets/transformTimesTemptoDate";

import { getDayString, getMonthString } from "../assets/getMonthsAndDaysString";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const getFormattedWeatherData = async (search, units) => {
  const URL = `https://api.openweathermap.org/data/2.5/weather?${search}&appid=${API_KEY}&lang=pt_br&units=${units}`;

  const data = await fetch(URL)
    .then((response) => response.json())
    .then((responseData) => {
      console.log("requi");
      return responseData;
    });

  // const data =
  //   // 20220808220546
  //   // https://api.openweathermap.org/data/2.5/weather?q=jerusalem&appid=2ba46dc6ef68a88b48023ddc9fdb1d0a&lang=pt_br&units=metric

  //   {
  //     coord: {
  //       lon: 35.2163,
  //       lat: 31.769,
  //     },
  //     weather: [
  //       {
  //         id: 800,
  //         main: "Clear",
  //         description: "céu limpo",
  //         icon: "01n",
  //       },
  //     ],
  //     base: "stations",
  //     main: {
  //       temp: 19.84,
  //       feels_like: 20.18,
  //       temp_min: 19.51,
  //       temp_max: 20.11,
  //       pressure: 1004,
  //       humidity: 88,
  //     },
  //     visibility: 10000,
  //     wind: {
  //       speed: 1.68,
  //       deg: 292,
  //       gust: 1.68,
  //     },
  //     clouds: {
  //       all: 0,
  //     },
  //     dt: 1660007146,
  //     sys: {
  //       type: 2,
  //       id: 2004982,
  //       country: "IL",
  //       sunrise: 1660013997,
  //       sunset: 1660062569,
  //     },
  //     timezone: 10800,
  //     id: 281184,
  //     name: "Jerusalem",
  //     cod: 200,
  //   };
  if (data.cod === 200) {
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, humidity },
      wind: { speed },
      dt,
      sys: { country, sunrise, sunset },
      name,
      timezone,
      cod,
    } = data;

    const { description, icon } = weather[0];

    const sunsetDate = transformTimesTampToDate(sunset, timezone);
    const sunriseDate = transformTimesTampToDate(sunrise, timezone);
    const dtDate = transformTimesTampToDate(dt, timezone);

    return {
      description,
      icon,
      temp: Math.round(temp),
      feels_like: Math.round(feels_like),
      temp_min: Math.round(temp_min),
      temp_max: Math.round(temp_max),
      humidity,
      speed: Math.round(speed),
      date: {
        dayOfWeek: getDayString(dtDate.weekday),
        month: getMonthString(dtDate.month),
        day: dtDate.day,
        year: dtDate.year,
        hour: dtDate.hour,
        minutes: dtDate.minute,
        isNight: dtDate > sunriseDate && dtDate < sunsetDate ? false : true,
      },
      country,
      sunrise: {
        hour: sunriseDate.hour,
        minutes: sunriseDate.minute,
      },
      sunset: {
        hour: sunsetDate.hour,
        minutes: sunsetDate.minute,
      },
      name,
      cod,
    };
  }
};

export default getFormattedWeatherData;
