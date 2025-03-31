import {AbstractRegistry} from "./AbstractRegistry";
import {IpcV1} from "@tendrock/ipc";
import {PropertyObject} from "@tendrock/ipc/types/generated/api";

export interface LeavesRegisterConfig extends PropertyObject {
  typeId: string;
  lootTable: string;
}

export class LeavesRegistry extends AbstractRegistry<LeavesRegisterConfig> {
  public static create(ipc: IpcV1) {
    return new LeavesRegistry().config(ipc);
  }

  public register(config: LeavesRegisterConfig) {
    super.register(config);
    this._ipc.send('tendrock:register_leaves', config, 'tendrock');
  }
}