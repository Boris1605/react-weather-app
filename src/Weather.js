import React, { useState } from 'react';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchWeather = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`,
      );
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div>
      <h2>Weather App</h2>
      <label>
        Enter City:
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </label>
      <button onClick={fetchWeather}>Get Weather</button>

      {weatherData && weatherData.main && weatherData.weather && (
        <div>
          <h3>Weather in {weatherData.name}</h3>
          <p>Temperature: {weatherData.main.temp} K</p>
          <p>Weather: {weatherData.weather[0].description}</p>
        </div>
      )}

      {!weatherData && (
        <p>No weather data available. Please enter a valid city.</p>
      )}
    </div>
  );
}
