import React from 'react';
import type { ObjectiveData } from '../../Types/GameTypes';
import '../../Styles/components.css';

interface ObjectivePanelProps {
  objectives: ObjectiveData[];
}

const ObjectivePanel: React.FC<ObjectivePanelProps> = ({ objectives }) => {
  return (
    <div className="objective-panel">
      <h3 className="objective-title">Mission Objectives</h3>
      <div className="objective-list">
        {objectives.map((objective, index) => (
          <div 
            key={index} 
            className={`objective-item ${objective.completed ? 'completed' : ''}`}
          >
            <div className="objective-check">
              {objective.completed ? '✅' : '🔲'}
            </div>
            <div className="objective-content">
              <div className="objective-name">{objective.title}</div>
              <div className="objective-desc">{objective.description}</div>
              {objective.target && (
                <div className="objective-progress">
                  {objective.current || 0} / {objective.target}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ObjectivePanel;