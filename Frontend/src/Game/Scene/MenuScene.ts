import Phaser from 'phaser';

export default class MenuScene extends Phaser.Scene {
    constructor() {
        super('MenuScene');
    }

    preload() {
        // Create simple colored rectangles as placeholders
        this.load.image('menu-bg', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==');
    }

    create() {
        this.add.rectangle(512, 384, 1024, 768, 0x4a90e2);
        
        const titleText = this.add.text(512, 200, 'Smart City Simulator', {
            fontSize: '48px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        const startButton = this.add.rectangle(512, 350, 200, 60, 0x27ae60)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('Level1Scene');
            });

        this.add.text(512, 350, 'Start Game', {
            fontSize: '24px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Button hover effects
        startButton.on('pointerover', () => startButton.setFillStyle(0x2ecc71));
        startButton.on('pointerout', () => startButton.setFillStyle(0x27ae60));
    }
}