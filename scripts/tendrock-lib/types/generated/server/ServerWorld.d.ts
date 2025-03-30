import { Block, Direction } from "@minecraft/server";
import { LoopOperator } from "../enum";
export declare class ServerWorld {
    setState<T extends (number | string | boolean)>(block: Block, stateName: string, state: T): void;
    neighborBlock(block: Block, direction: Direction): Block;
    forEachNeighborBlock(block: Block, callback: (neighborBlock: Block, direction: Direction) => LoopOperator | void): void;
}
export declare const serverWorld: ServerWorld;
