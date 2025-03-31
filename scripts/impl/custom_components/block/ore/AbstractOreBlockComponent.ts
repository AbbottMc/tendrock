import {BlockComponentPlayerDestroyEvent, BlockCustomComponent, BlockPermutation} from "@minecraft/server";
import {bindThis} from "../../../lib/decorator/BindThis";
import {PlayerUtils, ToolUtils} from "@tendrock/lib";
import {Tendrock} from "../../../../common/Tendrock";
import {OreConfigurator, OreConfigure} from "../../../../core/config/block/OreConfigurator";
import {EntityUtils} from "../../../lib/util/EntityUtils";
import {OreConfiguration} from "./OreConfiguration";

export abstract class AbstractOreBlockComponent implements BlockCustomComponent {

  abstract getDefaultLootTable(permutation: BlockPermutation): string;

  constructor() {
    Tendrock.Ipc.on(OreConfigurator.EventId, (event) => {
      const config = event.value as OreConfigure;
      OreConfiguration.config(config);
    });
  }

  getLootTable(permutation: BlockPermutation): string {
    const lootTable = OreConfiguration.getLootTable(permutation.type.id);
    if (lootTable) return lootTable;
    return this.getDefaultLootTable(permutation);
  }

  @bindThis
  onPlayerDestroy(event: BlockComponentPlayerDestroyEvent) {
    const {player, destroyedBlockPermutation} = event;
    const location = event.block.location;
    const itemStack = PlayerUtils.getMainHandItem(player);
    if (!itemStack) return;

    if (!ToolUtils.matchPickaxe(destroyedBlockPermutation, itemStack)) {
      return;
    }
    const lootTable = this.getLootTable(destroyedBlockPermutation);
    // loot spawn ~ ~ ~ loot "ore/normal/lead" mainhand
    event.player.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${lootTable}" mainhand`);

    const spawnXp = OreConfiguration.getSpawnXp(destroyedBlockPermutation.type.id);
    if (!spawnXp) return;
    EntityUtils.spawnXpOrbs(spawnXp, player.dimension, location);
  }
}