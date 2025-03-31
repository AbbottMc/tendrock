import { BucketConfigurator } from "./BucketConfigurator";
export class ItemConfigurators {
    constructor(ipc) {
        this.bucket = BucketConfigurator.create(ipc);
    }
    static create(ipc) {
        return new ItemConfigurators(ipc);
    }
}
//# sourceMappingURL=ItemConfigurators.js.map