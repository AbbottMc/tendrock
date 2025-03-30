import { Tendrock } from "../Tendrock";
export class BucketRegistry {
    register(config) {
        Tendrock.Ipc.send('tendrock:register_bucket', config, 'tendrock');
    }
}
//# sourceMappingURL=BucketRegistry.js.map