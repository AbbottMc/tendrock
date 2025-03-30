import { PropertyObject } from "@tendrock/ipc/types/generated/api";
import { IpcV1 } from "@tendrock/ipc";
export interface BucketRegisterConfig extends PropertyObject {
    liquidBlockId?: string;
    flowingLiquidBlockId?: string;
    emptyBucketId?: string;
    fullBucketId?: string;
    emptySoundId?: string;
    fillSoundId?: string;
}
export declare class BucketRegistry {
    private _ipc;
    protected constructor(ipc: IpcV1);
    static create(ipc: IpcV1): BucketRegistry;
    register(config: BucketRegisterConfig): void;
}
