import {BlockComponentPlayerDestroyEvent, BlockCustomComponent, BlockPermutation} from "@minecraft/server";
import {bindThis} from "../../../lib/decorator/BindThis";
import {PlayerUtils, ToolUtils} from "@tendrock/lib";
import {EntityUtils} from "../../../lib/util/EntityUtils";
import {CustomComponentParams} from "../../../../common/types/tendrock";

export interface OreComponentParams {
  deepslate?: boolean;
  loot?: string;
  xp?: number | { min: number; max: number };
}

export class OreBlockComponent implements BlockCustomComponent {
  public static Id = 'tendrock:ore';
  public static Instance = new OreBlockComponent();

  getLootTable(permutation: BlockPermutation, params: OreComponentParams): string {
    const {loot, deepslate} = params;
    if (loot) return loot;
    const [namespace, path] = permutation.type.id.split(':');
    const oreType = deepslate ? 'deepslate' : 'normal';
    const oreNormalName = deepslate ? path.replace('deepslate_', '') : path;
    return `${namespace}/ore/${oreType}/${oreNormalName.replace('_ore', '')}`;
  }

  @bindThis
  onPlayerDestroy(event: BlockComponentPlayerDestroyEvent, {params}: CustomComponentParams<OreComponentParams>) {
    const {player, destroyedBlockPermutation} = event;
    const location = event.block.location;
    const itemStack = PlayerUtils.getMainHandItem(player);
    if (!itemStack) return;

    if (!ToolUtils.matchPickaxe(destroyedBlockPermutation, itemStack)) {
      return;
    }
    const lootTable = this.getLootTable(destroyedBlockPermutation, params);
    // loot spawn ~ ~ ~ loot "ore/normal/lead" mainhand
    event.player.runCommand(`loot spawn ${location.x} ${location.y} ${location.z} loot "${lootTable}" mainhand`);

    const {xp: spawnXp} = params;
    if (!spawnXp) return;
    EntityUtils.spawnXpOrbs(spawnXp, player.dimension, location);
  }
}