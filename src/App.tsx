import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import ForecastList from './components/ForecastList';
import History from './components/History';
import './App.css' ;

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
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const apiKey = 'a1e808fb01252b852624140d3bd7cd50';
  const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (cityName: string) => {
    try {
      const response = await axios.get(apiUrl, {
        params: {
          q: cityName,
          appid: apiKey,
          units: 'metric',
          lang: 'pt_br',
        },
      });
      setWeather(response.data);
      setError('');
      setHistory((prev) =>
        prev.includes(cityName) ? prev : [cityName, ...prev].slice(0, 5)
      );
    } catch (err) {
      console.error(err);
      setError('Cidade não encontrada ou erro na API. Tente novamente!');
      setWeather(null);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city.trim());
    } else {
      setError('Por favor, digite o nome de uma cidade.');
      setWeather(null);
    }
  };

  const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCity(e.target.value);
  };

  const handleHistorySelect = (cityName: string) => {
    setCity(cityName);
    fetchWeather(cityName);
  };

  return (
    <div className="container">
      <h1 className="title">Previsão do Tempo</h1>
      <SearchBar
        city={city}
        onCityChange={handleCityChange}
        onSearch={handleSearch}
      />
      {error && <p className="error">{error}</p>}
      {weather && (
        <WeatherCard
          name={weather.name}
          temp={weather.main.temp}
          humidity={weather.main.humidity}
          main={weather.weather[0].main}
          description={weather.weather[0].description}
        />
      )}
      <ForecastList />
      <History history={history} onSelect={handleHistorySelect} />
    </div>
  );
};

export default App;
