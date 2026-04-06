import React, { useState } from "react";
import Weather from "./Weather";
import Forecast from "./Forecast";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const API_KEY = "45f756915457e47a6a4c8579937d8bf5";

  const getWeather = () => {

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => setWeather(data));

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`)
      .then(res => res.json())
      .then(data => setForecast(data));

  };

  return (
    <div style={{textAlign:"center", padding:"40px"}}>

      <h1>🌤 React Weather App (AJAX)</h1>

      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e)=>setCity(e.target.value)}
        style={{padding:"10px"}}
      />

      <button
        onClick={getWeather}
        style={{marginLeft:"10px", padding:"10px 20px"}}
      >
        Search
      </button>

      <Weather weather={weather} />

      <Forecast forecast={forecast} />

    </div>
  );
}

export default App;