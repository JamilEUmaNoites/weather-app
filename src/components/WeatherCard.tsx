import React from 'react';
import {
  FaSun,
  FaCloud,
  FaCloudRain,
  FaSnowflake,
  FaSmog,
} from 'react-icons/fa';

interface WeatherCardProps {
  name: string;
  temp: number;
  humidity: number;
  main: string;
  description: string;
}

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

const WeatherCard: React.FC<WeatherCardProps> = ({
  name,
  temp,
  humidity,
  main,
  description,
}) => {
  return (
    <div className="weather">
      <h2>{name}</h2>
      <p>Temperatura: {temp}°C</p>
      <p>
        Condição: {description} {renderWeatherIcon(main)}
      </p>
      <p>Umidade: {humidity}%</p>
    </div>
  );
};

export default WeatherCard;
