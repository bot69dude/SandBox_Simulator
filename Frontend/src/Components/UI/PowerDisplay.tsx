import React from 'react';
import type { PowerMeterData } from '../../Types/GameTypes';
import '../../Styles/components.css';

interface PowerDisplayProps {
  powerData: PowerMeterData;
}

const PowerDisplay: React.FC<PowerDisplayProps> = ({ powerData }) => {
  const getBarColor = (percentage: number) => {
    if (percentage < 30) return '#ff4444';
    if (percentage < 70) return '#ffaa00';
    return '#44ff44';
  };

  return (
    <div className="power-display">
      <div className="power-header">
        <span className="power-icon">⚡</span>
        <span className="power-label">School Energy</span>
      </div>
      <div className="power-bar-container">
        <div 
          className="power-bar-fill"
          style={{
            width: `${powerData.percentage}%`,
            backgroundColor: getBarColor(powerData.percentage)
          }}
        />
        <div className="power-bar-text">
          {powerData.current} / {powerData.max}
        </div>
      </div>
    </div>
  );
};

export default PowerDisplay;