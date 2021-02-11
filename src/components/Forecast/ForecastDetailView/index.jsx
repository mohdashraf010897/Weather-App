import moment from "moment";
import React, { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const ForecastDetailView = ({
  graphData = {},
  sunrise = null,
  sunset = null,
  humidity = null,
  pressure = null,
  temperature = 32,
  icon = "04n",
}) => {
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 800) {
      setIsMobileView(true);
    }
    function handleResize() {
      if (window.innerWidth <= 800) {
        !isMobileView && setIsMobileView(true);
      } else {
        isMobileView && setIsMobileView(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const sunChartData = [
    { x: 0, value: -2 },
    { x: 1, value: 0 },
    { x: 2, value: 5 },
    { x: 3, value: 0 },
    { x: 4, value: -2 },
  ];

  const calculateDayPassPercent = () => {
    const totalDayDuration =
      moment(moment.unix(sunset)).hours() -
      moment(moment.unix(sunrise)).hours();

    const hoursUntilNow =
      moment().hours() - moment(moment.unix(sunrise)).hours();

    return (hoursUntilNow / totalDayDuration) * (50 / 100) * 100;
  };

  const renderTemperatureChart = () => (
    <ResponsiveContainer width="99%" aspect={isMobileView ? 2.5 : 1.8}>
      <AreaChart data={graphData.data}>
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7bbae8" stopOpacity={0.9} />
            <stop offset="60%" stopColor="#7bbae8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="time" dy={10} tick={{ fill: "#000" }} stroke="#fff" />
        <YAxis hide />
        <CartesianGrid horizontal={false} />
        <Tooltip
          labelStyle={{ fontSize: "18px" }}
          itemStyle={{
            fontSize: "18px",
            color: "rgb(180 216 242)",
            textTransform: "capitalize",
          }}
        />
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#52b2ea"
          strokeWidth="2"
          fillOpacity={1}
          fill="url(#colorUv)"
          dot={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  const renderSunChart = () => (
    <ResponsiveContainer width="99%" aspect={2.5}>
      <AreaChart data={sunChartData}>
        <defs>
          <linearGradient id="night1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#666667" stopOpacity={1} />
            <stop offset="25%" stopColor="#666667" stopOpacity={0.5} />
            <stop offset="25%" stopColor="#fcdea0" stopOpacity={1} />
            <stop
              offset={`${
                calculateDayPassPercent() <= 50 && calculateDayPassPercent() > 0
                  ? calculateDayPassPercent() + 25
                  : 72
              }%`}
              stopColor="#fcdea0"
              stopOpacity={1}
            />
            {calculateDayPassPercent() <= 50 && calculateDayPassPercent() > 0 && (
              <>
                <stop
                  offset={`${calculateDayPassPercent() + 25}%`}
                  stopColor="#fff"
                  stopOpacity={1}
                />
                <stop offset={`75%`} stopColor="#fff" stopOpacity={0.7} />
              </>
            )}

            <stop offset="75%" stopColor="#666667" stopOpacity={1} />
            <stop offset="100%" stopColor="#666667" stopOpacity={1} />
          </linearGradient>
        </defs>
        <ReferenceLine x="1" />
        <ReferenceLine x="3" />
        <ReferenceLine y="0" stroke="#666667" />
        <XAxis
          tick={{ fill: "#000", style: { fontSize: "1.2rem" } }}
          stroke="#fff"
          tickFormatter={(value) => {
            if (value === 1) {
              return `${moment.unix(sunrise).format("h:mm A")}`;
            } else if (value === 3) {
              return `${moment.unix(sunset).format("h:mm A")}`;
            } else {
              return "";
            }
          }}
        />
        <YAxis hide />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#ffe634"
          fill="url(#night1)"
          className="myClass"
        />
      </AreaChart>
    </ResponsiveContainer>
  );

  return (
    <div className="forecast-detail-view">
      <h2>
        {temperature.toFixed(0)}°C
        <img
          src={require(`../../../assets/images/${icon}.svg`).default}
          alt="temperature"
        />
      </h2>

      <div className="forecast-detail-view__charts">
        <div className="forecast-detail-view__charts--temperature">
          {renderTemperatureChart()}{" "}
        </div>{" "}
        <div className="forecast-detail-view__charts--sun-rise-set">
          <div className="pressure-humidity-cards">
            <div className="pressure-humidity-cards__item">
              <h3>Pressure</h3>
              <p>{pressure} hpa</p>
            </div>
            <div className="pressure-humidity-cards__item">
              <h3>Humidity</h3>
              <p>{humidity} %</p>
            </div>
          </div>
          <div className="sunrise-sunset">
            <div id="sunrise">
              <h3>Sunrise</h3>
              <p>{moment.unix(sunrise).format("h:mm A")}</p>
            </div>
            <div id="sunset">
              <h3>Sunset</h3>
              <p>{moment.unix(sunset).format("h:mmA")}</p>
            </div>
          </div>{" "}
          {renderSunChart()}
        </div>
      </div>
    </div>
  );
};

export default ForecastDetailView;
