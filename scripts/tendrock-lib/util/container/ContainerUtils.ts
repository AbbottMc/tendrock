import {Container, ContainerSlot, ItemStack} from '@minecraft/server'
import {SlotUtils} from './SlotUtils'

export class ContainerUtils {

  static getSlot(container: Container, slot: number | ContainerSlot) {
    if (!container?.isValid) return undefined;
    return typeof slot === 'number' ? container.getSlot(slot) : slot;
  }

  static getSlotItem(container: Container, slot: number | ContainerSlot) {
    return this.getSlot(container, slot)?.getItem();
  }

  static setSlotItem(container: Container, slot: number | ContainerSlot, itemStack?: ItemStack) {
    const containerSlot = this.getSlot(container, slot);
    if (!containerSlot) return false;
    containerSlot.setItem(itemStack);
    return true;
  }

  static consume(container: Container, slotId: number, amount = 1) {
    return this.consumeSlot(container, slotId, amount);
  }

  static tryConsume(container: Container, slotId: number, amount = 1) {
    return this.tryConsumeSlot(container, slotId, amount);
  }

  static consumeSlot(container: Container, slot: number | ContainerSlot, amount = 1) {
    const slotInstance = this.getSlot(container, slot);
    if (!slotInstance) return false;
    return SlotUtils.consume(slotInstance, amount);
  }

  static tryConsumeSlot(container: Container, slot: number | ContainerSlot, amount = 1) {
    const slotInstance = this.getSlot(container, slot);
    if (!slotInstance) return false;
    return SlotUtils.tryConsume(slotInstance, amount);
  }
}