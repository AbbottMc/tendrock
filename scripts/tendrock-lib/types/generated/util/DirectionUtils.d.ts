import { Direction } from '@minecraft/server';
export type BlockDirectionMethodNames = 'above' | 'below' | 'east' | 'west' | 'south' | 'north';
export declare class DirectionUtils {
    static readonly allDirections: Direction[];
    static readonly allBlockDirectionMethodNames: string[];
    static reverse(direction: Direction): Direction;
    static getDirectionMethodName(direction: Direction): BlockDirectionMethodNames;
    static fromPropertyStr(propertyStr: string): Direction | undefined;
    static allDirectionExclude(...excludeDirectionList: Direction[]): Direction[];
}
