import {OreConfiguration} from "../../custom_components/block/ore/OreConfiguration";

OreConfiguration.config({
  typeId: 'tendrock:test_ore',
  spawnXp: 1
});
OreConfiguration.config({
  typeId: 'tendrock:deepslate_test_ore',
  spawnXp: {
    min: 0,
    max: 4
  }
});