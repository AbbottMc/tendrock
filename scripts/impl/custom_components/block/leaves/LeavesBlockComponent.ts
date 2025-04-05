import {
  Block, BlockComponentPlayerPlaceBeforeEvent, BlockComponentRandomTickEvent, BlockComponentTickEvent,
  BlockCustomComponent, BlockPermutation, Dimension, system, world
} from "@minecraft/server";
import {bindThis} from "../../../lib/decorator/BindThis";
import {BlockUtils, DirectionUtils, LoopOperator, serverWorld, StateUtils} from "@tendrock/lib";
import {LeavesStates} from "./ref/LeavesStates";
import {MinecraftBlockTypes} from "@minecraft/vanilla-data";
import {Weather} from "../../../lib/world/Weather";
import {LocationUtils} from "../../../lib/util/LocationUtils";
import {CustomComponentParams} from "../../../../common/types/tendrock";

export interface LeavesComponentParameters {
  loot: string;
}

export class LeavesBlockComponent implements BlockCustomComponent {
  public static Id = 'tendrock:leaves';
  public static Instance = new LeavesBlockComponent();

  private static MaxDistance = 7;

  @bindThis
  beforeOnPlayerPlace(event: BlockComponentPlayerPlaceBeforeEvent) {
    // Set the persistent state to true if the leaves is player placed;
    event.permutationToPlace = StateUtils.withState(event.permutationToPlace, LeavesStates.Persistent, true);
  }

  @bindThis
  onRandomTick(event: BlockComponentRandomTickEvent, {params}: CustomComponentParams<LeavesComponentParameters>) {
    const {block, dimension} = event;
    this.executeDecay(block, dimension, params);
    this.spawnParticleWhenItRains(event.block, event.dimension);
  }

  @bindThis
  onTick(event: BlockComponentTickEvent) {
    // Performance improvement
    // Low down the frequency of the log distance checking
    if (system.currentTick % 20 !== 0) {
      return;
    }

    // If the leaves is persistent, do not check log distance;
    if (this.isPersistent(event.block)) return;
    event.block.setPermutation(LeavesBlockComponent.updateDistanceFromLogs(event.block));
  }

  private executeDecay(block: Block, dimension: Dimension, params: LeavesComponentParameters) {
    if (LeavesBlockComponent.shouldDecay(block)) {
      const lootTable = this.getLootTable(block, params);
      // loot spawn ~ ~ ~ loot "tendrock/leaves/test"
      const commandStr = `loot spawn ${block.location.x} ${block.location.y} ${block.location.z} loot "${lootTable}"`;

      block.setType(MinecraftBlockTypes.Air);
      dimension.runCommand(commandStr);
    }
  }

  private spawnParticleWhenItRains(block: Block, dimension: Dimension) {
    if (!Weather.isRaining(dimension)) {
      return;
    }
    if (Math.floor(Math.random() * 15) !== 1) {
      return;
    }
    const belowBlock = block.below();

    // TODO: Handle the non-full-cube block
    if (!belowBlock.isAir) {
      return;
    }

    dimension.spawnParticle('minecraft:water_drip_particle', LocationUtils.randomXZIn(block.location));
  }

  private getLootTable(block: Block, params: LeavesComponentParameters) {
    const {loot} = params;
    if (loot) return loot;
    const [namespace, id] = block.typeId.split(':');
    return `${namespace}/leaves/${id.replaceAll('_leaves', '').replaceAll('leaves_', '')}`;
  }

  private isPersistent(block: Block) {
    return LeavesBlockComponent.getPersistentState(block.permutation);
  }

  public static shouldDecay(block: Block) {
    const {distance, persistent} = LeavesBlockComponent.getLeavesStates(block);
    return !persistent && distance === this.MaxDistance;
  }

  public static getDistanceState(permutation: BlockPermutation) {
    return StateUtils.getState<number>(permutation, LeavesStates.Distance);
  }

  public static getPersistentState(permutation: BlockPermutation) {
    return StateUtils.getState<boolean>(permutation, LeavesStates.Persistent);
  }

  public static getLeavesStates(block: Block) {
    const distance = this.getDistanceState(block.permutation);
    const persistent = this.getPersistentState(block.permutation);
    return {distance, persistent};
  }

  public static updateDistanceFromLogs(block: Block) {
    let i = this.MaxDistance;
    serverWorld.forEachNeighborBlock(block, (neighborBlock, direction) => {
      neighborBlock = block[DirectionUtils.getDirectionMethodName(direction)]();
      if (!neighborBlock?.isValid) {
        return;
      }
      i = Math.min(i, LeavesBlockComponent.getDistanceFromLog(neighborBlock.permutation) + 1);
      if (i == 1) return LoopOperator.Break;
    });
    if (block.isAir) return block.permutation;
    return StateUtils.withState(block.permutation, LeavesStates.Distance, i);
  }

  private static getDistanceFromLog(permutation: BlockPermutation) {
    if (BlockUtils.isLog(permutation)) {
      return 0;
    }
    if (StateUtils.hasState(permutation, LeavesStates.Distance)) {
      return this.getDistanceState(permutation);
    }
    return this.MaxDistance;
  }
}