import { Direction } from "../direction";
import { e } from "@angular/core/src/render3";

export class Point {
    constructor(private x: number, private y: number) {
        this.x = x;
        this.y = y;
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }
}

export class PointUtil {

    private static SPEED_TICK: number = 5;

    /**
     * Compute the direction between 2 points.
     * For starter, because we only have EAST, WEST, NORTH and SOUTH we have to 
     * manage the difference in the deltas of X and Y for the 2 points.
     * @param origin 
     * @param destination 
     */
    public static computeDirection(origin: Point, destination: Point): Direction {
        const deltaX = destination.getX() - origin.getX();
        const deltaY = destination.getY() - origin.getY();
        
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            // On suppose que la direction sera soit EAST soit WEST
            if (deltaX > 0) return Direction.EAST;
            else return Direction.WEST;
        } else {
            // On suppose que la direction sera soit NORD soit SUD
            if (deltaY > 0) return Direction.SOUTH;
            else return Direction.NORTH;
        }

    }

    public static computeSpeed(origin: Point, destination: Point): number {
        const deltaX = destination.getX() - origin.getX();
        const deltaY = destination.getY() - origin.getY();
        if (deltaX > 0) {
            // Swipe vers la droite, on ajoute de la vitesse
            return this.SPEED_TICK;
        } else {
            // Swipe vers la gauche, on retire de la vitesse
            return -this.SPEED_TICK;
        }
    }


    public static computeDistance(origin: Point, destination: Point): number {
        const deltaX = destination.getX() - origin.getX();
        const deltaY = destination.getY() - origin.getY();
        const dist = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));
        return dist;
    }
}