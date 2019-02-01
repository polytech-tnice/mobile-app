import { Action } from "./action";
import { ActionType } from "./action-type";

export class WindAction extends Action {
    constructor(protected creator: string, protected voteCount: number, private speed: number, private direction: string) {
        super(ActionType.WIND, creator, voteCount);
    }

    getSpeed(): number {
        return this.speed;
    }

    getDirection(): string {
        return this.direction;
    }
}