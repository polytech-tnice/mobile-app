import { Direction } from "./direction";

export class DirectionUtil {

    public static opposite(dir: Direction): Direction {
        switch (dir) {
            case Direction.NORTH: return Direction.SOUTH;
            case Direction.SOUTH: return Direction.NORTH;
            case Direction.EAST: return Direction.WEST;
            case Direction.WEST: return Direction.EAST;
        }
    }

    public static directionLabel(dir: Direction): string {
        switch (dir) {
            case Direction.NORTH: return "Nord";
            case Direction.SOUTH: return "Sud";
            case Direction.EAST: return "Est";
            case Direction.WEST: return "Ouest";
        }
    }

    public static direction(str: string): Direction {
        switch (str) {
            case "Nord": return Direction.NORTH;
            case "Sud": return Direction.SOUTH;
            case "Est": return Direction.EAST;
            case "Ouest": return Direction.WEST;
        }
    }

}