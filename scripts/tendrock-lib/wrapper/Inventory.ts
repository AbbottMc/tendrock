import {Container, ContainerSlot, ItemStack, ItemType} from '@minecraft/server'
import {ContainerUtils} from "../util/container/ContainerUtils";
import {SlotUtils} from "../util/container/SlotUtils";
import {Utils} from "../util/Utils";

export class Inventory {
  protected container: Container;

  constructor(container: Container) {
    this.container = container;
  }

  getItemSlot(itemType: ItemType | string): ContainerSlot | undefined {
    const typeId = Utils.getTypeId(itemType);
    if (!this.container) return undefined;
    for (let i = 0; i < this.container.size; i++) {
      if (this.container.getItem(i)?.typeId === typeId) return this.container.getSlot(i);
    }
    return undefined;
  }

  consume(slot: number | ContainerSlot, amount = 1) {
    return ContainerUtils.consumeSlot(this.container, slot, amount);
  }

  tryConsume(slot: number | ContainerSlot, amount = 1) {
    return ContainerUtils.tryConsumeSlot(this.container, slot, amount);
  }

  addItem(itemType: string | ItemType, amount = 1): boolean {
    return this.add(new ItemStack(itemType, amount));
  }

  add(itemStack: ItemStack) {
    if (!this.container) return false;
    for (let i = 0; i < this.container.size; i++) {
      const slotStack = this.container.getItem(i);
      if (!slotStack) {
        this.container.getSlot(i).setItem(itemStack);
        return true;
      }
      if (slotStack.typeId !== itemStack.typeId) continue;
      const slot = this.container.getSlot(i);
      const transferRet = SlotUtils.transfer(slot, itemStack);
      if (!transferRet.consumedItemStack) {
        return true;
      }
    }
    return false;
  }
}