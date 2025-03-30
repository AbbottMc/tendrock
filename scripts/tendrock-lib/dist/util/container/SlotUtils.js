import { ItemUtils } from '../item/ItemUtils';
import { ItemDurabilityComponent, ItemStack } from '@minecraft/server';
export class SlotUtils {
    static addImpl(slot, itemStack, isSimulate) {
        if (!itemStack)
            return false;
        const stack = slot.getItem();
        if (!stack && isSimulate)
            return true;
        if (!stack) {
            slot.setItem(itemStack);
            return true;
        }
        if (!stack.isStackableWith(itemStack))
            return false;
        return this.gainImpl(slot, itemStack.amount, isSimulate);
    }
    static tryAdd(slot, itemStack) {
        return this.addImpl(slot, itemStack, true);
    }
    static add(slot, itemStack) {
        return this.addImpl(slot, itemStack, false);
    }
    static addItemImpl(slot, itemType, amount, isSimulate) {
        if (!itemType)
            return false;
        const itemStack = new ItemStack(itemType, amount);
        return this.addImpl(slot, itemStack, isSimulate);
    }
    static tryAddItem(slot, itemType, amount = 1) {
        return this.addItemImpl(slot, itemType, amount, true);
    }
    static addItem(slot, itemType, amount = 1) {
        return this.addItemImpl(slot, itemType, amount, false);
    }
    static transferImpl(slot, itemStack, isSimulate = false) {
        const slotItemStack = slot.getItem();
        if (!slotItemStack && isSimulate)
            return { transferAmount: itemStack.amount, consumedItemStack: itemStack };
        if (!slotItemStack) {
            slot.setItem(itemStack);
            return { transferAmount: itemStack.amount, consumedItemStack: undefined };
        }
        if (!slotItemStack.isStackableWith(itemStack))
            return { transferAmount: 0, consumedItemStack: itemStack };
        let finalAmount = itemStack.amount + slotItemStack.amount;
        let transferAmount = 0;
        if (finalAmount <= slotItemStack.maxAmount) {
            transferAmount = itemStack.amount;
        }
        else {
            transferAmount = slotItemStack.maxAmount - slotItemStack.amount;
            finalAmount = slotItemStack.maxAmount;
        }
        const consumedAmount = itemStack.amount - transferAmount;
        if (consumedAmount !== 0) {
            itemStack.amount = consumedAmount;
        }
        else {
            itemStack = undefined;
        }
        slotItemStack.amount = finalAmount;
        if (!isSimulate)
            slot.setItem(slotItemStack);
        return { transferAmount, consumedItemStack: itemStack };
    }
    static tryTransfer(slot, itemStack) {
        return this.transferImpl(slot, itemStack, true);
    }
    static transfer(slot, itemStack) {
        return this.transferImpl(slot, itemStack, false);
    }
    static gainImpl(slot, amount, isSimulate) {
        const stack = slot.getItem();
        if (!stack)
            return false;
        const retAmount = stack.amount + amount;
        if (retAmount > stack.maxAmount)
            return false;
        if (!isSimulate) {
            stack.amount = retAmount;
            slot.setItem(stack);
        }
        return true;
    }
    static tryGain(slot, amount = 1) {
        return this.gainImpl(slot, amount, true);
    }
    static gain(slot, amount = 1) {
        return this.gainImpl(slot, amount, false);
    }
    static _checkComponent(item, componentId) {
        if (!item.hasComponent(componentId)) {
            throw Error(`Item: "${item.typeId}" doesn't has an "${componentId}" component!`);
        }
    }
    static damageItemImpl(slot, amount, options, isSimulate) {
        var _a, _b;
        let itemStack = (_a = options.damagedItemStack) !== null && _a !== void 0 ? _a : slot.getItem();
        if (!itemStack)
            return { isSucceed: false, itemBroken: false };
        this._checkComponent(itemStack, ItemDurabilityComponent.componentId);
        const durabilityComponent = itemStack.getComponent(ItemDurabilityComponent.componentId);
        let damage = durabilityComponent.damage;
        let canDamage = true;
        if (options.useUnbreaking) {
            canDamage = ItemUtils.useUnbreaking(itemStack, durabilityComponent);
        }
        if (!canDamage)
            return { isSucceed: false, itemBroken: false };
        damage += amount;
        const itemBroken = damage >= durabilityComponent.maxDurability;
        if (!isSimulate) {
            if (itemBroken) {
                itemStack = undefined;
            }
            else {
                durabilityComponent.damage = damage;
            }
            if (((_b = options === null || options === void 0 ? void 0 : options.playSoundWhenBroken) !== null && _b !== void 0 ? _b : true) && !itemStack)
                options.dimension.playSound('random.break', options.location);
            slot.setItem(itemStack);
        }
        return { itemBroken, isSucceed: true };
    }
    static tryDamageItem(slot, amount, options) {
        return this.damageItemImpl(slot, amount, options, true);
    }
    static damageItem(slot, amount, options) {
        return this.damageItemImpl(slot, amount, options, false);
    }
    static consumeImpl(slot, amount, isSimulate) {
        let itemStack = slot.getItem();
        if (!itemStack)
            return false;
        const remainAmount = itemStack.amount - amount;
        if (remainAmount < 0)
            return false;
        if (isSimulate)
            return true;
        if (remainAmount == 0) {
            itemStack = undefined;
        }
        else {
            itemStack.amount = remainAmount;
        }
        slot.setItem(itemStack);
        return true;
    }
    static tryConsume(slot, amount) {
        return this.consumeImpl(slot, amount, true);
    }
    static consume(slot, amount) {
        return this.consumeImpl(slot, amount, false);
    }
    static setDamageImpl(slot, damage, isSimulate, options) {
        var _a, _b;
        let itemStack = (_a = options === null || options === void 0 ? void 0 : options.itemStack) !== null && _a !== void 0 ? _a : slot.getItem();
        if (!itemStack)
            return { isSucceed: false, itemBroken: false };
        const playBrokenSound = (_b = options === null || options === void 0 ? void 0 : options.playSoundWhenBroken) !== null && _b !== void 0 ? _b : true;
        const durability = ItemUtils.getDurability(itemStack).maxDurability;
        if (damage > durability)
            return { isSucceed: false, itemBroken: false };
        if (!isSimulate)
            ItemUtils.setDamage(itemStack, damage);
        const isItemBroken = damage === durability;
        if ((options === null || options === void 0 ? void 0 : options.brokenWhenFullDamage) && isItemBroken) {
            itemStack = undefined;
        }
        if (playBrokenSound && !itemStack && !isSimulate && (options === null || options === void 0 ? void 0 : options.location))
            options.dimension.playSound('random.break', options.location);
        if (!isSimulate)
            slot.setItem(itemStack);
        return { isSucceed: true, itemBroken: isItemBroken };
    }
    static setDamage(slot, damage, options) {
        return this.setDamageImpl(slot, damage, false, options);
    }
    static trySetDamage(slot, damage, options) {
        return this.setDamageImpl(slot, damage, true, options);
    }
    static isItemStackable(slot1, slot2) {
        const itemStack2 = slot2.getItem();
        return slot1.isStackableWith(itemStack2);
    }
}
//# sourceMappingURL=SlotUtils.js.map