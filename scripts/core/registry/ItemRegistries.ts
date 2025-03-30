import {BucketRegistry} from "./BucketRegistry";
import {IpcV1} from "@tendrock/ipc";

export class ItemRegistries {
  bucket: BucketRegistry

  protected constructor(ipc: IpcV1) {
    this.bucket = BucketRegistry.create(ipc);
  }

  public static create(ipc: IpcV1) {
    return new ItemRegistries(ipc);
  }
}