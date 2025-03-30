import { AbstractBucketRegistry } from "../../common/custom_components/AbstractBucketRegistry";
export class BucketRegistry extends AbstractBucketRegistry {
    constructor(ipc) {
        super();
        if (ipc.scriptEnv.identifier === 'tendrock') {
            throw new Error('BucketRegistry can only be used in non-tendrock script env');
        }
        this._ipc = ipc;
    }
    static create(ipc) {
        return new BucketRegistry(ipc);
    }
    register(config) {
        super.register(config);
        this._ipc.send('tendrock:register_bucket', config, 'tendrock');
    }
    getFluidType(fullBucketTypeId) {
        return this.fullBucketToFluidType.get(fullBucketTypeId);
    }
}
//# sourceMappingURL=BucketRegistry.js.map