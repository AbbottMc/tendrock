import {Player, world} from "@minecraft/server";

world.afterEvents.itemUse.subscribe(({source, itemStack}) => {
  const player = source as Player;
  const xp = player.getTotalXp();
  world.sendMessage(xp.toString());
});