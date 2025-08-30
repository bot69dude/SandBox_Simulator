import Phaser from 'phaser';

export default class SolarPanel extends Phaser.GameObjects.Container {
    private panelSprite!: Phaser.GameObjects.Rectangle;
    private energyOutput: number = 25;
    private isPlaced: boolean = false;

    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        
        // Create blue rectangle for solar panel
        this.panelSprite = scene.add.rectangle(0, 0, 60, 40, 0x0066CC);
        this.add(this.panelSprite);

        // Add grid lines to make it look more like a solar panel
        const gridH1 = scene.add.rectangle(0, -10, 60, 2, 0x004499);
        const gridH2 = scene.add.rectangle(0, 10, 60, 2, 0x004499);
        const gridV1 = scene.add.rectangle(-15, 0, 2, 40, 0x004499);
        const gridV2 = scene.add.rectangle(15, 0, 2, 40, 0x004499);
        
        this.add([gridH1, gridH2, gridV1, gridV2]);
        
        scene.add.existing(this);
        this.setSize(60, 40);
        this.setInteractive();
        scene.input.setDraggable(this);
        
        // Add hover effect
        this.on('pointerover', () => {
            if (!this.isPlaced) {
                this.panelSprite.setFillStyle(0x0088FF);
            }
        });
        
        this.on('pointerout', () => {
            if (!this.isPlaced) {
                this.panelSprite.setFillStyle(0x0066CC);
            }
        });
    }

    place(): void {
        this.isPlaced = true;
        this.disableInteractive();
        this.panelSprite.setFillStyle(0x00AA00);
        
        // Add animation effect
        this.scene.tweens.add({
            targets: this,
            scaleX: 1.2,
            scaleY: 1.2,
            duration: 200,
            yoyo: true,
            ease: 'Power2'
        });
    }

    getEnergyOutput(): number {
        return this.energyOutput;
    }

    getIsPlaced(): boolean {
        return this.isPlaced;
    }
}