import {BucketConfigurator} from "./BucketConfigurator";
import {IpcV1} from "@tendrock/ipc";

export class ItemConfigurators {
  bucket: BucketConfigurator;

  protected constructor(ipc: IpcV1) {
    this.bucket = BucketConfigurator.create(ipc);
  }

  public static create(ipc: IpcV1) {
    return new ItemConfigurators(ipc);
  }
}