import { LeavesConfigurator } from "./LeavesConfigurator";
import { OreConfigurator } from "./OreConfigurator";
export class BlockConfigurators {
    constructor(ipc) {
        this.leaves = LeavesConfigurator.create(ipc);
        this.ore = OreConfigurator.create(ipc);
    }
    static create(ipc) {
        return new BlockConfigurators(ipc);
    }
}
//# sourceMappingURL=BlockConfigurators.js.map