import {PropertyObject} from "@tendrock/ipc/types/generated/api";
import {Tendrock} from "../Tendrock";

export interface BucketRegisterConfig extends PropertyObject {
  liquidBlockId?: string;
  flowingLiquidBlockId?: string;
  emptyBucketId?: string;
  fullBucketId?: string;
  emptySoundId?: string;
  fillSoundId?: string;
}


export class BucketRegistry {
  register(config: BucketRegisterConfig) {
    Tendrock.Ipc.send('tendrock:register_bucket', config, 'tendrock');
  }
}