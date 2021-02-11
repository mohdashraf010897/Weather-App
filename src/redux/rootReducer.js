import { combineReducers } from "redux";
import { weatherControlReducer } from "./reducers/weatherControl";

const rootReducer = combineReducers({
  weather: weatherControlReducer,
});

export default rootReducer;
