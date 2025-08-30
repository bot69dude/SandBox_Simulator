import Phaser from 'phaser';

export class AssetLoader {
    static preloadAssets(scene: Phaser.Scene): void {
        // Load images
        scene.load.image('school', '/Game/assets/sprites/school.jpeg');
        scene.load.image('solar-panel', '/Game/assets/sprites/solar-panel.jpeg');
        scene.load.image('background', '/Game/assets/sprites/background.jpeg');
        
        // Load audio (when we add sound effects)
        // scene.load.audio('place-sound', '/Game/assets/audio/place.mp3');
        // scene.load.audio('success-sound', '/Game/assets/audio/success.mp3');
    }

    static createPlaceholderImages(scene: Phaser.Scene): void {
        // Create colored rectangles as placeholders when images aren't available
        
        // School building
        const schoolTexture = scene.add.graphics();
        schoolTexture.fillStyle(0x8B4513);
        schoolTexture.fillRect(0, 0, 200, 150);
        schoolTexture.generateTexture('school-placeholder', 200, 150);
        schoolTexture.destroy();

        // Solar panel
        const solarTexture = scene.add.graphics();
        solarTexture.fillStyle(0x0066CC);
        solarTexture.fillRect(0, 0, 60, 40);
        solarTexture.generateTexture('solar-placeholder', 60, 40);
        solarTexture.destroy();

        // Background
        const bgTexture = scene.add.graphics();
        bgTexture.fillStyle(0x90EE90);
        bgTexture.fillRect(0, 0, 1024, 768);
        bgTexture.generateTexture('bg-placeholder', 1024, 768);
        bgTexture.destroy();
    }
}