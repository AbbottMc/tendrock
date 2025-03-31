import { LeavesRegistry } from "./LeavesRegistry";
export class BlockRegistries {
    constructor(ipc) {
        this.leaves = LeavesRegistry.create(ipc);
    }
    static create(ipc) {
        return new BlockRegistries(ipc);
    }
}
//# sourceMappingURL=BlockRegistries.js.map