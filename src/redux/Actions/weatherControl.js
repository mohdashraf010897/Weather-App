import WeatherControlActionTypes from "../ActionTypes/weatherControl";
import _ from "lodash";
import axios from "axios";

const {
  SET_ACTIVE_DAY,
  SET_CURRENT_PLACE,
  FETCH_FORECAST_SUCCESS,
  SET_LOADING,
} = WeatherControlActionTypes;

const setLoading = (bool) => ({ type: SET_LOADING, payload: bool });

const setCurrentPlace = (
  placeObj = { lat: 20, lng: 20, name: "something" }
) => ({ type: SET_CURRENT_PLACE, payload: placeObj });

const setActiveDay = (idx) => ({ type: SET_ACTIVE_DAY, payload: idx });

const setForecastData = (dataChunk) => {
  return {
    type: FETCH_FORECAST_SUCCESS,
    payload: dataChunk,
  };
};

const fetchForeCast = (placeObj) => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    if (!placeObj) {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
            const { data: rawForecastData } = await axios.get(url);
            const reverseGeoCodingResponse = await axios.get(
              `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&sensor=true&key=${process.env.REACT_APP_GOOGLE_API_KEY}`
            );

            dispatch(setForecastData(rawForecastData));
            dispatch(
              setCurrentPlace({
                lat: latitude,
                lng: longitude,
                name: reverseGeoCodingResponse.data.plus_code.compound_code
                  .split(" ")
                  .slice(1)
                  .join(" "),
              })
            );
          },
          function () {
            alert(
              "Failed to fetch your co-ordinates, Search for a location below!!!"
            );
          }
        );
      }
    } else {
      let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${placeObj.lat}&lon=${placeObj.lng}&units=metric&appid=${process.env.REACT_APP_OPEN_WEATHER_API_KEY}`;
      const { data: rawForecastData } = await axios.get(url);

      dispatch(setForecastData(rawForecastData));
    }
  } catch (error) {
    console.log(error);
  }
};

export default {
  setLoading,
  setActiveDay,
  setForecastData,
  fetchForeCast,
  setCurrentPlace,
};
