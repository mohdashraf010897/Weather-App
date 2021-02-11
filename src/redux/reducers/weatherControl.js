import WeatherControlActionTypes from "../ActionTypes/weatherControl";
import moment from "moment";
const {
  SET_ACTIVE_DAY,
  SET_CURRENT_PLACE,
  FETCH_FORECAST_SUCCESS,
  SET_LOADING,
  SET_ERROR_MESSAGE,
} = WeatherControlActionTypes;

const INITIAL_STATE = {
  currentPlace: { lat: "", long: "", name: "" },
  activeDay: moment().format("dddd"),
  forecastData: null,
  loading: true,
  errorMessage: "",
};

export const weatherControlReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CURRENT_PLACE:
      return { ...state, currentPlace: action.payload, loading: false };

    case FETCH_FORECAST_SUCCESS:
      return {
        ...state,
        loading: false,
        errorMessage: "",
        forecastData: action.payload,
      };

    case SET_ACTIVE_DAY:
      return { ...state, activeDay: action.payload, loading: false };

    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_ERROR_MESSAGE:
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
};
