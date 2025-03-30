import { PropertyObject } from "@tendrock/ipc/types/generated/api";
import { IpcV1 } from "@tendrock/ipc";
import { FluidType } from "@minecraft/server";
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
    protected fullBucketToFluidType: Map<string, FluidType>;
    protected constructor(ipc: IpcV1);
    static create(ipc: IpcV1): BucketRegistry;
    register(config: BucketRegisterConfig): void;
    getFluidType(fullBucketTypeId: string): FluidType;
}
