import {system} from "@minecraft/server";

// import '../test/bucket/TendrockBuckets'
// import '../test/ore/TendrockOres'
// import '../test/XpTest'
import {DeepslateOreBlockComponent} from "../custom_components/block/ore/DeepslateOreBlockComponent";
import {OreBlockComponent} from "../custom_components/block/ore/OreBlockComponent";
import {LeavesBlockComponent} from "../custom_components/block/leaves/LeavesBlockComponent";
import {BucketComponent} from "../custom_components/item/bucket/BucketComponent";

system.beforeEvents.startup.subscribe(({blockComponentRegistry, itemComponentRegistry}) => {
  blockComponentRegistry.registerCustomComponent(LeavesBlockComponent.Id, LeavesBlockComponent.Instance);
  blockComponentRegistry.registerCustomComponent(OreBlockComponent.Id, OreBlockComponent.Instance);
  blockComponentRegistry.registerCustomComponent(DeepslateOreBlockComponent.Id, DeepslateOreBlockComponent.Instance);

  itemComponentRegistry.registerCustomComponent(BucketComponent.Id, BucketComponent.Instance);
});