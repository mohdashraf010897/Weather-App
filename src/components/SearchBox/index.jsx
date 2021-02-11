import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import WeatherControlActions from "./../../redux/Actions/weatherControl";
import SearchIcon from "./../../assets/images/search-icon.svg";
import CurrentLocationIcon from "./../../assets/images/current-location.svg";

let autoComplete;

const loadScript = (url, callback) => {
  let script = document.createElement("script");
  script.type = "text/javascript";

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === "loaded" || script.readyState === "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {
    script.onload = () => callback();
  }

  script.src = url;
  document.getElementsByTagName("head")[0].appendChild(script);
};

function handleScriptLoad(selectLocationSuggestionHandler, autoCompleteRef) {
  autoComplete = new window.google.maps.places.Autocomplete(
    autoCompleteRef.current,
    { types: ["(cities)"] }
  );
  //   autoComplete.setFields(["address_components", "formatted_address"]);
  autoComplete.setFields(["place_id", "geometry", "name", "formatted_address"]);
  autoComplete.addListener("place_changed", (e) => {
    handlePlaceSelect(selectLocationSuggestionHandler);
  });
}

async function handlePlaceSelect(selectLocationSuggestionHandler) {
  const addressObject = autoComplete.getPlace();
  const placeObj = {
    name: addressObject.formatted_address,
    lat: addressObject.geometry.location.lat(),
    lng: addressObject.geometry.location.lng(),
  };
  selectLocationSuggestionHandler(placeObj);
}

const SearchBox = ({
  fetchForeCast = () => {
    console.log("Supply A Method");
  },
  setErrorMessage = (e) => {
    console.log("I am used for setting error");
  },
  currentPlace = { lat: NaN, lng: NaN, name: "" },
}) => {
  const [placeObj, setPlaceObj] = useState({ name: "", lat: null, lng: null });
  const autoCompleteRef = useRef(null);

  const selectSuggestionHandler = (placeObjToSet) => {
    fetchForeCast(placeObjToSet);
    setPlaceObj(placeObjToSet);
  };

  useEffect(() => {
    try {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`,
        () => handleScriptLoad(selectSuggestionHandler, autoCompleteRef)
      );
    } catch (error) {
      setErrorMessage(error);
    }
  }, []);

  useEffect(() => {
    console.log(currentPlace);
    !!currentPlace.name && setPlaceObj(currentPlace);
  }, [currentPlace]);

  return (
    <div tabIndex="0" className="search-box">
      <img src={CurrentLocationIcon} alt="current-location-icon" />
      <input
        type="text"
        className="search-box__input"
        ref={autoCompleteRef}
        onChange={(event) => setPlaceObj(event.target.value)}
        placeholder="Enter a City"
        value={placeObj.name}
      />
      <img src={SearchIcon} alt="search-icon" />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    currentPlace: state.weather.currentPlace,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchForeCast: (placeObj) =>
      dispatch(WeatherControlActions.fetchForeCast(placeObj)),
    setErrorMessage: (errorMessage) =>
      dispatch(WeatherControlActions.setErrorMessage(errorMessage)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
