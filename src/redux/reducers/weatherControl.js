import WeatherControlActionTypes from "../ActionTypes/weatherControl";
import moment from "moment";
const {
  SET_ACTIVE_DAY,
  SET_CURRENT_PLACE,
  FETCH_FORECAST_SUCCESS,
  SET_LOADING,
} = WeatherControlActionTypes;

const INITIAL_STATE = {
  currentPlace: { lat: "", long: "", name: "" },
  activeDay: moment().format("dddd"),
  forecastData: null,
  loading: true,
  error: null,
};

export const weatherControlReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PLACE:
      return { ...state, currentPlace: action.payload, loading: false };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        forecastData: action.payload,
      };

    case SET_ACTIVE_DAY:
      return { ...state, activeDay: action.payload, loading: false };

    default:
      return state;
  }
};
