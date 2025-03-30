import {PropertyObject} from "@tendrock/ipc/types/generated/api";
import {IpcV1} from "@tendrock/ipc";
import {AbstractBucketRegistry} from "../../common/custom_components/AbstractBucketRegistry";

export interface BucketRegisterConfig extends PropertyObject {
  liquidBlockId?: string;
  flowingLiquidBlockId?: string;
  emptyBucketId?: string;
  fullBucketId?: string;
  emptySoundId?: string;
  fillSoundId?: string;
}


export class BucketRegistry extends AbstractBucketRegistry {
  private _ipc: IpcV1;

  protected constructor(ipc: IpcV1) {
    super();
    if (ipc.scriptEnv.identifier === 'tendrock') {
      throw new Error('BucketRegistry can only be used in non-tendrock script env');
    }
    this._ipc = ipc;
  }

  public static create(ipc: IpcV1) {
    return new BucketRegistry(ipc);
  }

  register(config: BucketRegisterConfig) {
    super.register(config);
    this._ipc.send('tendrock:register_bucket', config, 'tendrock');
  }

  getFluidType(fullBucketTypeId: string) {
    return this.fullBucketToFluidType.get(fullBucketTypeId);
  }
}