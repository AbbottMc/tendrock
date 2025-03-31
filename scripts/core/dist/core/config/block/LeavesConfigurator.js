import { AbstractConfigurator } from "../AbstractConfigurator";
export class LeavesConfigurator extends AbstractConfigurator {
    static create(ipc) {
        return new LeavesConfigurator().init(ipc);
    }
    config(config) {
        super.config(config);
        this._ipc.send('tendrock:register_leaves', config, 'tendrock');
    }
}
//# sourceMappingURL=LeavesConfigurator.js.map