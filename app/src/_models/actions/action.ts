import { ActionType } from "./action-type";

export abstract class Action {
    constructor(protected type: ActionType) {}

    public getTypeAsString(): string {
        switch (this.type) {
            case ActionType.WIND: return 'Effet de vent';
            case ActionType.UNKNOWN: return 'Inconnue';
        }
    }
}