import {PropertyObject} from "@tendrock/ipc/types/generated/api";
import {IpcV1} from "@tendrock/ipc";

export interface BucketRegisterConfig extends PropertyObject {
  liquidBlockId?: string;
  flowingLiquidBlockId?: string;
  emptyBucketId?: string;
  fullBucketId?: string;
  emptySoundId?: string;
  fillSoundId?: string;
}


export class BucketRegistry {
  private _ipc: IpcV1;

  protected constructor(ipc: IpcV1) {
    if (ipc.scriptEnv.identifier === 'tendrock') {
      throw new Error('BucketRegistry can only be used in non-tendrock script env');
    }
    this._ipc = ipc;
  }

  public static create(ipc: IpcV1) {
    return new BucketRegistry(ipc);
  }

  register(config: BucketRegisterConfig) {
    this._ipc.send('tendrock:register_bucket', config, 'tendrock');
  }
}