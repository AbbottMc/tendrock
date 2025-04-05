import { AbstractBucketConfigurator } from "../../../common/custom_components/AbstractBucketConfigurator";
export class BucketConfigurator extends AbstractBucketConfigurator {
    static create(ipc) {
        return new BucketConfigurator().init(ipc);
    }
    config(config) {
        super.config(config);
        this._ipc.send('tendrock:register_bucket', config, 'tendrock');
    }
}
