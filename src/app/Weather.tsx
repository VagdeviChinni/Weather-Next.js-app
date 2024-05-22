"use client";

import { useEffect, useState } from "react";

type WeatherData = {
  name: string;
  sys: {
    country: string;
  };
  main: {
    temp: number;
    pressure: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  wind: {
    speed: number;
  };
  visibility: number;
};

type ForecastData = {
  dt: number;
  main: {
    temp: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
};

type AirQualityData = {
  list: {
    main: {
      aqi: number;
    };
  }[];
};

const getWeatherEmoji = (main: string) => {
  switch (main) {
    case "Clear":
      return "☀️";
    case "Clouds":
      return "☁️";
    case "Rain":
      return "🌧️";
    case "Snow":
      return "❄️";
    case "Thunderstorm":
      return "⛈️";
    case "Drizzle":
      return "🌦️";
    case "Mist":
      return "🌫️";
    case "Haze":
      return "🌁";
    default:
      return "🌈";
  }
};

export default function Weather() {
  const [city, setCity] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData[]>([]);
  const [airQuality, setAirQuality] = useState<AirQualityData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          fetchWeatherDataByCoords(lat, lon);
        },
        (err) => {
          console.error(err);
          fetchWeatherData("London"); // Default city
        }
      );
    } else {
      fetchWeatherData("London"); // Default city
    }
  }, []);

  async function fetchWeatherData(city: string) {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`
      );
      if (!weatherResponse.ok) {
        throw new Error("City not found");
      }
      const weatherData: WeatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();

      const airQualityResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${apiKey}`
      );
      const airQualityData: AirQualityData = await airQualityResponse.json();

      setWeather(weatherData);
      setForecast(forecastData.list.slice(0, 5));
      setAirQuality(airQualityData);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setWeather(null);
      setForecast([]);
      setAirQuality(null);
    }
  }

  async function fetchWeatherDataByCoords(lat: number, lon: number) {
    const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
    try {
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      if (!weatherResponse.ok) {
        throw new Error("Location not found");
      }
      const weatherData: WeatherData = await weatherResponse.json();

      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const forecastData = await forecastResponse.json();

      const airQualityResponse = await fetch(
        `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
      );
      const airQualityData: AirQualityData = await airQualityResponse.json();

      setWeather(weatherData);
      setForecast(forecastData.list.slice(0, 5));
      setAirQuality(airQualityData);
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      setWeather(null);
      setForecast([]);
      setAirQuality(null);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    fetchWeatherData(city);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4 absolute top-16 left-4">
        <input
          type="text"
          name="city"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="border p-2 mr-2 text-black"
        />
        <button type="submit" className="bg-blue-500 text-white p-2">
          Get Weather
        </button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
      {weather && (
        <div className="text-center mt-16">
        <h2 className="text-3xl font-bold mb-4">
          {weather.name}, {weather.sys.country}
        </h2>
        <div className="text-6xl">
          {getWeatherEmoji(weather.weather[0].main)} {(weather.main.temp - 273.15).toFixed(2)}°C
        </div>
        <p className="text-lg">
          Condition: {weather.weather[0].description}
        </p>
        <hr className="my-4 border-t-2 border-gray-300" /> {/* Horizontal rule for page break */}
        <p className="text-lg">
          Air Quality Index: {airQuality?.list[0].main.aqi} | Wind Speed: {weather.wind.speed} m/s | Visibility: {weather.visibility / 1000} km | Pressure: {weather.main.pressure} hPa | Humidity: {weather.main.humidity}%
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Updated as of {new Date(weather.dt * 1000).toLocaleTimeString()}
        </p>
          <div className="flex justify-center mt-8">
            {forecast.map((day) => (
              <div key={day.dt} className="border p-4 m-2">
                <h3 className="text-xl">
                  {new Date(day.dt * 1000).toLocaleDateString()}
                </h3>
                <div className="text-3xl">
                  {getWeatherEmoji(day.weather[0].main)} {(day.main.temp - 273.15).toFixed(2)}°C
                </div>
                <p>{day.weather[0].description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
