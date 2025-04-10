import {SetMap} from "@tendrock/lib";
import {FluidType, ItemStack} from "@minecraft/server";
import {MinecraftBlockTypes, MinecraftItemTypes} from "@minecraft/vanilla-data";
import {AbstractConfigurator} from "../../core/config/AbstractConfigurator";
import {BucketConfig} from "../../core/config/item/BucketConfigurator";

export class AbstractBucketConfigurator extends AbstractConfigurator<BucketConfig> {
  protected fullBucketToEmptyMap = new Map<string, string>();
  protected fullBucketToFluidMap = new Map<string, string>();
  protected emptyBucketToFullMap = new Map<string, Map<string, string>>();
  protected emptyBucketToFluidMap = new SetMap<string, string>();
  protected fullBucketEmptySoundIdMap = new Map<string, string>();
  protected emptyBucketFillSoundIdMap = new Map<string, string>();

  protected fullBucketToFluidType = new Map<string, FluidType>([
    [MinecraftItemTypes.LavaBucket, FluidType.Lava],
    [MinecraftItemTypes.WaterBucket, FluidType.Water],
    [MinecraftItemTypes.PowderSnowBucket, FluidType.PowderSnow]
  ]);

  protected isEmptyBucket(itemStack: ItemStack) {
    return this.emptyBucketToFullMap.has(itemStack.typeId);
  }

  protected isFullBucket(itemStack: ItemStack) {
    return this.fullBucketToFluidMap.has(itemStack.typeId);
  }

  protected isBucket(itemStack: ItemStack) {
    // return itemStack.getTags().includes(Ic2ItemTagNames.buckets);
    return this.fullBucketToFluidMap.has(itemStack.typeId) || this.emptyBucketToFullMap.has(itemStack.typeId);
  }

  public config(config: BucketConfig) {
    super.config(config);
    this.fullBucketToEmptyMap.set(config.fullBucketId, config.emptyBucketId);
    this.fullBucketToFluidMap.set(config.fullBucketId, config.flowingLiquidBlockId);
    this.fullBucketEmptySoundIdMap.set(config.fullBucketId, config.emptySoundId);
    this.emptyBucketFillSoundIdMap.set(config.fullBucketId, config.fillSoundId);
    this.emptyBucketToFluidMap.push(config.emptyBucketId, config.liquidBlockId);
    this.addToMapEle(this.emptyBucketToFullMap, config.emptyBucketId, config.liquidBlockId, config.fullBucketId);
    this.addToMapEle(this.emptyBucketToFullMap, config.emptyBucketId, config.flowingLiquidBlockId, config.fullBucketId);

    // TODO: Improve liquid type register and management
    if (config.liquidBlockId === MinecraftBlockTypes.Lava) {
      this.fullBucketToFluidType.set(config.fullBucketId, FluidType.Lava);
    } else if (config.liquidBlockId === MinecraftBlockTypes.Water) {
      this.fullBucketToFluidType.set(config.fullBucketId, FluidType.Water);
    } else if (config.liquidBlockId === MinecraftBlockTypes.PowderSnow) {
      this.fullBucketToFluidType.set(config.fullBucketId, FluidType.PowderSnow);
    }
  }

  getEmptyBucketId(fullBucketId: string) {
    return this.fullBucketToEmptyMap.get(fullBucketId);
  }

  getFluidType(fullBucketTypeId: string) {
    return this.fullBucketToFluidType.get(fullBucketTypeId);
  }

  private addToMapEle(map: Map<string, Map<string, string>>, key: string, subKey: string, ele: string) {
    const list = map.get(key) ?? new Map<string, string>();
    list.set(subKey, ele);
    map.set(key, list);
  }
}