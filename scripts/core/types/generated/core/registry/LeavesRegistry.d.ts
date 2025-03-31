import { AbstractRegistry } from "./AbstractRegistry";
import { IpcV1 } from "@tendrock/ipc";
import { PropertyObject } from "@tendrock/ipc/types/generated/api";
export interface LeavesRegisterConfig extends PropertyObject {
    typeId: string;
    lootTable: string;
}
export declare class LeavesRegistry extends AbstractRegistry<LeavesRegisterConfig> {
    static create(ipc: IpcV1): LeavesRegistry;
    register(config: LeavesRegisterConfig): void;
}
