import React, { useState, useRef, useEffect } from 'react';
import MainMenu from './Components/Menu/MainMenu';
import LevelSelect from './Components/Menu/LevelSelect';
import GameUI from './Components/UI/GameUI';
import type { GameState } from './Types/GameTypes';
import './Styles/global.css';

type GameView = 'menu' | 'levelSelect' | 'game';

// Define interface for our PhaserGame wrapper
interface PhaserGameInstance {
  getGame(): Phaser.Game;
  destroy(): void;
  events: Phaser.Events.EventEmitter;
}

function App() {
  const [currentView, setCurrentView] = useState<GameView>('menu');
  const [gameState, setGameState] = useState<GameState>({
    currentLevel: 1,
    energy: 0,
    maxEnergy: 100,
    solarPanelsPlaced: 0,
    isLevelComplete: false
  });
  
  // Change type to match our PhaserGame wrapper
  const gameRef = useRef<PhaserGameInstance | null>(null);

  const handleStartGame = () => {
    setCurrentView('game');
  };

  const handleShowLevelSelect = () => {
    setCurrentView('levelSelect');
  };

  const handleSelectLevel = (levelId: number) => {
    setGameState(prev => ({ ...prev, currentLevel: levelId }));
    setCurrentView('game');
  };

  const handleBackToMenu = () => {
    setCurrentView('menu');
    // Clean up game when going back to menu
    if (gameRef.current) {
      gameRef.current.destroy();
      gameRef.current = null;
    }
  };

  const handleRestartLevel = () => {
    setGameState(prev => ({
      ...prev,
      energy: 0,
      solarPanelsPlaced: 0,
      isLevelComplete: false
    }));
    
    // Fix: Use 'start' instead of 'restart' and access through getGame()
    if (gameRef.current) {
      const game = gameRef.current.getGame();
      const sceneManager = game.scene;
      
      // Stop current scene and start fresh
      if (sceneManager.isActive('Level1Scene')) {
        sceneManager.stop('Level1Scene');
      }
      sceneManager.start('Level1Scene');
    }
  };

  const handleNextLevel = () => {
    // For now, just restart current level since we only have Level 1
    handleRestartLevel();
  };

  useEffect(() => {
    if (currentView === 'game') {
      // Initialize Phaser game when entering game view
      import('./Game/PhaserGame').then(({ default: PhaserGame }) => {
        const gameContainer = document.getElementById('phaser-game');
        if (gameContainer && !gameRef.current) {
          // Fix: Pass string ID instead of HTMLElement
          gameRef.current = new PhaserGame('phaser-game');
          
          // Listen for game events
          if (gameRef.current) {
            gameRef.current.events.on('energy-updated', (energy: number) => {
              setGameState(prev => ({
                ...prev,
                energy,
                isLevelComplete: energy >= 100
              }));
            });

            gameRef.current.events.on('level-complete', () => {
              setGameState(prev => ({
                ...prev,
                isLevelComplete: true
              }));
            });

            gameRef.current.events.on('solar-panel-placed', () => {
              setGameState(prev => ({
                ...prev,
                solarPanelsPlaced: prev.solarPanelsPlaced + 1
              }));
            });
          }
        }
      }).catch(error => {
        console.error('Failed to load PhaserGame:', error);
      });
    }

    return () => {
      // Cleanup Phaser game when leaving game view
      if (gameRef.current && currentView !== 'game') {
        gameRef.current.destroy();
        gameRef.current = null;
      }
    };
  }, [currentView]);

  return (
    <div className="App">
      {currentView === 'menu' && (
        <MainMenu 
          onStartGame={handleStartGame}
          onShowLevelSelect={handleShowLevelSelect}
        />
      )}
      
      {currentView === 'levelSelect' && (
        <LevelSelect 
          onSelectLevel={handleSelectLevel}
          onBack={handleBackToMenu}
        />
      )}
      
      {currentView === 'game' && (
        <div className="game-container">
          <div id="phaser-game"></div>
          <GameUI 
            gameState={gameState}
            onRestartLevel={handleRestartLevel}
            onNextLevel={handleNextLevel}
          />
        </div>
      )}
    </div>
  );
}

export default App;