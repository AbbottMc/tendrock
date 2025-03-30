export class BucketRegistry {
    constructor(ipc) {
        if (ipc.scriptEnv.identifier === 'tendrock') {
            throw new Error('BucketRegistry can only be used in non-tendrock script env');
        }
        this._ipc = ipc;
    }
    static create(ipc) {
        return new BucketRegistry(ipc);
    }
    register(config) {
        this._ipc.send('tendrock:register_bucket', config, 'tendrock');
    }
}
//# sourceMappingURL=BucketRegistry.js.map