import React, { useState, useEffect } from 'react';
import PowerDisplay from './PowerDisplay';
import ObjectivePanel from './ObjectivePanel';
import type { GameState, ObjectiveData, PowerMeterData } from '../../Types/GameTypes';
import '../../Styles/components.css';

interface GameUIProps {
  gameState: GameState;
  onRestartLevel: () => void;
  onNextLevel: () => void;
}

const GameUI: React.FC<GameUIProps> = ({ gameState, onRestartLevel, onNextLevel }) => {
  const [objectives, setObjectives] = useState<ObjectiveData[]>([
    {
      title: "Power the School",
      description: "Place solar panels to generate renewable energy",
      completed: false,
      target: 100,
      current: 0
    }
  ]);

  const [coachMessage, setCoachMessage] = useState("Welcome Mayor! The school needs power. Drag solar panels to help!");

  useEffect(() => {
    // Update objectives based on game state
    setObjectives(prev => prev.map(obj => ({
      ...obj,
      current: gameState.energy,
      completed: gameState.energy >= 100
    })));

    // Update coach messages
    if (gameState.energy === 0) {
      setCoachMessage("The school is in darkness! Try placing a solar panel.");
    } else if (gameState.energy < 50) {
      setCoachMessage("Good start! The school needs more power.");
    } else if (gameState.energy < 100) {
      setCoachMessage("Almost there! Keep adding solar panels.");
    } else {
      setCoachMessage("Excellent! The school is fully powered with clean energy! 🌱");
    }
  }, [gameState]);

  const powerData: PowerMeterData = {
    current: gameState.energy,
    max: gameState.maxEnergy,
    percentage: (gameState.energy / gameState.maxEnergy) * 100
  };

  return (
    <div className="game-ui">
      <div className="ui-top">
        <PowerDisplay powerData={powerData} />
        <div className="level-info">
          <span>Level {gameState.currentLevel}</span>
        </div>
      </div>

      <div className="ui-side">
        <ObjectivePanel objectives={objectives} />
        
        <div className="solar-panel-selector">
          <h4>Renewable Energy</h4>
          <div className="draggable-item" id="solar-panel-source">
            <img src="/Game/assets/sprites/solar-panel.jpeg" alt="Solar Panel" />
            <span>Solar Panel</span>
            <small>Drag to school</small>
          </div>
        </div>
      </div>

      <div className="coach-bubble">
        <div className="coach-character">🧑‍🏫</div>
        <div className="coach-message">{coachMessage}</div>
      </div>

      {gameState.isLevelComplete && (
        <div className="level-complete-overlay">
          <div className="level-complete-panel">
            <h2>🎉 Mission Complete!</h2>
            <p>You successfully powered the school with renewable energy!</p>
            <div className="level-complete-buttons">
              <button onClick={onRestartLevel} className="btn-secondary">
                Restart Level
              </button>
              <button onClick={onNextLevel} className="btn-primary">
                Next Mission
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameUI;