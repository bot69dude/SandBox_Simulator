export interface GameObject {
    x: number;
    y: number;
    width: number;
    height: number;
}

export interface EnergySource {
    energy: number;
    addEnergy(amount: number): void;
}

export interface GameScene {
    preload(): void;
    create(): void;
    update(): void;
}

export interface Player {
    score: number;
    energyLevel: number;
    updateScore(amount: number): void;
}

// New interfaces needed for the game
export interface GameState {
    currentLevel: number;
    energy: number;
    maxEnergy: number;
    solarPanelsPlaced: number;
    isLevelComplete: boolean;
}

export interface ObjectiveData {
    title: string;
    description: string;
    completed: boolean;
    target?: number;
    current?: number;
}

export interface PowerMeterData {
    current: number;
    max: number;
    percentage: number;
}

export interface Level {
    id: number;
    title: string;
    description: string;
    unlocked: boolean;
    completed: boolean;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}