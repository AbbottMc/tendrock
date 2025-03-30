import { StateUtils } from "../util/StateUtils";
import { DirectionUtils } from "../util/DirectionUtils";
import { LoopOperator } from "../enum";
export class ServerWorld {
    setState(block, stateName, state) {
        const permutation = StateUtils.withState(block.permutation, stateName, state);
        block.setPermutation(permutation);
    }
    neighborBlock(block, direction) {
        return block[DirectionUtils.getDirectionMethodName(direction)]();
    }
    forEachNeighborBlock(block, callback) {
        for (const direction of DirectionUtils.allDirections) {
            const neighborBlock = block[DirectionUtils.getDirectionMethodName(direction)]();
            if (!(neighborBlock === null || neighborBlock === void 0 ? void 0 : neighborBlock.isValid))
                continue;
            const loopOperator = callback(neighborBlock, direction);
            if (loopOperator === LoopOperator.Break)
                break;
        }
    }
}
export const serverWorld = new ServerWorld();
//# sourceMappingURL=ServerWorld.js.map