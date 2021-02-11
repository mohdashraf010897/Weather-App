import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  formatForecastDataForDetailCard,
  formatForecastDataForWeatherCards,
} from "../../utils/helper";
import ForecastDetailView from "./ForecastDetailView";
import WeatherControlActions from "./../../redux/Actions/weatherControl";

import ForecastCard from "./ForecastCard";
import Loader from "../common/Loader";

const Forecast = ({
  forecastData = null,
  setActiveDay = () => {
    console.log("Pass setActiveDay handler");
  },
  activeDay = "",
  currentPlace,
  loading = false,
}) => {
  const [weatherCardsData, setWeatherCardsData] = useState([]);
  const [detailViewData, setDetailViewData] = useState([]);
  const [currentDayDetails, setCurrentDayDetails] = useState({});

  useEffect(() => {
    if (!!forecastData) {
      const formattedWeatherCardsData = formatForecastDataForWeatherCards(
        forecastData
      );
      setActiveDay(formattedWeatherCardsData[0].day);
      setCurrentDayDetails(
        formattedWeatherCardsData.filter(
          (weatherItem) => weatherItem.day === activeDay
        )[0]
      );
      setWeatherCardsData(formattedWeatherCardsData);
      setDetailViewData(formatForecastDataForDetailCard(forecastData));
    }
  }, [forecastData]);

  useEffect(() => {
    !!weatherCardsData &&
      weatherCardsData.length > 0 &&
      setCurrentDayDetails(
        weatherCardsData.filter(
          (weatherItem) => weatherItem.day === activeDay
        )[0]
      );
  }, [activeDay]);

  const mapForecastDataToCardJsx = () => {
    return weatherCardsData.map((weatherItem) => (
      <ForecastCard
        key={weatherItem.day}
        {...weatherItem}
        onClick={() => setActiveDay(weatherItem.day)}
        activeDay={activeDay}
      />
    ));
  };

  if (loading) return <Loader />;

  return (
    <div className="forecast">
      <div className="forecast-cards">{mapForecastDataToCardJsx()}</div>
      <ForecastDetailView
        graphData={
          !!detailViewData &&
          detailViewData.filter((item) => item.day === activeDay)[0]
        }
        activeDay={activeDay}
        sunrise={currentDayDetails?.sunrise}
        sunset={currentDayDetails?.sunset}
        humidity={currentDayDetails?.humidity}
        pressure={currentDayDetails?.pressure}
        temperature={currentDayDetails?.temp}
        icon={currentDayDetails?.icon}
        placeName={currentPlace?.name}
      />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    loading: state.weather.loading,
    currentPlace: state.weather.currentPlace,
    forecastData: state.weather.forecastData,
    activeDay: state.weather.activeDay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setActiveDay: (day) => dispatch(WeatherControlActions.setActiveDay(day)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Forecast);
