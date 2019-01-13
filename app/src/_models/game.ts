import { Player } from "./player";
import { GameStateEnum } from "./gameState";

export class Game {

    constructor(private name: string, private players: Player[], private status: GameStateEnum) {}

    public getName(): string {
        return this.name;
    }

    public getPlayers(): Player[] {
        return this.players;
    }

    public getStatus(): string {
        switch (this.status) {
            case 1: return 'En cours';
            case 2: return 'En pause';
            case 3: return 'Terminée';
            default: return 'Oops wrong status...'
        }
    }

}