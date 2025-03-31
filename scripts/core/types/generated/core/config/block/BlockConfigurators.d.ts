import { IpcV1 } from "@tendrock/ipc";
import { LeavesConfigurator } from "./LeavesConfigurator";
import { OreConfigurator } from "./OreConfigurator";
export declare class BlockConfigurators {
    leaves: LeavesConfigurator;
    ore: OreConfigurator;
    protected constructor(ipc: IpcV1);
    static create(ipc: IpcV1): BlockConfigurators;
}
