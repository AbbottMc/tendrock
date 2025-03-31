import {AbstractOreBlockComponent} from "./AbstractOreBlockComponent";
import {BlockPermutation} from "@minecraft/server";

export class OreBlockComponent extends AbstractOreBlockComponent {
  public static Id = 'tendrock:ore';
  public static Instance = new OreBlockComponent();

  getDefaultLootTable(permutation: BlockPermutation): string {
    const [namespace, path] = permutation.type.id.split(':');
    return `${namespace}/ore/normal/${path.replace('_ore', '')}`;
  }
}