import Phaser from 'phaser';

export default class PowerMeter extends Phaser.GameObjects.Container {
    private background!: Phaser.GameObjects.Rectangle;
    private fillBar!: Phaser.GameObjects.Rectangle;
    private energyText!: Phaser.GameObjects.Text;
    private currentEnergy: number = 0;
    private maxEnergy: number = 100;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        // Background
        this.background = scene.add.rectangle(0, 0, 200, 30, 0x333333);
        this.add(this.background);

        // Fill bar
        this.fillBar = scene.add.rectangle(-100, 0, 0, 25, 0xFF4444);
        this.add(this.fillBar);

        // Text
        this.energyText = scene.add.text(0, 0, '0 / 100', {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);
        this.add(this.energyText);

        scene.add.existing(this);
    }

    updateEnergy(current: number, max?: number): void {
        if (max) this.maxEnergy = max;
        this.currentEnergy = current;

        const percentage = (this.currentEnergy / this.maxEnergy);
        const barWidth = 190 * percentage;
        
        this.fillBar.setSize(barWidth, 25);
        this.fillBar.x = -100 + (barWidth / 2);

        // Change color based on energy level
        if (percentage < 0.3) {
            this.fillBar.setFillStyle(0xFF4444);
        } else if (percentage < 0.7) {
            this.fillBar.setFillStyle(0xFFAA00);
        } else {
            this.fillBar.setFillStyle(0x44FF44);
        }

        this.energyText.setText(`${this.currentEnergy} / ${this.maxEnergy}`);
    }

    getCurrentEnergy(): number {
        return this.currentEnergy;
    }

    getMaxEnergy(): number {
        return this.maxEnergy;
    }
}