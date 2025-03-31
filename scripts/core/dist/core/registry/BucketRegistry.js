import { AbstractBucketRegistry } from "../../common/custom_components/AbstractBucketRegistry";
export class BucketRegistry extends AbstractBucketRegistry {
    static create(ipc) {
        return new BucketRegistry().config(ipc);
    }
    register(config) {
        super.register(config);
        this._ipc.send('tendrock:register_bucket', config, 'tendrock');
    }
}
//# sourceMappingURL=BucketRegistry.js.map