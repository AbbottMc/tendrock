import {AbstractConfigurator} from "../AbstractConfigurator";
import {PropertyObject} from "@tendrock/ipc/types/generated/api";
import {IpcV1} from "@tendrock/ipc";
import {Tendrock} from "../../../common/Tendrock";

export interface OreConfigure extends PropertyObject {
  typeId: string;
  lootTable?: string;
  spawnXp?: number | { min: number; max: number };
}

export class OreConfigurator extends AbstractConfigurator<OreConfigure> {
  public static EventId = Tendrock.getIdentifier('config_ore');

  public static create(ipc: IpcV1) {
    return new OreConfigurator().init(ipc);
  }

  public config(config: OreConfigure) {
    super.config(config);
    this._ipc.send(OreConfigurator.EventId, config, Tendrock.Namespace);
  }
}