import {ItemDurabilityComponent, ItemEnchantableComponent, ItemStack} from '@minecraft/server'

export class ItemUtils {
  private static _checkComponent(item: ItemStack, componentId: string) {
    if (!item.hasComponent(componentId)) {
      throw Error(`Item: "${item.typeId}" doesn't has an "${componentId}" component!`);
    }
  }

  public static getDurability(itemStack: ItemStack) {
    return itemStack.getComponent(ItemDurabilityComponent.componentId);
  }

  public static getEnchants(itemStack: ItemStack) {
    return itemStack.getComponent(ItemEnchantableComponent.componentId);
  }

  /**
   * 返回是否应该损耗耐久
   * @param item
   * @param durabilityComponent
   */
  public static useUnbreaking(item: ItemStack, durabilityComponent?: ItemDurabilityComponent): boolean {
    let unbreakingLevel;
    const enchantment = this.getEnchants(item);
    if (!enchantment) {
      return false;
    }
    durabilityComponent ??= this.getDurability(item);
    if (enchantment.hasEnchantment("unbreaking")) {
      unbreakingLevel = enchantment.getEnchantment("unbreaking").level;
    }
    if (!unbreakingLevel) return true;
    const damageChance = durabilityComponent.getDamageChance(unbreakingLevel);
    // TODO: damage change range
    return Math.random() * 100 <= damageChance;
  }

  public static setDamage(item: ItemStack, amount: number) {
    this._checkComponent(item, ItemDurabilityComponent.componentId);
    this.getDurability(item).damage = amount;
  }
}