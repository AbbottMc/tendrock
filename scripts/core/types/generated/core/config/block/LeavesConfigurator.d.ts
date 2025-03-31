import { AbstractConfigurator } from "../AbstractConfigurator";
import { IpcV1 } from "@tendrock/ipc";
import { PropertyObject } from "@tendrock/ipc/types/generated/api";
export interface LeavesConfigure extends PropertyObject {
    typeId: string;
    lootTable: string;
}
export declare class LeavesConfigurator extends AbstractConfigurator<LeavesConfigure> {
    static create(ipc: IpcV1): LeavesConfigurator;
    config(config: LeavesConfigure): void;
}
