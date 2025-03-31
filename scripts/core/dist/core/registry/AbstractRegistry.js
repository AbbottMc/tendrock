export class AbstractRegistry {
    constructor() {
    }
    config(ipc) {
        if (ipc.scriptEnv.identifier === 'tendrock') {
            throw new Error('BucketRegistry can only be used in non-tendrock script env');
        }
        this._ipc = ipc;
        return this;
    }
    register(config) {
    }
}
//# sourceMappingURL=AbstractRegistry.js.map