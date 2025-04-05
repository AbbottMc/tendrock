import {system} from "@minecraft/server";

import '../test/bucket/TendrockBuckets'
// import '../test/XpTest'
import {LeavesBlockComponent} from "../custom_components/block/leaves/LeavesBlockComponent";
import {BucketItemComponent} from "../custom_components/item/bucket/BucketItemComponent";
import {OreBlockComponent} from "../custom_components/block/ore/OreBlockComponent";

system.beforeEvents.startup.subscribe(({blockComponentRegistry, itemComponentRegistry}) => {
  blockComponentRegistry.registerCustomComponent(LeavesBlockComponent.Id, LeavesBlockComponent.Instance);
  blockComponentRegistry.registerCustomComponent(OreBlockComponent.Id, OreBlockComponent.Instance);
  // blockComponentRegistry.registerCustomComponent(DeepslateOreBlockComponent.Id, DeepslateOreBlockComponent.Instance);

  itemComponentRegistry.registerCustomComponent(BucketItemComponent.Id, BucketItemComponent.Instance);
});