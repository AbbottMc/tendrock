import { AbstractConfigurator } from "../AbstractConfigurator";
import { Tendrock } from "../../../common/Tendrock";
export class OreConfigurator extends AbstractConfigurator {
    static create(ipc) {
        return new OreConfigurator().init(ipc);
    }
    config(config) {
        super.config(config);
        this._ipc.send(OreConfigurator.EventId, config, Tendrock.Namespace);
    }
}
OreConfigurator.EventId = Tendrock.getIdentifier('config_ore');
//# sourceMappingURL=OreConfigurator.js.map