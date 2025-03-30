import { ItemStack } from '@minecraft/server';
import { ContainerUtils } from "../util/container/ContainerUtils";
import { SlotUtils } from "../util/container/SlotUtils";
import { Utils } from "../util/Utils";
export class Inventory {
    constructor(container) {
        this.container = container;
    }
    getItemSlot(itemType) {
        var _a;
        const typeId = Utils.getTypeId(itemType);
        if (!this.container)
            return undefined;
        for (let i = 0; i < this.container.size; i++) {
            if (((_a = this.container.getItem(i)) === null || _a === void 0 ? void 0 : _a.typeId) === typeId)
                return this.container.getSlot(i);
        }
        return undefined;
    }
    consume(slot, amount = 1) {
        return ContainerUtils.consumeSlot(this.container, slot, amount);
    }
    tryConsume(slot, amount = 1) {
        return ContainerUtils.tryConsumeSlot(this.container, slot, amount);
    }
    addItem(itemType, amount = 1) {
        return this.add(new ItemStack(itemType, amount));
    }
    add(itemStack) {
        if (!this.container)
            return false;
        for (let i = 0; i < this.container.size; i++) {
            const slotStack = this.container.getItem(i);
            if (!slotStack) {
                this.container.getSlot(i).setItem(itemStack);
                return true;
            }
            if (slotStack.typeId !== itemStack.typeId)
                continue;
            const slot = this.container.getSlot(i);
            const transferRet = SlotUtils.transfer(slot, itemStack);
            if (!transferRet.consumedItemStack) {
                return true;
            }
        }
        return false;
    }
}
//# sourceMappingURL=Inventory.js.map