import {IpcV1} from "@tendrock/ipc";
import {LeavesConfigurator} from "./LeavesConfigurator";
import {OreConfigurator} from "./OreConfigurator";

export class BlockConfigurators {
  leaves: LeavesConfigurator;
  ore: OreConfigurator;

  protected constructor(ipc: IpcV1) {
    this.leaves = LeavesConfigurator.create(ipc);
    this.ore = OreConfigurator.create(ipc);
  }

  public static create(ipc: IpcV1) {
    return new BlockConfigurators(ipc);
  }
}