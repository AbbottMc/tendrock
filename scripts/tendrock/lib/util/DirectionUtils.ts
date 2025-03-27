import {Direction} from '@minecraft/server'

export type BlockDirectionMethodNames = 'above' | 'below' | 'east' | 'west' | 'south' | 'north';

export class DirectionUtils {
  static readonly allDirections = [Direction.Up, Direction.Down, Direction.North, Direction.South, Direction.West, Direction.East];
  static readonly allBlockDirectionMethodNames = ['above', 'below', 'east', 'west', 'south', 'north'];

  static getOppositeDirection(direction: Direction): Direction {
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

  static getDirectionMethodName(direction: Direction): BlockDirectionMethodNames {
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

  static fromPropertyStr(propertyStr: string): Direction | undefined {
    if (!propertyStr) return undefined;
    return (propertyStr.substring(0, 1).toUpperCase() + propertyStr.substring(1)) as Direction;
  }

  static allDirectionExclude(...excludeDirectionList: Direction[]) {
    return DirectionUtils.allDirections.concat().filter((direction) => !excludeDirectionList.includes(direction));
  }
}