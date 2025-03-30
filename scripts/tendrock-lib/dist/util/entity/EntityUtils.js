import { EntityEquippableComponent, EntityInventoryComponent } from '@minecraft/server';
import { SlotUtils } from "../container/SlotUtils";
export class EntityUtils {
    static summonEntity(dimension, location, entityType, options) {
        var _a, _b, _c, _d;
        return dimension.runCommand(`summon ${entityType.id} ${location.x} ${location.y} ${location.z} ${(_a = options === null || options === void 0 ? void 0 : options.rotation.y) !== null && _a !== void 0 ? _a : ''} ${(_b = options === null || options === void 0 ? void 0 : options.rotation.x) !== null && _b !== void 0 ? _b : ''} ${(_c = options === null || options === void 0 ? void 0 : options.spawnEvent) !== null && _c !== void 0 ? _c : ''} ${(_d = options === null || options === void 0 ? void 0 : options.nameTag) !== null && _d !== void 0 ? _d : ''}`).successCount > 0;
    }
    static hasEntities(dimension, location) {
        return dimension.getEntities({ location, maxDistance: 0.5 }).length > 1;
    }
    static hasEntity(dimension, location) {
        return dimension.getEntities({ location, maxDistance: 0.5 }).length > 0;
    }
    static hasSingleEntity(dimension, location) {
        return dimension.getEntities({ location, maxDistance: 0.5 }).length == 1;
    }
    static getEntitiesAt(dimension, location) {
        return dimension.getEntities({ location, maxDistance: 0.5 });
    }
    static getContainer(entity) {
        var _a;
        if (!entity.isValid)
            return undefined;
        return (_a = entity.getComponent(EntityInventoryComponent.componentId)) === null || _a === void 0 ? void 0 : _a.container;
    }
    static getEquippable(entity) {
        if (!entity.isValid)
            return undefined;
        return entity.getComponent(EntityEquippableComponent.componentId);
    }
    static getEquipment(entity, equipmentSlot) {
        var _a;
        return (_a = this.getEquippable(entity)) === null || _a === void 0 ? void 0 : _a.getEquipment(equipmentSlot);
    }
    static _consumeItemStackImpl(itemStack, amount) {
        const newAmount = itemStack.amount - amount;
        if (newAmount < 0) {
            return { isSucceed: false, consumedItemStack: itemStack };
        }
        else if (newAmount === 0) {
            itemStack = undefined;
        }
        else {
            itemStack.amount = newAmount;
        }
        return { consumedItemStack: itemStack, isSucceed: true };
    }
    static consumeEquipmentItem(entity, equipmentSlot, amount = 1) {
        const equippable = this.getEquippable(entity);
        if (!equippable)
            return false;
        const originItem = equippable.getEquipment(equipmentSlot);
        const { isSucceed, consumedItemStack } = this._consumeItemStackImpl(originItem, amount);
        if (!isSucceed)
            return false;
        equippable.setEquipment(equipmentSlot, consumedItemStack);
        return true;
    }
    static consumeItem(entity, slot, amount = 1) {
        const container = entity.getComponent(EntityInventoryComponent.componentId).container;
        if (!container)
            return false;
        const originItem = container.getItem(slot);
        const { isSucceed, consumedItemStack } = this._consumeItemStackImpl(originItem, amount);
        if (!isSucceed)
            return false;
        container.setItem(slot, consumedItemStack);
        return true;
    }
    static damageItem(entity, slot, amount = 1, options) {
        const container = entity.getComponent(EntityInventoryComponent.componentId).container;
        if (!container)
            return { isSucceed: false, itemBroken: false };
        return SlotUtils.damageItem(container.getSlot(slot), amount, options);
    }
    static setItemDamage(entity, slot, damage, options) {
        const container = entity.getComponent(EntityInventoryComponent.componentId).container;
        if (!container)
            return { isSucceed: false, itemBroken: false };
        return SlotUtils.setDamage(container.getSlot(slot), damage, options);
    }
    static trySetItemDamage(entity, slot, damage, options) {
        const container = entity.getComponent(EntityInventoryComponent.componentId).container;
        if (!container)
            return { isSucceed: false, itemBroken: false };
        return SlotUtils.trySetDamage(container.getSlot(slot), damage, options);
    }
}
//# sourceMappingURL=EntityUtils.js.map