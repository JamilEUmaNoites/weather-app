import React from 'react';

interface HistoryProps {
  history: string[];
  onSelect: (city: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, onSelect }) => {
  return (
    <div className="history-container">
      <h3>Histórico de buscas</h3>
      <div className="history-scroll">
        {history.map((city, index) => (
          <button
            key={index}
            onClick={() => onSelect(city)}
            className="history-button"
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
};

export default History;
