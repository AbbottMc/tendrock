import {PropertyObject} from "@tendrock/ipc/types/generated/api";
import {IpcV1} from "@tendrock/ipc";
import {AbstractBucketConfigurator} from "../../../common/custom_components/AbstractBucketConfigurator";

export interface BucketConfig extends PropertyObject {
  liquidBlockId?: string;
  flowingLiquidBlockId?: string;
  emptyBucketId?: string;
  fullBucketId?: string;
  emptySoundId?: string;
  fillSoundId?: string;
}


export class BucketConfigurator extends AbstractBucketConfigurator {

  public static create(ipc: IpcV1) {
    return new BucketConfigurator().init(ipc);
  }

  config(config: BucketConfig) {
    super.config(config);
    this._ipc.send('tendrock:register_bucket', config, 'tendrock');
  }
}