import Phaser from 'phaser';

export default class School extends Phaser.GameObjects.Container {
    private energyLevel: number = 0;
    private maxEnergy: number = 100;
    private schoolSprite!: Phaser.GameObjects.Rectangle;
    private lightOverlay!: Phaser.GameObjects.Rectangle;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        
        // Main school building (brown rectangle)
        this.schoolSprite = scene.add.rectangle(0, 0, 200, 150, 0x8B4513);
        this.add(this.schoolSprite);
        
        // Light overlay (yellow, hidden initially)
        this.lightOverlay = scene.add.rectangle(0, 0, 200, 150, 0xFFFF00);
        this.lightOverlay.setAlpha(0);
        this.add(this.lightOverlay);

        // Add windows
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                const window = scene.add.rectangle(-60 + i * 60, -40 + j * 60, 20, 20, 0x87CEEB);
                this.add(window);
            }
        }

        // Add door
        const door = scene.add.rectangle(0, 50, 30, 50, 0x654321);
        this.add(door);
        
        scene.add.existing(this);
        this.setSize(200, 150);
    }

    addEnergy(amount: number): void {
        this.energyLevel = Math.min(this.energyLevel + amount, this.maxEnergy);
        this.updateVisuals();
    }

    private updateVisuals(): void {
        const energyPercentage = this.energyLevel / this.maxEnergy;
        this.lightOverlay.setAlpha(energyPercentage * 0.5);
        
        // Add glow effect when fully powered
        if (energyPercentage >= 1) {
            this.schoolSprite.setStrokeStyle(4, 0xFFD700);
        } else {
            this.schoolSprite.setStrokeStyle(0);
        }
    }

    getEnergyLevel(): number {
        return this.energyLevel;
    }

    getMaxEnergy(): number {
        return this.maxEnergy;
    }

    getEnergyPercentage(): number {
        return (this.energyLevel / this.maxEnergy) * 100;
    }

    resetEnergy(): void {
        this.energyLevel = 0;
        this.updateVisuals();
    }
}