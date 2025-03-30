import {PropertyObject} from "@tendrock/ipc/types/generated/api";

export interface BucketRegisterEvent extends PropertyObject {
  typeId: string,
  config: {
    liquidBlockId?: string;
    flowingLiquidBlockId?: string;
    emptyBucketId?: string;
    fullBucketId?: string;
    emptySoundId?: string;
    fillSoundId?: string;
  }
}

export class BucketRegistry {
  register() {
  }
}