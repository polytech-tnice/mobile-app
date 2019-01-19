import { Action } from "./action";
import { ActionType } from "./action-type";

export class WindAction extends Action {
    constructor(protected creator: string, private speed: number, private direction: string) {
        super(ActionType.WIND, creator);
    }

    getSpeed(): number {
        return this.speed;
    }

    getDirection(): string {
        return this.direction;
    }
}