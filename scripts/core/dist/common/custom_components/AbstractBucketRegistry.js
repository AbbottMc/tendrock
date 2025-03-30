import { SetMap } from "@tendrock/lib";
import { FluidType } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftItemTypes } from "@minecraft/vanilla-data";
export class AbstractBucketRegistry {
    constructor() {
        this.fullBucketToEmptyMap = new Map();
        this.fullBucketToFluidMap = new Map();
        this.emptyBucketToFullMap = new Map();
        this.emptyBucketToFluidMap = new SetMap();
        this.fullBucketEmptySoundIdMap = new Map();
        this.emptyBucketFillSoundIdMap = new Map();
        this.fullBucketToFluidType = new Map([
            [MinecraftItemTypes.LavaBucket, FluidType.Lava],
            [MinecraftItemTypes.WaterBucket, FluidType.Water],
            [MinecraftItemTypes.PowderSnowBucket, FluidType.PowderSnow]
        ]);
    }
    isEmptyBucket(itemStack) {
        return this.emptyBucketToFullMap.has(itemStack.typeId);
    }
    isFullBucket(itemStack) {
        return this.fullBucketToFluidMap.has(itemStack.typeId);
    }
    isBucket(itemStack) {
        // return itemStack.getTags().includes(Ic2ItemTagNames.buckets);
        return this.fullBucketToFluidMap.has(itemStack.typeId) || this.emptyBucketToFullMap.has(itemStack.typeId);
    }
    register(config) {
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
        }
        else if (config.liquidBlockId === MinecraftBlockTypes.Water) {
            this.fullBucketToFluidType.set(config.fullBucketId, FluidType.Water);
        }
        else if (config.liquidBlockId === MinecraftBlockTypes.PowderSnow) {
            this.fullBucketToFluidType.set(config.fullBucketId, FluidType.PowderSnow);
        }
    }
    getEmptyBucketId(fullBucketId) {
        return this.fullBucketToEmptyMap.get(fullBucketId);
    }
    addToMapEle(map, key, subKey, ele) {
        var _a;
        const list = (_a = map.get(key)) !== null && _a !== void 0 ? _a : new Map();
        list.set(subKey, ele);
        map.set(key, list);
    }
}
//# sourceMappingURL=AbstractBucketRegistry.js.map