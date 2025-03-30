import {ItemUtils} from '../item/ItemUtils'
import {ContainerSlot, ItemDurabilityComponent, ItemStack, ItemType} from '@minecraft/server'
import {DamageSlotItemStackOptions, ItemDamageResult, SetSlotItemDamageOptions} from '../../api'

export interface TransferItemStackResult {
  transferAmount: number;
  consumedItemStack: ItemStack | undefined;
}

export class SlotUtils {
  private static addImpl(slot: ContainerSlot, itemStack: ItemStack, isSimulate: boolean) {
    if (!itemStack) return false;
    const stack = slot.getItem();
    if (!stack && isSimulate) return true;
    if (!stack) {
      slot.setItem(itemStack);
      return true;
    }
    if (!stack.isStackableWith(itemStack)) return false;
    return this.gainImpl(slot, itemStack.amount, isSimulate);
  }

  public static tryAdd(slot: ContainerSlot, itemStack: ItemStack) {
    return this.addImpl(slot, itemStack, true);
  }

  public static add(slot: ContainerSlot, itemStack: ItemStack) {
    return this.addImpl(slot, itemStack, false);
  }

  private static addItemImpl(slot: ContainerSlot, itemType: string | ItemType, amount: number, isSimulate: boolean) {
    if (!itemType) return false;
    const itemStack = new ItemStack(itemType, amount);
    return this.addImpl(slot, itemStack, isSimulate);
  }

  public static tryAddItem(slot: ContainerSlot, itemType: string | ItemType, amount = 1) {
    return this.addItemImpl(slot, itemType, amount, true);
  }

  public static addItem(slot: ContainerSlot, itemType: string | ItemType, amount = 1) {
    return this.addItemImpl(slot, itemType, amount, false);
  }

  private static transferImpl(slot: ContainerSlot, itemStack: ItemStack, isSimulate = false): TransferItemStackResult {
    const slotItemStack = slot.getItem();
    if (!slotItemStack && isSimulate) return {transferAmount: itemStack.amount, consumedItemStack: itemStack};
    if (!slotItemStack) {
      slot.setItem(itemStack);
      return {transferAmount: itemStack.amount, consumedItemStack: undefined};
    }
    if (!slotItemStack.isStackableWith(itemStack)) return {transferAmount: 0, consumedItemStack: itemStack};
    let finalAmount = itemStack.amount + slotItemStack.amount;
    let transferAmount = 0;
    if (finalAmount <= slotItemStack.maxAmount) {
      transferAmount = itemStack.amount;
    } else {
      transferAmount = slotItemStack.maxAmount - slotItemStack.amount;
      finalAmount = slotItemStack.maxAmount;
    }
    const consumedAmount = itemStack.amount - transferAmount;
    if (consumedAmount !== 0) {
      itemStack.amount = consumedAmount;
    } else {
      itemStack = undefined;
    }
    slotItemStack.amount = finalAmount;
    if (!isSimulate) slot.setItem(slotItemStack);
    return {transferAmount, consumedItemStack: itemStack};
  }

  public static tryTransfer(slot: ContainerSlot, itemStack: ItemStack) {
    return this.transferImpl(slot, itemStack, true);
  }

  public static transfer(slot: ContainerSlot, itemStack: ItemStack) {
    return this.transferImpl(slot, itemStack, false);
  }

  private static gainImpl(slot: ContainerSlot, amount: number, isSimulate: boolean) {
    const stack = slot.getItem();
    if (!stack) return false;
    const retAmount = stack.amount + amount;
    if (retAmount > stack.maxAmount) return false;
    if (!isSimulate) {
      stack.amount = retAmount;
      slot.setItem(stack);
    }
    return true;
  }

  public static tryGain(slot: ContainerSlot, amount = 1) {
    return this.gainImpl(slot, amount, true);
  }

  public static gain(slot: ContainerSlot, amount = 1) {
    return this.gainImpl(slot, amount, false);
  }

