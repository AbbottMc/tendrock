import {world} from "@minecraft/server";
import {CustomComponents} from "../custom_components/CustomComponents";

world.beforeEvents.worldInitialize.subscribe(({blockComponentRegistry, itemComponentRegistry}) => {
  blockComponentRegistry.registerCustomComponent("tendrock:leaves_block", CustomComponents.LeavesBlockComponent);
});