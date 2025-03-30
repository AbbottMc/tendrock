import { Entity, GameMode, Player } from '@minecraft/server';
import { DamageItemStackImplOptions, DamageSlotItemStackOptions, ItemDamageResult } from '../../api';
import { Inventory } from '../../wrapper/Inventory';
export declare class PlayerUtils {
    protected static inventoryMap: Map<string, Inventory>;
    static isPlayer(entity: Entity): entity is Player;
    static isGameMode(player: Player, mode: GameMode): boolean;
    static anyGameModes(player: Player, ...modes: GameMode[]): boolean;
    static notGameMode(player: Player, mode: GameMode): boolean;
    static notGameModes(player: Player, ...modes: GameMode[]): boolean;
    static getInventory(player: Player): Inventory;
    static getSelectedSlot(player: Player): import("@minecraft/server").ContainerSlot;
    static consumeMainHandItem(player: Player, amount?: number): boolean;
    static consumeOffHandItem(player: Player, amount?: number): boolean;
    static damageMainHandItem(player: Player, amount?: number, options?: DamageSlotItemStackOptions): ItemDamageResult;
    static setMainHandItemDamage(player: Player, damage: number, options?: DamageItemStackImplOptions): ItemDamageResult;
    static getMainHandItem(player: Player): import("@minecraft/server").ItemStack;
    static getOffHandItem(player: Player): import("@minecraft/server").ItemStack;
}
