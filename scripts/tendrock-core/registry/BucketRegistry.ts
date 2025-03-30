import {PropertyObject} from "@tendrock/ipc/types/generated/api";
import {IpcV1} from "@tendrock/ipc";
import {FluidType} from "@minecraft/server";
import {MinecraftBlockTypes, MinecraftItemTypes} from "@minecraft/vanilla-data";

export interface BucketRegisterConfig extends PropertyObject {
  liquidBlockId?: string;
  flowingLiquidBlockId?: string;
  emptyBucketId?: string;
  fullBucketId?: string;
  emptySoundId?: string;
  fillSoundId?: string;
}


export class BucketRegistry {
  private _ipc: IpcV1;
  protected fullBucketToFluidType = new Map<string, FluidType>([
    [MinecraftItemTypes.LavaBucket, FluidType.Lava],
    [MinecraftItemTypes.WaterBucket, FluidType.Water],
    [MinecraftItemTypes.PowderSnowBucket, FluidType.PowderSnow]
  ]);

  protected constructor(ipc: IpcV1) {
    if (ipc.scriptEnv.identifier === 'tendrock') {
      throw new Error('BucketRegistry can only be used in non-tendrock script env');
    }
    this._ipc = ipc;
  }

  public static create(ipc: IpcV1) {
    return new BucketRegistry(ipc);
  }

  register(config: BucketRegisterConfig) {
    // TODO: Improve liquid type register and management
    if (config.liquidBlockId === MinecraftBlockTypes.Lava) {
      this.fullBucketToFluidType.set(config.fullBucketId, FluidType.Lava);
    } else if (config.liquidBlockId === MinecraftBlockTypes.Water) {
      this.fullBucketToFluidType.set(config.fullBucketId, FluidType.Water);
    } else if (config.liquidBlockId === MinecraftBlockTypes.PowderSnow) {
      this.fullBucketToFluidType.set(config.fullBucketId, FluidType.PowderSnow);
    }
    this._ipc.send('tendrock:register_bucket', config, 'tendrock');
  }

  getFluidType(fullBucketTypeId: string) {
    return this.fullBucketToFluidType.get(fullBucketTypeId);
  }
}