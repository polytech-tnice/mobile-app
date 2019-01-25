export enum WindForceEnum {
    HIGH,
    MEDIUM,
    LOW,
    VERY_LOW
}

export class WindForceUtil {
    public static convertToWindForce(n: number): WindForceEnum {
        switch (n) {
            case 0: return WindForceEnum.HIGH;
            case 1: return WindForceEnum.MEDIUM;
            case 2: return WindForceEnum.LOW;
            case 3: return WindForceEnum.VERY_LOW;
        }
    }
}