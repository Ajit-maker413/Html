import React from "react";

function Weather({ weather }) {

  if (!weather) return null;

  return (
    <div style={{
      marginTop:"20px",
      border:"1px solid gray",
      padding:"20px",
      borderRadius:"10px",
      display:"inline-block"
    }}>
      <h2>{weather.name}</h2>

      <p> Temperature: {weather.main.temp} °C</p>

      <p>  Humidity: {weather.main.humidity}%</p>

      <p>  Weather: {weather.weather[0].description}</p>

    </div>
  );
}

export default Weather;