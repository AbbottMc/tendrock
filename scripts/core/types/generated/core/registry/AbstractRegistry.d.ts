import { IpcV1 } from "@tendrock/ipc";
import { PropertyObject } from "@tendrock/ipc/types/generated/api";
export declare abstract class AbstractRegistry<Config extends PropertyObject> {
    protected _ipc: IpcV1;
    protected constructor();
    protected config(ipc: IpcV1): this;
    register(config: Config): void;
}
