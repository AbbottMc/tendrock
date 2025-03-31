import {MinecraftBlockTypes} from "@minecraft/vanilla-data";
import {BucketComponent} from "../../custom_components/item/bucket/BucketComponent";

BucketComponent.Instance.config({
  emptyBucketId: 'tendrock:empty_bucket',
  fullBucketId: 'tendrock:water_bucket',
  emptySoundId: 'bucket.empty_water',
  fillSoundId: 'bucket.fill_water',
  flowingLiquidBlockId: MinecraftBlockTypes.FlowingWater,
  liquidBlockId: MinecraftBlockTypes.Water
});

BucketComponent.Instance.config({
  emptyBucketId: 'tendrock:empty_bucket',
  fullBucketId: 'tendrock:lava_bucket',
  emptySoundId: 'bucket.empty_lava',
  fillSoundId: 'bucket.fill_lava',
  flowingLiquidBlockId: MinecraftBlockTypes.FlowingLava,
  liquidBlockId: MinecraftBlockTypes.Lava
});