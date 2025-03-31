import { PropertyObject } from "@tendrock/ipc/types/generated/api";
import { IpcV1 } from "@tendrock/ipc";
import { AbstractBucketRegistry } from "../../common/custom_components/AbstractBucketRegistry";
export interface BucketRegisterConfig extends PropertyObject {
    liquidBlockId?: string;
    flowingLiquidBlockId?: string;
    emptyBucketId?: string;
    fullBucketId?: string;
    emptySoundId?: string;
    fillSoundId?: string;
}
export declare class BucketRegistry extends AbstractBucketRegistry {
    static create(ipc: IpcV1): BucketRegistry;
    register(config: BucketRegisterConfig): void;
}
