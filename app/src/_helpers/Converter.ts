
import { GameStateEnum } from "../_models/gameState";
import { Game } from "../_models/game";
import { Player } from "../_models/player";
import { Action } from "../_models/actions/action";
import { WindAction } from "../_models/actions/wind-action";
import { ActionPhaseEnum } from "../_models/actions/action-phase-step";

export class Converter {

    public static convertToGame(x: any): Game {
        const name: string = x.name;
        const players: Player[] = [];
        x.players.forEach((elt: any) => {
            const name: string = elt.name;
            const player: Player = new Player(name);
            players.push(player);
        });
        const state: GameStateEnum = this.convertToGameStateEnum(x.status);
        const actionPhase: ActionPhaseEnum = this.convertToActionPhaseEnum(x.step);
        return new Game(name, players, state, actionPhase);
    }

    public static convertToActionPhaseEnum(x: number): ActionPhaseEnum {
        switch (x) {
            case 1: return ActionPhaseEnum.CREATION;
            case 2: return ActionPhaseEnum.VOTE;
            case 3: return ActionPhaseEnum.RESULTS;
            default: return ActionPhaseEnum.RESULTS;
        }
    }

    public static convertToGameStateEnum(x: number): GameStateEnum {
        switch (x) {
            case 1: return GameStateEnum.InProgress;
            case 2: return GameStateEnum.Interupted;
            case 3: return GameStateEnum.Finished;
        }
    }

    public static convertToAction(x: any): Action {
        let action: Action;
        // When action type is 1 it means that it's a wind action
        if (x.action.actionType === 1) {
            action = this.convertToWindAction(x);
        }
        return action;
    }

    private static convertToWindAction(x: any): WindAction {
        const creator: string = x.creator;
        const speed: number = x.action.speed;
        const direction: string = x.action.direction;
        return new WindAction(creator, speed, direction);
    }

}