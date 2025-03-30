import {system} from "@minecraft/server";
import {CustomBlockComponents} from "../custom_components/block/CustomBlockComponents";
import {CustomItemComponents} from "../custom_components/item/CustomItemComponents";

system.beforeEvents.startup.subscribe(({blockComponentRegistry, itemComponentRegistry}) => {
  blockComponentRegistry.registerCustomComponent("tendrock:leaves_block", CustomBlockComponents.Leaves);

  itemComponentRegistry.registerCustomComponent("tendrock:bucket", CustomItemComponents.Bucket);
});