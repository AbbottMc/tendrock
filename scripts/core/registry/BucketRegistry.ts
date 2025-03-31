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

  public static create(ipc: IpcV1) {
    return new BucketRegistry().config(ipc);
  }

  register(config: BucketRegisterConfig) {
    super.register(config);
    this._ipc.send('tendrock:register_bucket', config, 'tendrock');
  }
}