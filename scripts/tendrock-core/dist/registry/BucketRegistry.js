import { FluidType } from "@minecraft/server";
import { MinecraftBlockTypes, MinecraftItemTypes } from "@minecraft/vanilla-data";
export class BucketRegistry {
    constructor(ipc) {
        this.fullBucketToFluidType = new Map([
            [MinecraftItemTypes.LavaBucket, FluidType.Lava],
            [MinecraftItemTypes.WaterBucket, FluidType.Water],
            [MinecraftItemTypes.PowderSnowBucket, FluidType.PowderSnow]
        ]);
        if (ipc.scriptEnv.identifier === 'tendrock') {
            throw new Error('BucketRegistry can only be used in non-tendrock script env');
        }
        this._ipc = ipc;
    }
    static create(ipc) {
        return new BucketRegistry(ipc);
    }
    register(config) {
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
        this._ipc.send('tendrock:register_bucket', config, 'tendrock');
    }
    getFluidType(fullBucketTypeId) {
        return this.fullBucketToFluidType.get(fullBucketTypeId);
    }
}
//# sourceMappingURL=BucketRegistry.js.map