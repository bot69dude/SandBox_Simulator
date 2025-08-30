import Phaser from 'phaser';
import School from '../Objects/School';
import SolarPanel from '../Objects/SolarPanel';

export default class Level1Scene extends Phaser.Scene {
    private school!: School;
    private solarPanels: SolarPanel[];
    private energyMeter: number;
    private maxEnergy: number;
    private dropZone!: Phaser.GameObjects.Zone;

    constructor() {
        super('Level1Scene');
        this.solarPanels = [];
        this.energyMeter = 0;
        this.maxEnergy = 100;
    }

    init(): void {
        // Reset state when scene starts/restarts
        this.solarPanels = [];
        this.energyMeter = 0;
        this.maxEnergy = 100;
    }

    preload() {
        // Create placeholder images using graphics
        this.createPlaceholderImages();
    }

    private createPlaceholderImages() {
        // Create graphics for placeholder images
        const graphics = this.add.graphics();
        
        // School building (brown rectangle)
        graphics.fillStyle(0x8B4513);
        graphics.fillRect(0, 0, 200, 150);
        graphics.generateTexture('school', 200, 150);
        
        // Solar panel (blue rectangle)
        graphics.clear();
        graphics.fillStyle(0x0066CC);
        graphics.fillRect(0, 0, 60, 40);
        graphics.generateTexture('solar-panel', 60, 40);
        
        // Destroy graphics object
        graphics.destroy();
    }

    create() {
        // Background
        this.add.rectangle(512, 384, 1024, 768, 0x90EE90); // Light green

        // Create school
        this.school = new School(this, 512, 400);

        // Create drop zone around school
        this.dropZone = this.add.zone(512, 400, 250, 200);
        this.dropZone.setRectangleDropZone(250, 200);

        // Create initial solar panel for dragging
        this.createDraggableSolarPanel();

        // Set up drag and drop
        this.setupDragAndDrop();

        // Add instructions
        this.add.text(50, 50, 'Drag solar panels to the school to power it!', {
            fontSize: '24px',
            color: '#333333',
            fontFamily: 'Arial'
        });

        // Back to menu button
        const backButton = this.add.rectangle(100, 700, 120, 40, 0xe74c3c)
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.start('MenuScene');
            });

        this.add.text(100, 700, 'Back to Menu', {
            fontSize: '16px',
            color: '#ffffff',
            fontFamily: 'Arial'
        }).setOrigin(0.5);

        // Reset school energy when scene starts
        if (this.school) {
            this.school.resetEnergy();
        }
    }

    private createDraggableSolarPanel() {
        const panel = new SolarPanel(this, 150, 150);
        this.solarPanels.push(panel);
    }

    private setupDragAndDrop() {
        this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject) => {
            if (gameObject instanceof SolarPanel) {
                gameObject.x = pointer.x;
                gameObject.y = pointer.y;
            }
        });

        this.input.on('drop', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dropZone: Phaser.GameObjects.Zone) => {
            if (gameObject instanceof SolarPanel && dropZone === this.dropZone) {
                this.placeSolarPanel(gameObject);
            }
        });

        this.input.on('dragend', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dropped: boolean) => {
            if (!dropped && gameObject instanceof SolarPanel) {
                // Return to original position if not dropped in zone
                gameObject.x = 150;
                gameObject.y = 150;
            }
        });
    }

    private placeSolarPanel(solarPanel: SolarPanel) {
        // Place panel on school roof
        const placedPanels = this.solarPanels.filter(panel => panel.getIsPlaced());
        solarPanel.x = this.school.x + (placedPanels.length * 30) - 60;
        solarPanel.y = this.school.y - 50;
        solarPanel.place();

        // Add energy
        const energyGain = solarPanel.getEnergyOutput();
        this.school.addEnergy(energyGain);
        this.energyMeter = this.school.getEnergyLevel();

        // Emit energy update event to React
        this.game.events.emit('energy-updated', this.energyMeter);
        this.game.events.emit('solar-panel-placed');

        // Create a new draggable solar panel
        if (this.energyMeter < this.maxEnergy) {
            this.createDraggableSolarPanel();
        }

        // Check win condition
        if (this.energyMeter >= this.maxEnergy) {
            this.game.events.emit('level-complete');
        }
    }

    update() {
        // Update logic can go here
    }

    // Clean up method for proper scene restart
    shutdown() {
        // Clean up event listeners
        this.input.removeAllListeners();
    }
}