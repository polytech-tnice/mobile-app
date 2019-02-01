import { ActionType } from "./action-type";

export abstract class Action {
    constructor(protected type: ActionType, protected creator: string, protected voteCount: number) {}

    public getTypeAsString(): string {
        switch (this.type) {
            case ActionType.WIND: return 'Effet de vent';
            case ActionType.UNKNOWN: return 'Inconnue';
        }
    }

    public getCreator(): string {
        return this.creator;
    }
}