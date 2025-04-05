import {IpcV1} from "@tendrock/ipc";

export class BlockConfigurators {

  protected constructor(ipc: IpcV1) {
  }

  public static create(ipc: IpcV1) {
    return new BlockConfigurators(ipc);
  }
}