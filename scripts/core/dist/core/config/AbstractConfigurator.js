export class AbstractConfigurator {
    constructor() {
    }
    init(ipc) {
        if (ipc.scriptEnv.identifier === 'tendrock') {
            throw new Error('BucketRegistry can only be used in non-tendrock script env');
        }
        this._ipc = ipc;
        return this;
    }
    config(config) {
    }
}
