import { BucketRegistry } from "./BucketRegistry";
import { IpcV1 } from "@tendrock/ipc";
export declare class ItemRegistries {
    bucket: BucketRegistry;
    protected constructor(ipc: IpcV1);
    static create(ipc: IpcV1): ItemRegistries;
}
