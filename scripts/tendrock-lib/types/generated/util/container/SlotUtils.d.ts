import { ContainerSlot, ItemStack, ItemType } from '@minecraft/server';
import { DamageSlotItemStackOptions, ItemDamageResult, SetSlotItemDamageOptions } from '../../api';
export interface TransferItemStackResult {
    transferAmount: number;
    consumedItemStack: ItemStack | undefined;
}
export declare class SlotUtils {
    private static addImpl;
    static tryAdd(slot: ContainerSlot, itemStack: ItemStack): boolean;
    static add(slot: ContainerSlot, itemStack: ItemStack): boolean;
    private static addItemImpl;
    static tryAddItem(slot: ContainerSlot, itemType: string | ItemType, amount?: number): boolean;
    static addItem(slot: ContainerSlot, itemType: string | ItemType, amount?: number): boolean;
    private static transferImpl;
    static tryTransfer(slot: ContainerSlot, itemStack: ItemStack): TransferItemStackResult;
    static transfer(slot: ContainerSlot, itemStack: ItemStack): TransferItemStackResult;
    private static gainImpl;
    static tryGain(slot: ContainerSlot, amount?: number): boolean;
    static gain(slot: ContainerSlot, amount?: number): boolean;
    private static _checkComponent;
    private static damageItemImpl;
    static tryDamageItem(slot: ContainerSlot, amount: number, options: DamageSlotItemStackOptions): ItemDamageResult;
    static damageItem(slot: ContainerSlot, amount: number, options: DamageSlotItemStackOptions): ItemDamageResult;
    private static consumeImpl;
    static tryConsume(slot: ContainerSlot, amount: number): boolean;
    static consume(slot: ContainerSlot, amount: number): boolean;
    private static setDamageImpl;
    static setDamage(slot: ContainerSlot, damage: number, options?: SetSlotItemDamageOptions): ItemDamageResult;
    static trySetDamage(slot: ContainerSlot, damage: number, options?: SetSlotItemDamageOptions): ItemDamageResult;
    static isItemStackable(slot1: ContainerSlot, slot2: ContainerSlot): boolean;
}
