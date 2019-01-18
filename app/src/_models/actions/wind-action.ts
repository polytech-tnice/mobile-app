import { Action } from "./action";
import { Direction } from "../direction";
import { ActionType } from "./action-type";

export class WindAction extends Action {
    constructor(private creator: string, private speed: number, private direction: string) {
        super(ActionType.WIND);
    }

    getCreator(): string {
        return this.creator;
    }

    getSpeed(): number {
        return this.speed;
    }

    getDirection(): string {
        return this.direction;
    }
}