import { DAYS } from "./../constants/index";
import moment from "moment";
import _ from "lodash";

export const formatForecastDataForWeatherCards = (forecastData) => {
  let formattedWeatherData =
    forecastData &&
    forecastData.daily &&
    forecastData.daily.slice(1).map((dayItem) => ({
      day: moment.unix(dayItem.dt).format("dddd"),
      maxTemp: dayItem.temp.max,
      temp: dayItem.temp.day,
      pressure: dayItem.pressure,
      humidity: dayItem.humidity,
      minTemp: dayItem.temp.min,
      sunrise: dayItem.sunrise,
      sunset: dayItem.sunset,
      description: dayItem.weather[0].main,
      icon: dayItem.weather[0].icon,
    }));

  return formattedWeatherData;
};

export const formatForecastDataForDetailCard = (forecastData) => {
  let formattedDetailCardData = _.groupBy(forecastData.hourly, (item) =>
    moment.unix(item.dt).format("dddd")
  );

  let dayToggle = 0;

  DAYS.forEach((day) => {
    if (!Object.keys(formattedDetailCardData).includes(day))
      formattedDetailCardData = {
        ...formattedDetailCardData,
        [day]:
          formattedDetailCardData[
            Object.keys(formattedDetailCardData)[dayToggle]
          ],
      };
    dayToggle = dayToggle === 0 ? 1 : 0;
  });

  formattedDetailCardData = Object.entries(formattedDetailCardData).map(
    (item) => {
      return {
        day: item[0],
        data: item[1].map((obj) => {
          return {
            temp: obj.temp,
            time: moment.unix(obj.dt).format("h A"),
          };
        }),
      };
    }
  );

  return formattedDetailCardData;
};
