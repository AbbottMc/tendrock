import {IpcV1} from "@tendrock/ipc";
import {PropertyObject} from "@tendrock/ipc/types/generated/api";

export abstract class AbstractConfigurator<Config extends PropertyObject> {
  protected _ipc: IpcV1;

  protected constructor() {
  }

  protected init(ipc: IpcV1): this {
    if (ipc.scriptEnv.identifier === 'tendrock') {
      throw new Error('BucketRegistry can only be used in non-tendrock script env');
    }
    this._ipc = ipc;
    return this;
  }

  config(config: Config) {
  }
}