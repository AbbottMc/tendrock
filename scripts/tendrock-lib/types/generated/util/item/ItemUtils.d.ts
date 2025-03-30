import { ItemDurabilityComponent, ItemEnchantableComponent, ItemStack } from '@minecraft/server';
export declare class ItemUtils {
    private static _checkComponent;
    static getDurability(itemStack: ItemStack): ItemDurabilityComponent;
    static getEnchants(itemStack: ItemStack): ItemEnchantableComponent;
    /**
     * 返回是否应该损耗耐久
     * @param item
     * @param durabilityComponent
     */
    static useUnbreaking(item: ItemStack, durabilityComponent?: ItemDurabilityComponent): boolean;
    static setDamage(item: ItemStack, amount: number): void;
}
