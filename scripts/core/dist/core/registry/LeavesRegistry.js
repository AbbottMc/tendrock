import { AbstractRegistry } from "./AbstractRegistry";
export class LeavesRegistry extends AbstractRegistry {
    static create(ipc) {
        return new LeavesRegistry().config(ipc);
    }
    register(config) {
        super.register(config);
        this._ipc.send('tendrock:register_leaves', config, 'tendrock');
    }
}
//# sourceMappingURL=LeavesRegistry.js.map