import {system} from "@minecraft/server";
import {CustomComponents} from "../custom_components/CustomComponents";

system.beforeEvents.startup.subscribe(({blockComponentRegistry, itemComponentRegistry}) => {
  blockComponentRegistry.registerCustomComponent("tendrock:leaves_block", CustomComponents.LeavesBlockComponent);
});