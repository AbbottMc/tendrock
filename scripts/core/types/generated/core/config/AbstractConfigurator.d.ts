import { IpcV1 } from "@tendrock/ipc";
import { PropertyObject } from "@tendrock/ipc/types/generated/api";
export declare abstract class AbstractConfigurator<Config extends PropertyObject> {
    protected _ipc: IpcV1;
    protected constructor();
    protected init(ipc: IpcV1): this;
    config(config: Config): void;
}
