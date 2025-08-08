import React, { useState } from 'react';
import axios from 'axios';
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
} from 'react-icons/fa';
import './App.css';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: {
    main: string;
    description: string;
  }[];
  name: string;
}

const App: React.FC = () => {
  const [city, setCity] = useState<string>('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string>('');

  const apiKey = 'a1e808fb01252b852624140d3bd7cd50'; // Sua chave da API
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: city,
          appid: apiKey,
          units: 'metric',
          lang: 'pt_br',
        },
      });
      setWeather(response.data);
      setError('');
    } catch (err) {
      console.error(err);
      setError('Cidade não encontrada ou erro na API. Tente novamente.');
      setWeather(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather();
    } else {
      setError('Por favor, digite o nome de uma cidade.');
      setWeather(null);
    }
  };

  const renderWeatherIcon = (main: string) => {
    switch (main) {
      case 'Clear':
        return <FaSun />;
      case 'Clouds':
        return <FaCloud />;
      case 'Rain':
      case 'Drizzle':
        return <FaCloudRain />;
      case 'Snow':
        return <FaSnowflake />;
      case 'Mist':
      case 'Smoke':
      case 'Haze':
      case 'Fog':
        return <FaSmog />;
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <h1 className="title">Previsão do Tempo</h1>
      <form onSubmit={handleSearch} className="form">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Digite a cidade"
          className="input"
        />
        <button type="submit" className="button">
          Buscar
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather">
          <h2>{weather.name}</h2>
          <p>Temperatura: {weather.main.temp}°C</p>
          <p>
            Condição: {weather.weather[0].description}{' '}
            {renderWeatherIcon(weather.weather[0].main)}
          </p>
          <p>Umidade: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
};

export default App;
