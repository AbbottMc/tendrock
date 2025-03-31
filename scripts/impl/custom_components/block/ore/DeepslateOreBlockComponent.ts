import {AbstractOreBlockComponent} from "./AbstractOreBlockComponent";
import {BlockPermutation} from "@minecraft/server";

export class DeepslateOreBlockComponent extends AbstractOreBlockComponent {
  public static Id = 'tendrock:deepslate_ore';
  public static Instance = new DeepslateOreBlockComponent();

  getDefaultLootTable(permutation: BlockPermutation): string {
    const [namespace, path] = permutation.type.id.split(':');
    return `${namespace}/ore/deepslate/${path.replace('deepslate_', '').replace('_ore', '')}`;
  }
}