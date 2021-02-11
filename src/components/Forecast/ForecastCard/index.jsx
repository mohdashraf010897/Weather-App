import React from "react";

const ForecastCard = ({
  day = "Friday",
  maxTemp = 50,
  minTemp = -50,
  description = "Pleasant Weather",
  icon = "03n",
  activeDay = "Monday",
  onClick = () => {
    console.log("Pass onClick handler for weather card");
  },
}) => {
  return (
    <div
      onClick={onClick}
      className={`forecast-card ${activeDay === day ? "active-card" : ""}`}
    >
      <h5 id="day">{day.slice(0, 3)}</h5>
      <div id="temperature">
        <span title="Maximum Temperature" id="highest">
          <p>{maxTemp.toFixed(0)}°C</p>
        </span>
        <span title="Minimum Temperature" id="lowest">
          <p>{minTemp.toFixed(0)}°C</p>
        </span>
      </div>
      <div id="condition-indicator">
        <img
          src={require(`../../../assets/images/${icon}.svg`).default}
          alt={description}
        />
        <p title="weather description">{description}</p>
      </div>
    </div>
  );
};

export default ForecastCard;
