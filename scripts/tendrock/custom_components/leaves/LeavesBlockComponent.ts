import {BlockComponentRandomTickEvent, BlockComponentTickEvent, BlockCustomComponent, world} from "@minecraft/server";
import {BindThis} from "../../lib/decorator/BindThis";

export class LeavesBlockComponent implements BlockCustomComponent {
  @BindThis
  onRandomTick(event: BlockComponentRandomTickEvent) {
  }

  @BindThis
  onTick(event: BlockComponentTickEvent) {
    world.sendMessage(`${event.block.typeId} ticked`);
  }
}