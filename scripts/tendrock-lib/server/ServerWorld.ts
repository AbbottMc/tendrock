import {Block, Direction} from "@minecraft/server";
import {StateUtils} from "../util/StateUtils";
import {DirectionUtils} from "../util/DirectionUtils";
import {LoopOperator} from "../enum";

export class ServerWorld {
  public setState<T extends (number | string | boolean)>(block: Block, stateName: string, state: T): void {
    const permutation = StateUtils.withState(block.permutation, stateName, state);
    block.setPermutation(permutation);
  }

  public neighborBlock(block: Block, direction: Direction) {
    return block[DirectionUtils.getDirectionMethodName(direction)]();
  }

  public forEachNeighborBlock(block: Block, callback: (neighborBlock: Block, direction: Direction) => LoopOperator | void) {
    for (const direction of DirectionUtils.allDirections) {
      const neighborBlock = block[DirectionUtils.getDirectionMethodName(direction)]();
      if (!neighborBlock?.isValid) continue;
      const loopOperator = callback(neighborBlock, direction);
      if (loopOperator === LoopOperator.Break) break;
    }
  }
}

export const serverWorld = new ServerWorld();
