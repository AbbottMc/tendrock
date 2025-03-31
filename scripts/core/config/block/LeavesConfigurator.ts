import {AbstractConfigurator} from "../AbstractConfigurator";
import {IpcV1} from "@tendrock/ipc";
import {PropertyObject} from "@tendrock/ipc/types/generated/api";

export interface LeavesConfigure extends PropertyObject {
  typeId: string;
  lootTable: string;
}

export class LeavesConfigurator extends AbstractConfigurator<LeavesConfigure> {
  public static create(ipc: IpcV1) {
    return new LeavesConfigurator().init(ipc);
  }

  public config(config: LeavesConfigure) {
    super.config(config);
    this._ipc.send('tendrock:register_leaves', config, 'tendrock');
  }
}