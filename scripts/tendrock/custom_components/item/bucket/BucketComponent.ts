import {
  Block, Direction, GameMode, ItemComponentUseEvent, ItemComponentUseOnEvent, ItemCustomComponent, ItemStack,
  LiquidType, world
} from "@minecraft/server";
import {Tendrock} from "../../../Tendrock";
import {BucketRegisterConfig} from "../../../../tendrock-core/registry/BucketRegistry";
import {bindThis} from "../../../lib/decorator/BindThis";
import {TendrockVector3} from "../../../../tendrock-lib/vector";
import {DirectionUtils, EntityUtils, PlayerUtils} from "../../../../tendrock-lib/util";
import {MinecraftBlockTypes} from "@minecraft/vanilla-data";
import {serverWorld} from "../../../../tendrock-lib/server";
import {SetMap} from "../../../../tendrock-lib/data/SetMap";


export class BucketComponent implements ItemCustomComponent {
  constructor() {
    Tendrock.Ipc.on('tendrock:register_bucket', (event) => {
      this.register(event.value as BucketRegisterConfig);
    });
  }

  protected fullBucketToEmptyMap = new Map<string, string>();
  protected fullBucketToFluidMap = new Map<string, string>();
  protected emptyBucketToFullMap = new Map<string, Map<string, string>>();
  protected emptyBucketToFluidMap = new SetMap<string, string>();
  protected fullBucketEmptySoundIdMap = new Map<string, string>();
  protected emptyBucketFillSoundIdMap = new Map<string, string>();

  private isEmptyBucket(itemStack: ItemStack) {
    return this.emptyBucketToFullMap.has(itemStack.typeId);
  }

  private isFullBucket(itemStack: ItemStack) {
    return this.fullBucketToFluidMap.has(itemStack.typeId);
  }

  private isBucket(itemStack: ItemStack) {
    // return itemStack.getTags().includes(Ic2ItemTagNames.buckets);
    return this.fullBucketToFluidMap.has(itemStack.typeId) || this.emptyBucketToFullMap.has(itemStack.typeId);
  }

  private setWaterlogged(block: Block) {
    block.setWaterlogged(true);
    for (const direction of DirectionUtils.allDirections) {
      if (direction === Direction.Up) continue;
      const iBlock = serverWorld.neighborBlock(block, direction);
      if (!iBlock.isAir) continue;
      iBlock.setType(MinecraftBlockTypes.FlowingWater);
      serverWorld.setState(iBlock, 'liquid_depth', direction === Direction.Down ? 8 : 1);
      iBlock.setType(MinecraftBlockTypes.Air);
      break;
    }
  }

  public register(config: BucketRegisterConfig) {
    this.fullBucketToEmptyMap.set(config.fullBucketId, config.emptyBucketId);
    this.fullBucketToFluidMap.set(config.fullBucketId, config.flowingLiquidBlockId);
    this.fullBucketEmptySoundIdMap.set(config.fullBucketId, config.emptySoundId);
    this.emptyBucketFillSoundIdMap.set(config.fullBucketId, config.fillSoundId);
    this.emptyBucketToFluidMap.push(config.emptyBucketId, config.liquidBlockId);
    this.addToMapEle(this.emptyBucketToFullMap, config.emptyBucketId, config.liquidBlockId, config.fullBucketId);
    this.addToMapEle(this.emptyBucketToFullMap, config.emptyBucketId, config.flowingLiquidBlockId, config.fullBucketId);
  }

  @bindThis
  onUseOn(event: ItemComponentUseOnEvent) {
    const {itemStack, block, source: player} = event;
    if (this.isFullBucket(itemStack)) {
      return this.emptyBucket(event);
    }
    if (this.isEmptyBucket(itemStack)) {
      if (block.isWaterlogged) {
        const fullBucketId = this.emptyBucketToFullMap.get(itemStack.typeId)?.get(MinecraftBlockTypes.Water);
        const fillSoundId = this.emptyBucketFillSoundIdMap.get(fullBucketId);
        block.setWaterlogged(false);
        block.dimension.playSound(fillSoundId, player.location);
      }
    }
  }

  @bindThis
  onUse(event: ItemComponentUseEvent) {
    if (this.isEmptyBucket(event.itemStack)) {
      return this.fillBucket(event);
    }
  }

  fillBucket(event: ItemComponentUseEvent) {
    const {itemStack, source} = event;
    const raycastHit = source.getBlockFromViewDirection({
      includeLiquidBlocks: true,
      // includePassableBlocks: true,
    });
    if (!raycastHit) return;
    const block = raycastHit.block;
    world.sendMessage(TendrockVector3.distance(block.location, source.location).toString())
    if (TendrockVector3.distance(block.location, source.location) > 6) return;
    if (!block?.isValid) return;

    const fullBucketId = this.emptyBucketToFullMap.get(itemStack.typeId)?.get(block.typeId);
    if (!fullBucketId) return;
    const fillSoundId = this.emptyBucketFillSoundIdMap.get(fullBucketId);
    const flowingLiquidBlockId = this.fullBucketToFluidMap.get(fullBucketId);
    const liquidBlockList = this.emptyBucketToFluidMap.get(itemStack.typeId);
    if (!liquidBlockList) return;
    if (!liquidBlockList.has(block.typeId) && block.typeId !== flowingLiquidBlockId) return;

    event.source.dimension.setBlockType(block, MinecraftBlockTypes.Air);
    source.dimension.playSound(fillSoundId, source.location);
    if (PlayerUtils.isGameMode(source, GameMode.creative)) return;
    PlayerUtils.consumeMainHandItem(source);
    EntityUtils.getContainer(source).addItem(new ItemStack(fullBucketId));
  }

  emptyBucket(event: ItemComponentUseOnEvent) {
    const {itemStack, blockFace, block, source: player} = event;
    if (block.typeId === MinecraftBlockTypes.Frame) return;
    if (!PlayerUtils.isPlayer(player)) return;

    const emptyBucketId = this.fullBucketToEmptyMap.get(itemStack.typeId);
    const fluidBlockId = this.fullBucketToFluidMap.get(itemStack.typeId);
    const emptySoundId = this.fullBucketEmptySoundIdMap.get(itemStack.typeId);
    // TODO: More specific error check

    let isWaterlogged = true, neighborBlock: Block;
    if (fluidBlockId === MinecraftBlockTypes.FlowingWater && block.canContainLiquid(LiquidType.Water)) {
      this.setWaterlogged(block);
    } else {
      neighborBlock = serverWorld.neighborBlock(block, blockFace);
      if (!neighborBlock.isAir) return;
      isWaterlogged = false;
    }
    if (!isWaterlogged) neighborBlock.setType(fluidBlockId);
    player.dimension.playSound(emptySoundId, player.location);
    if (PlayerUtils.isGameMode(player, GameMode.creative)) return;
    PlayerUtils.consumeMainHandItem(player);
    EntityUtils.getContainer(player).addItem(new ItemStack(emptyBucketId));
  }

  getEmptyBucketId(fullBucketId: string) {
    return this.fullBucketToEmptyMap.get(fullBucketId);
  }

  private addToMapEle(map: Map<string, Map<string, string>>, key: string, subKey: string, ele: string) {
    const list = map.get(key) ?? new Map<string, string>();
    list.set(subKey, ele);
    map.set(key, list);
  }
}