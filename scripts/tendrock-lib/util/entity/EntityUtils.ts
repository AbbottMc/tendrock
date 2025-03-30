import {
  Dimension, Entity, EntityEquippableComponent, EntityInventoryComponent, EntityType, EquipmentSlot, ItemStack, Vector2,
  Vector3
} from '@minecraft/server'
import {DamageSlotItemStackOptions, ItemDamageResult, SetSlotItemDamageOptions} from '../../api'
import {SlotUtils} from "../container/SlotUtils";

export interface EntitySpawnOptions {
  rotation?: Vector2;
  spawnEvent?: string;
  nameTag?: string;
}

export class EntityUtils {
  static summonEntity(dimension: Dimension, location: Vector3, entityType: EntityType, options: EntitySpawnOptions) {
    return dimension.runCommand(`summon ${entityType.id} ${location.x} ${location.y} ${location.z} ${options?.rotation.y ?? ''} ${options?.rotation.x ?? ''} ${options?.spawnEvent ?? ''} ${options?.nameTag ?? ''}`).successCount > 0;
  }

  static hasEntities(dimension: Dimension, location: Vector3) {
    return dimension.getEntities({location, maxDistance: 0.5}).length > 1;
  }

  static hasEntity(dimension: Dimension, location: Vector3) {
    return dimension.getEntities({location, maxDistance: 0.5}).length > 0;
  }

  static hasSingleEntity(dimension: Dimension, location: Vector3) {
    return dimension.getEntities({location, maxDistance: 0.5}).length == 1;
  }

  static getEntitiesAt(dimension: Dimension, location: Vector3) {
    return dimension.getEntities({location, maxDistance: 0.5});
  }

  static getContainer(entity: Entity) {
    if (!entity.isValid) return undefined;
    return entity.getComponent(EntityInventoryComponent.componentId)?.container;
  }

  static getEquippable(entity: Entity) {
    if (!entity.isValid) return undefined;
    return entity.getComponent(EntityEquippableComponent.componentId);
  }

  static getEquipment(entity: Entity, equipmentSlot: EquipmentSlot) {
    return this.getEquippable(entity)?.getEquipment(equipmentSlot);
  }

  private static _consumeItemStackImpl(itemStack: ItemStack, amount: number) {
    const newAmount = itemStack.amount - amount;
    if (newAmount < 0) {
      return {isSucceed: false, consumedItemStack: itemStack};
    } else if (newAmount === 0) {
      itemStack = undefined;
    } else {
      itemStack.amount = newAmount;
    }
    return {consumedItemStack: itemStack, isSucceed: true};
  }

  static consumeEquipmentItem(entity: Entity, equipmentSlot: EquipmentSlot, amount = 1) {
    const equippable = this.getEquippable(entity);
    if (!equippable) return false;
    const originItem = equippable.getEquipment(equipmentSlot);
    const {isSucceed, consumedItemStack} = this._consumeItemStackImpl(originItem, amount);
    if (!isSucceed) return false;
    equippable.setEquipment(equipmentSlot, consumedItemStack);
    return true;
  }

  static consumeItem(entity: Entity, slot: number, amount = 1): boolean {
    const container = entity.getComponent(EntityInventoryComponent.componentId).container;
    if (!container) return false;
    const originItem = container.getItem(slot);
    const {isSucceed, consumedItemStack} = this._consumeItemStackImpl(originItem, amount);
    if (!isSucceed) return false;
    container.setItem(slot, consumedItemStack);
    return true;
  }

  static damageItem(entity: Entity, slot: number, amount = 1, options?: DamageSlotItemStackOptions): ItemDamageResult {
    const container = entity.getComponent(EntityInventoryComponent.componentId).container;
    if (!container) return {isSucceed: false, itemBroken: false};
    return SlotUtils.damageItem(container.getSlot(slot), amount, options);
  }

  static setItemDamage(entity: Entity, slot: number, damage: number, options?: SetSlotItemDamageOptions): ItemDamageResult {
    const container = entity.getComponent(EntityInventoryComponent.componentId).container;
    if (!container) return {isSucceed: false, itemBroken: false};
    return SlotUtils.setDamage(container.getSlot(slot), damage, options);
  }

  static trySetItemDamage(entity: Entity, slot: number, damage: number, options?: SetSlotItemDamageOptions): ItemDamageResult {
    const container = entity.getComponent(EntityInventoryComponent.componentId).container;
    if (!container) return {isSucceed: false, itemBroken: false};
    return SlotUtils.trySetDamage(container.getSlot(slot), damage, options);
  }
}