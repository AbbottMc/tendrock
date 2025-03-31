import { AbstractConfigurator } from "../AbstractConfigurator";
import { PropertyObject } from "@tendrock/ipc/types/generated/api";
import { IpcV1 } from "@tendrock/ipc";
export interface OreConfigure extends PropertyObject {
    typeId: string;
    lootTable?: string;
    spawnXp?: number | {
        min: number;
        max: number;
    };
}
export declare class OreConfigurator extends AbstractConfigurator<OreConfigure> {
    static EventId: string;
    static create(ipc: IpcV1): OreConfigurator;
    config(config: OreConfigure): void;
}
