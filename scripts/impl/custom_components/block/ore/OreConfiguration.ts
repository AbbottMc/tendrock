import {OreConfigure} from "../../../../core/config/block/OreConfigurator";
import {NumberRange} from "@minecraft/common";

export class OreConfiguration {

  private static lootTableMap = new Map<string, string>();
  private static spawnXpMap = new Map<string, number | NumberRange>();

  constructor() {
  }

  static config(config: OreConfigure) {
    if (config.lootTable) {
      this.lootTableMap.set(config.typeId, config.lootTable);
    }
    if (config.spawnXp !== undefined) {
      this.spawnXpMap.set(config.typeId, config.spawnXp);
    }
  }

  static getLootTable(typeId: string) {
    return this.lootTableMap.get(typeId);
  }

  static getSpawnXp(typeId: string) {
    return this.spawnXpMap.get(typeId);
  }
}