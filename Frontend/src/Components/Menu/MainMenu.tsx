import React from 'react';
import '../../Styles/components.css';

interface MainMenuProps {
  onStartGame: () => void;
  onShowLevelSelect: () => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ onStartGame, onShowLevelSelect }) => {
  return (
    <div className="main-menu">
      <div className="menu-background">
        <div className="menu-content">
          <h1 className="game-title">
            🏙️ Smart City Simulator
          </h1>
          <p className="game-subtitle">
            Build a sustainable city and become a Climate Hero!
          </p>
          
          <div className="menu-buttons">
            <button 
              className="btn-primary btn-large"
              onClick={onStartGame}
            >
              🚀 Start Adventure
            </button>
            
            <button 
              className="btn-secondary btn-large"
              onClick={onShowLevelSelect}
            >
              📋 Select Level
            </button>
          </div>

          <div className="feature-preview">
            <div className="feature-item">
              <span className="feature-icon">⚡</span>
              <span>Renewable Energy</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🌱</span>
              <span>Green Solutions</span>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🏫</span>
              <span>Smart Buildings</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;