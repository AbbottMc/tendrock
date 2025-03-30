import { SlotUtils } from './SlotUtils';
export class ContainerUtils {
    static getSlot(container, slot) {
        if (!(container === null || container === void 0 ? void 0 : container.isValid))
            return undefined;
        return typeof slot === 'number' ? container.getSlot(slot) : slot;
    }
    static getSlotItem(container, slot) {
        var _a;
        return (_a = this.getSlot(container, slot)) === null || _a === void 0 ? void 0 : _a.getItem();
    }
    static setSlotItem(container, slot, itemStack) {
        const containerSlot = this.getSlot(container, slot);
        if (!containerSlot)
            return false;
        containerSlot.setItem(itemStack);
        return true;
    }
    static consume(container, slotId, amount = 1) {
        return this.consumeSlot(container, slotId, amount);
    }
    static tryConsume(container, slotId, amount = 1) {
        return this.tryConsumeSlot(container, slotId, amount);
    }
    static consumeSlot(container, slot, amount = 1) {
        const slotInstance = this.getSlot(container, slot);
        if (!slotInstance)
            return false;
        return SlotUtils.consume(slotInstance, amount);
    }
    static tryConsumeSlot(container, slot, amount = 1) {
        const slotInstance = this.getSlot(container, slot);
        if (!slotInstance)
            return false;
        return SlotUtils.tryConsume(slotInstance, amount);
    }
}
//# sourceMappingURL=ContainerUtils.js.map