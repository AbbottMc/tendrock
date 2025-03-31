import {LeavesRegistry} from "./LeavesRegistry";
import {IpcV1} from "@tendrock/ipc";

export class BlockRegistries {
  leaves: LeavesRegistry;

  protected constructor(ipc: IpcV1) {
    this.leaves = LeavesRegistry.create(ipc);
  }

  public static create(ipc: IpcV1) {
    return new BlockRegistries(ipc);
  }
}