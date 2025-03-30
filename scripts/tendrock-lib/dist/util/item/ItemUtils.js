import { ItemDurabilityComponent, ItemEnchantableComponent } from '@minecraft/server';
export class ItemUtils {
    static _checkComponent(item, componentId) {
        if (!item.hasComponent(componentId)) {
            throw Error(`Item: "${item.typeId}" doesn't has an "${componentId}" component!`);
        }
    }
    static getDurability(itemStack) {
        return itemStack.getComponent(ItemDurabilityComponent.componentId);
    }
    static getEnchants(itemStack) {
        return itemStack.getComponent(ItemEnchantableComponent.componentId);
    }
    /**
     * 返回是否应该损耗耐久
     * @param item
     * @param durabilityComponent
     */
    static useUnbreaking(item, durabilityComponent) {
        let unbreakingLevel;
        const enchantment = this.getEnchants(item);
        if (!enchantment) {
            return false;
        }
        durabilityComponent !== null && durabilityComponent !== void 0 ? durabilityComponent : (durabilityComponent = this.getDurability(item));
        if (enchantment.hasEnchantment("unbreaking")) {
            unbreakingLevel = enchantment.getEnchantment("unbreaking").level;
        }
        if (!unbreakingLevel)
            return true;
        const damageChance = durabilityComponent.getDamageChance(unbreakingLevel);
        // TODO: damage change range
        return Math.random() * 100 <= damageChance;
    }
    static setDamage(item, amount) {
        this._checkComponent(item, ItemDurabilityComponent.componentId);
        this.getDurability(item).damage = amount;
    }
}
//# sourceMappingURL=ItemUtils.js.map