import {
  Block, BlockComponentPlayerPlaceBeforeEvent, BlockComponentRandomTickEvent, BlockComponentTickEvent,
  BlockCustomComponent, BlockPermutation, Dimension, system, world
} from "@minecraft/server";
import {BindThis} from "../../lib/decorator/BindThis";
import {StateUtils} from "../../lib/util/StateUtils";
import {LeavesStates} from "./ref/LeavesStates";
import {DirectionUtils} from "../../lib/util/DirectionUtils";
import {VanillaItemTags} from "../../lib/ref/VanillaItemTags";
import {MinecraftBlockTypes} from "@minecraft/vanilla-data";
import {Identifier} from "../../lib/Identifier";
import {Weather} from "../../lib/world/Weather";
import {LocationUtils} from "../../lib/util/LocationUtils";

export class LeavesBlockComponent implements BlockCustomComponent {

  private static MaxDistance = 7;

  @BindThis
  beforeOnPlayerPlace(event: BlockComponentPlayerPlaceBeforeEvent) {
    // Set the persistent state to true if the leaves is player placed;
    event.permutationToPlace = StateUtils.setState(event.permutationToPlace, LeavesStates.Persistent, true);
  }

  @BindThis
  onRandomTick(event: BlockComponentRandomTickEvent) {
    const {block, dimension} = event;
    this.executeDecay(block, dimension);
    this.spawnParticleWhenItRains(event.block, event.dimension);
  }

  @BindThis
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

  private executeDecay(block: Block, dimension: Dimension) {
    if (LeavesBlockComponent.shouldDecay(block)) {
      world.sendMessage('decay!');
      const lootTable = this.getLootTable(block);
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

  private getLootTable(block: Block) {
    return `tendrock/leaves/${Identifier.getId(block.typeId).replace('_leaves', '')}`;
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
    let neighborBlock: Block;
    for (const direction of DirectionUtils.allDirections) {
      neighborBlock = block[DirectionUtils.getDirectionMethodName(direction)]();
      if (!neighborBlock?.isValid) {
        continue;
      }
      i = Math.min(i, LeavesBlockComponent.getDistanceFromLog(neighborBlock.permutation) + 1);
      if (i == 1) break;
    }
    if (block.isAir) return block.permutation;
    return StateUtils.setState(block.permutation, LeavesStates.Distance, i);
  }

  private static getDistanceFromLog(permutation: BlockPermutation) {
    const itemStack = permutation.getItemStack();
    if (!itemStack) return this.MaxDistance;
    if (itemStack.hasTag(VanillaItemTags.Logs)) {
      return 0;
    }
    if (StateUtils.hasState(permutation, LeavesStates.Distance)) {
      return this.getDistanceState(permutation);
    }
    return this.MaxDistance;
  }
}