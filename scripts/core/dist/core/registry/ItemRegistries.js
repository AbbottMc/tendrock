import { BucketRegistry } from "./BucketRegistry";
export class ItemRegistries {
    constructor(ipc) {
        this.bucket = BucketRegistry.create(ipc);
    }
    static create(ipc) {
        return new ItemRegistries(ipc);
    }
}
//# sourceMappingURL=ItemRegistries.js.map