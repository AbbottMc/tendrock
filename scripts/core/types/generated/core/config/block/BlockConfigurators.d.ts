import { IpcV1 } from "@tendrock/ipc";
export declare class BlockConfigurators {
    protected constructor(ipc: IpcV1);
    static create(ipc: IpcV1): BlockConfigurators;
}
