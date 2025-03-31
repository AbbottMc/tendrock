import { BucketConfigurator } from "./BucketConfigurator";
import { IpcV1 } from "@tendrock/ipc";
export declare class ItemConfigurators {
    bucket: BucketConfigurator;
    protected constructor(ipc: IpcV1);
    static create(ipc: IpcV1): ItemConfigurators;
}
