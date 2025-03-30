import { PropertyObject } from "@tendrock/ipc/types/generated/api";
export interface BucketRegisterConfig extends PropertyObject {
    liquidBlockId?: string;
    flowingLiquidBlockId?: string;
    emptyBucketId?: string;
    fullBucketId?: string;
    emptySoundId?: string;
    fillSoundId?: string;
}
export declare class BucketRegistry {
    register(config: BucketRegisterConfig): void;
}