  private static _checkComponent(item: ItemStack, componentId: string) {
    if (!item.hasComponent(componentId)) {
      throw Error(`Item: "${item.typeId}" doesn't has an "${componentId}" component!`);
    }
  }

  private static damageItemImpl(slot: ContainerSlot, amount: number, options: DamageSlotItemStackOptions, isSimulate: boolean): ItemDamageResult {
    let itemStack = options.damagedItemStack ?? slot.getItem();
    if (!itemStack) return {isSucceed: false, itemBroken: false};
    this._checkComponent(itemStack, ItemDurabilityComponent.componentId);
    const durabilityComponent = itemStack.getComponent(ItemDurabilityComponent.componentId);
    let damage = durabilityComponent.damage;
    let canDamage = true;
    if (options.useUnbreaking) {
      canDamage = ItemUtils.useUnbreaking(itemStack, durabilityComponent);
    }
    if (!canDamage) return {isSucceed: false, itemBroken: false};
    damage += amount;
    const itemBroken = damage >= durabilityComponent.maxDurability;
    if (!isSimulate) {
      if (itemBroken) {
        itemStack = undefined;
      } else {
        durabilityComponent.damage = damage;
      }
      if ((options?.playSoundWhenBroken ?? true) && !itemStack) options.dimension.playSound('random.break', options.location);
      slot.setItem(itemStack);
    }
    return {itemBroken, isSucceed: true};
  }

  public static tryDamageItem(slot: ContainerSlot, amount: number, options: DamageSlotItemStackOptions) {
    return this.damageItemImpl(slot, amount, options, true);
  }

  public static damageItem(slot: ContainerSlot, amount: number, options: DamageSlotItemStackOptions) {
    return this.damageItemImpl(slot, amount, options, false);
  }

  private static consumeImpl(slot: ContainerSlot, amount: number, isSimulate: boolean) {
    let itemStack = slot.getItem();
    if (!itemStack) return false;
    const remainAmount = itemStack.amount - amount;
    if (remainAmount < 0) return false;
    if (isSimulate) return true;
    if (remainAmount == 0) {
      itemStack = undefined;
    } else {
      itemStack.amount = remainAmount;
    }
    slot.setItem(itemStack);
    return true;
  }

  public static tryConsume(slot: ContainerSlot, amount: number) {
    return this.consumeImpl(slot, amount, true);
  }

  public static consume(slot: ContainerSlot, amount: number) {
    return this.consumeImpl(slot, amount, false);
  }

  private static setDamageImpl(slot: ContainerSlot, damage: number, isSimulate: boolean, options?: SetSlotItemDamageOptions): ItemDamageResult {
    let itemStack = options?.itemStack ?? slot.getItem();
    if (!itemStack) return {isSucceed: false, itemBroken: false};
    const playBrokenSound = options?.playSoundWhenBroken ?? true;
    const durability = ItemUtils.getDurability(itemStack).maxDurability;

    if (damage > durability) return {isSucceed: false, itemBroken: false};
    if (!isSimulate) ItemUtils.setDamage(itemStack, damage);
    const isItemBroken = damage === durability;
    if (options?.brokenWhenFullDamage && isItemBroken) {
      itemStack = undefined;
    }
    if (playBrokenSound && !itemStack && !isSimulate && options?.location) options.dimension.playSound('random.break', options.location);
    if (!isSimulate) slot.setItem(itemStack);
    return {isSucceed: true, itemBroken: isItemBroken};
  }

  public static setDamage(slot: ContainerSlot, damage: number, options?: SetSlotItemDamageOptions) {
    return this.setDamageImpl(slot, damage, false, options);
  }

  public static trySetDamage(slot: ContainerSlot, damage: number, options?: SetSlotItemDamageOptions) {
    return this.setDamageImpl(slot, damage, true, options);
  }

  static isItemStackable(slot1: ContainerSlot, slot2: ContainerSlot) {
    const itemStack2 = slot2.getItem();
    return slot1.isStackableWith(itemStack2);
  }
}