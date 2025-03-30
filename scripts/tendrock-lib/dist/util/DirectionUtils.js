import { Direction } from '@minecraft/server';
export class DirectionUtils {
    static reverse(direction) {
        switch (direction) {
            case Direction.Up:
                return Direction.Down;
            case Direction.Down:
                return Direction.Up;
            case Direction.North:
                return Direction.South;
            case Direction.South:
                return Direction.North;
            case Direction.West:
                return Direction.East;
            case Direction.East:
                return Direction.West;
        }
    }
    static getDirectionMethodName(direction) {
        switch (direction) {
            case Direction.Up:
                return 'above';
            case Direction.Down:
                return 'below';
            case Direction.North:
                return 'north';
            case Direction.South:
                return 'south';
            case Direction.West:
                return 'west';
            case Direction.East:
                return 'east';
        }
    }
    static fromPropertyStr(propertyStr) {
        if (!propertyStr)
            return undefined;
        return (propertyStr.substring(0, 1).toUpperCase() + propertyStr.substring(1));
    }
    static allDirectionExclude(...excludeDirectionList) {
        return DirectionUtils.allDirections.concat().filter((direction) => !excludeDirectionList.includes(direction));
    }
}
DirectionUtils.allDirections = [Direction.Up, Direction.Down, Direction.North, Direction.South, Direction.West, Direction.East];
DirectionUtils.allBlockDirectionMethodNames = ['above', 'below', 'east', 'west', 'south', 'north'];
//# sourceMappingURL=DirectionUtils.js.map