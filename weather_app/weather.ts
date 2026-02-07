//  DOM ELEMENTS 

const input = document.getElementById("cityInput") as HTMLInputElement;
const button = document.getElementById("searchBtn") as HTMLButtonElement;
const weatherBox = document.getElementById("weatherBox") as HTMLDivElement;


//  TYPES 

interface Coordinates {
    lat: number;
    lon: number;
}

interface Weather {
    temperature: number;
    windspeed: number;
}


// EVENT HANDLING 

button.addEventListener("click", async (): Promise<void> => {
    const city: string = input.value.trim();
    if (!city) return;

    weatherBox.innerHTML = "Loading...";

    const coords = await getCoordinates(city);

    if (!coords) {
        weatherBox.innerHTML = "City not found";
        return;
    }

    const weather = await getWeather(coords.lat, coords.lon);
    showWeather(city, weather);
});




// Get city coordinates
async function getCoordinates(city: string): Promise<Coordinates | null> {
    const res = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1`
    );

    const data = await res.json();
    if (!data.results) return null;

    return {
        lat: data.results[0].latitude,
        lon: data.results[0].longitude,
    };
}

// Get weather data
async function getWeather(lat: number, lon: number): Promise<Weather> {
    const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
    );

    const data = await res.json();
    return data.current_weather;
}

// Display weather
function showWeather(city: string, weather: Weather): void {
    weatherBox.innerHTML = `
        <h3>${city}</h3>
        <p>Temperature: ${weather.temperature} °C</p>
        <p>Wind Speed: ${weather.windspeed} km/h</p>
    `;
}
