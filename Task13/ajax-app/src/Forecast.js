import React from "react";

function Forecast({ forecast }) {

  if (!forecast) return null;

  return (
    <div style={{marginTop:"20px"}}>

      <h3>5-Day Forecast</h3>

      {forecast.list.slice(0,5).map((item, index) => (
        <div key={index} style={{
          border:"1px solid #ccc",
          margin:"10px",
          padding:"10px",
          borderRadius:"8px"
        }}>
          <p> Temp: {item.main.temp} °C</p>
          <p> Weather: {item.weather[0].description}</p>
        </div>
      ))}

    </div>
  );
}

export default Forecast;