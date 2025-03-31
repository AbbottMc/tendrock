import { LeavesRegistry } from "./LeavesRegistry";
import { IpcV1 } from "@tendrock/ipc";
export declare class BlockRegistries {
    leaves: LeavesRegistry;
    protected constructor(ipc: IpcV1);
    static create(ipc: IpcV1): BlockRegistries;
}
