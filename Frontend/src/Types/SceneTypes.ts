// filepath: smart-city-simulator/smart-city-simulator/src/Types/SceneTypes.ts
export interface SceneConfig {
    key: string;
    active?: boolean;
    visible?: boolean;
}

export interface Level1SceneConfig extends SceneConfig {
    energyGoal: number;
    solarPanelCount: number;
}