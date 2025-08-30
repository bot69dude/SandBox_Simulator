# Smart City Simulator

## Overview
The Smart City Simulator is a game where players can learn about renewable energy by installing solar panels to power a school. This project is built using TypeScript, React, and Phaser.

## Setup Instructions
1. Install Node.js and npm if not already installed.
2. Create a new Vite project with React and TypeScript:
   - Run `npm create vite@latest smart-city-simulator --template react-ts`.
3. Navigate to the project directory:
   - `cd smart-city-simulator`.
4. Install Phaser:
   - Run `npm install phaser`.
5. Create the directory structure as outlined in the project tree.
6. Add the required sprites to the `src/Assets/sprites/` directory:
   - `school.png`: Sprite for the school building.
   - `solar.png`: Sprite for the solar panel.
   - `coach.png`: Sprite for the AI Coach character.
   - `bg.png`: Background image for the game scene.
7. Implement the code for each file as described in the project structure.
8. Update `package.json` scripts to include a start command:
   ```json
   "scripts": {
       "start": "vite"
   }
   ```
9. Run the application:
   - `npm run dev`.

## Project Structure
```
smart-city-simulator
├── src
│   ├── main.tsx
│   ├── App.tsx
│   ├── Game
│   │   ├── PhaserGame.tsx
│   │   ├── Scene
│   │   │   ├── Level1Scene.ts
│   │   │   └── MenuScene.ts
│   │   ├── Objects
│   │   │   ├── School.ts
│   │   │   ├── SolarPanel.ts
│   │   │   └── PowerMeter.ts
│   │   └── Utils
│   │       ├── GameConfig.ts
│   │       └── AssetLoader.ts
│   ├── Components
│   │   ├── UI
│   │   │   ├── GameUI.tsx
│   │   │   ├── PowerDisplay.tsx
│   │   │   └── ObjectivePanel.tsx
│   │   └── Menu
│   │       ├── MainMenu.tsx
│   │       └── LevelSelect.tsx
│   ├── Assets
│   │   ├── sprites
│   │   ├── audio
│   │   └── fonts
│   ├── Types
│   │   ├── GameTypes.ts
│   │   └── SceneTypes.ts
│   └── Styles
│       ├── global.css
│       └── components.css
├── public
│   └── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Required Sprites
- `school.png`: Sprite for the school building.
- `solar.png`: Sprite for the solar panel.
- `coach.png`: Sprite for the AI Coach character.
- `bg.png`: Background image for the game scene.

## Basic Code Snippets
### Level1Scene.ts
```typescript
import Phaser from 'phaser';
import School from '../Objects/School';
import SolarPanel from '../Objects/SolarPanel';

export default class Level1Scene extends Phaser.Scene {
    private school: School;
    private solarPanel: SolarPanel;
    private energyMeter: number;

    constructor() {
        super('Level1Scene');
    }

    preload() {
        this.load.image('school', 'assets/sprites/school.png');
        this.load.image('solar', 'assets/sprites/solar.png');
    }

    create() {
        this.school = new School(this, 400, 300);
        this.energyMeter = 0;

        this.input.on('drag', (pointer, gameObject) => {
            gameObject.x = pointer.x;
            gameObject.y = pointer.y;
        });

        this.input.on('drop', (pointer, gameObject) => {
            if (gameObject instanceof SolarPanel) {
                this.school.addEnergy(20);
                this.updateEnergyMeter();
            }
        });
    }

    updateEnergyMeter() {
        // Update energy meter logic
    }
}
```

### School.ts
```typescript
import Phaser from 'phaser';

export default class School {
    private scene: Phaser.Scene;
    private energy: number;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;
        this.energy = 0;
        this.scene.add.image(x, y, 'school');
    }

    addEnergy(amount: number) {
        this.energy += amount;
        if (this.energy >= 100) {
            // Trigger win condition
        }
    }
}
```

### SolarPanel.ts
```typescript
import Phaser from 'phaser';

export default class SolarPanel {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this.scene = scene;
        const panel = this.scene.add.image(x, y, 'solar').setInteractive();
        this.scene.input.setDraggable(panel);
    }
}
```

This setup provides a basic framework for Level 1 of the Smart City Simulator, focusing on powering the school with renewable energy through solar panels.