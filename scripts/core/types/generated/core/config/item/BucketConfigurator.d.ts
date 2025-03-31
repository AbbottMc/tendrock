import { PropertyObject } from "@tendrock/ipc/types/generated/api";
import { IpcV1 } from "@tendrock/ipc";
import { AbstractBucketConfigurator } from "../../../common/custom_components/AbstractBucketConfigurator";
export interface BucketConfig extends PropertyObject {
    liquidBlockId?: string;
    flowingLiquidBlockId?: string;
    emptyBucketId?: string;
    fullBucketId?: string;
    emptySoundId?: string;
    fillSoundId?: string;
}
export declare class BucketConfigurator extends AbstractBucketConfigurator {
    static create(ipc: IpcV1): BucketConfigurator;
    config(config: BucketConfig): void;
}
