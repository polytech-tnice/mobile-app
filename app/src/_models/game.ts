import { Player } from "./player";
import { GameStateEnum } from "./gameState";
import { ActionPhaseEnum } from "./actions/action-phase-step";
import { Action } from "./actions/action";

export class Game {

    public lastExecutedAction: Action;

    constructor(public name: string, public players: Player[], public status: GameStateEnum, public actionPhase: ActionPhaseEnum) {
        this.lastExecutedAction = null;
    }

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

    public getActionPhaseStr(): string {
        switch (this.actionPhase) {
            case ActionPhaseEnum.CREATION: return "Ajout d'actions";
            case ActionPhaseEnum.VOTE: return "Vote en cours";
            case ActionPhaseEnum.RESULTS: return "Affichage des resultats du vote";
        }
    }

}