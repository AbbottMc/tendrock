import { Dimension, Entity, EntityEquippableComponent, EntityType, EquipmentSlot, ItemStack, Vector2, Vector3 } from '@minecraft/server';
import { DamageSlotItemStackOptions, ItemDamageResult, SetSlotItemDamageOptions } from '../../api';
export interface EntitySpawnOptions {
    rotation?: Vector2;
    spawnEvent?: string;
    nameTag?: string;
}
export declare class EntityUtils {
    static summonEntity(dimension: Dimension, location: Vector3, entityType: EntityType, options: EntitySpawnOptions): boolean;
    static hasEntities(dimension: Dimension, location: Vector3): boolean;
    static hasEntity(dimension: Dimension, location: Vector3): boolean;
    static hasSingleEntity(dimension: Dimension, location: Vector3): boolean;
    static getEntitiesAt(dimension: Dimension, location: Vector3): Entity[];
    static getContainer(entity: Entity): import("@minecraft/server").Container;
    static getEquippable(entity: Entity): EntityEquippableComponent;
    static getEquipment(entity: Entity, equipmentSlot: EquipmentSlot): ItemStack;
    private static _consumeItemStackImpl;
    static consumeEquipmentItem(entity: Entity, equipmentSlot: EquipmentSlot, amount?: number): boolean;
    static consumeItem(entity: Entity, slot: number, amount?: number): boolean;
    static damageItem(entity: Entity, slot: number, amount?: number, options?: DamageSlotItemStackOptions): ItemDamageResult;
    static setItemDamage(entity: Entity, slot: number, damage: number, options?: SetSlotItemDamageOptions): ItemDamageResult;
    static trySetItemDamage(entity: Entity, slot: number, damage: number, options?: SetSlotItemDamageOptions): ItemDamageResult;
}
