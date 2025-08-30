import Phaser from 'phaser';
import { gameConfig } from './Utils/GameConfig';

export default class PhaserGame {
    private game: Phaser.Game;

    constructor(containerId: string) {
        const config = {
            ...gameConfig,
            parent: containerId
        };
        
        this.game = new Phaser.Game(config);
    }

    destroy() {
        if (this.game) {
            this.game.destroy(true);
        }
    }

    getGame(): Phaser.Game {
        return this.game;
    }

    // Event system to communicate with React
    get events() {
        return this.game.events;
    }
}