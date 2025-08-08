import React from 'react';

interface SearchBarProps {
  city: string;
  onCityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ city, onCityChange, onSearch }) => {
  return (
    <form onSubmit={onSearch} className="form">
      <input
        type="text"
        value={city}
        onChange={onCityChange}
        placeholder="Digite a cidade"
        className="input"
      />
      <button type="submit" className="button">
        Buscar
      </button>
    </form>
  );
};

export default SearchBar;
