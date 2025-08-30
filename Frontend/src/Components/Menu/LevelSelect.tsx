import React from 'react';
import '../../Styles/components.css';

interface Level {
  id: number;
  title: string;
  description: string;
  unlocked: boolean;
  completed: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

interface LevelSelectProps {
  onSelectLevel: (levelId: number) => void;
  onBack: () => void;
}

const LevelSelect: React.FC<LevelSelectProps> = ({ onSelectLevel, onBack }) => {
  const levels: Level[] = [
    {
      id: 1,
      title: "Power the School",
      description: "Use renewable energy to power the school building",
      unlocked: true,
      completed: false,
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: "Fix Traffic Jams",
      description: "Add buses and bike lanes to reduce traffic",
      unlocked: false,
      completed: false,
      difficulty: 'Medium'
    },
    {
      id: 3,
      title: "Clean Air Challenge",
      description: "Keep pollution below 40% while powering 20 houses",
      unlocked: false,
      completed: false,
      difficulty: 'Hard'
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return '#44ff44';
      case 'Medium': return '#ffaa00';
      case 'Hard': return '#ff4444';
      default: return '#888';
    }
  };

  return (
    <div className="level-select">
      <div className="level-select-header">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <h2>Choose Your Mission</h2>
      </div>

      <div className="levels-grid">
        {levels.map((level) => (
          <div 
            key={level.id}
            className={`level-card ${!level.unlocked ? 'locked' : ''} ${level.completed ? 'completed' : ''}`}
            onClick={() => level.unlocked && onSelectLevel(level.id)}
          >
            <div className="level-header">
              <span className="level-number">
                {level.completed ? '✅' : level.unlocked ? level.id : '🔒'}
              </span>
              <span 
                className="level-difficulty"
                style={{ color: getDifficultyColor(level.difficulty) }}
              >
                {level.difficulty}
              </span>
            </div>
            
            <h3 className="level-title">{level.title}</h3>
            <p className="level-description">{level.description}</p>
            
            {!level.unlocked && (
              <div className="level-locked">
                Complete previous levels to unlock
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelSelect;