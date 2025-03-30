import {CustomItemComponents} from "../../custom_components/item/CustomItemComponents";
import {MinecraftBlockTypes} from "@minecraft/vanilla-data";

CustomItemComponents.Bucket.register({
  emptyBucketId: 'tendrock:empty_bucket',
  fullBucketId: 'tendrock:water_bucket',
  emptySoundId: 'bucket.empty_water',
  fillSoundId: 'bucket.fill_water',
  flowingLiquidBlockId: MinecraftBlockTypes.FlowingWater,
  liquidBlockId: MinecraftBlockTypes.Water
});

CustomItemComponents.Bucket.register({
  emptyBucketId: 'tendrock:empty_bucket',
  fullBucketId: 'tendrock:lava_bucket',
  emptySoundId: 'bucket.empty_lava',
  fillSoundId: 'bucket.fill_lava',
  flowingLiquidBlockId: MinecraftBlockTypes.FlowingLava,
  liquidBlockId: MinecraftBlockTypes.Lava
});