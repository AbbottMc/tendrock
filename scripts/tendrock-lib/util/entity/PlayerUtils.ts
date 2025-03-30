import {Entity, EquipmentSlot, GameMode, Player} from '@minecraft/server'
import {EntityUtils} from './EntityUtils'
import {DamageItemStackImplOptions, DamageSlotItemStackOptions, ItemDamageResult} from '../../api'
import {Inventory} from '../../wrapper/Inventory'

export class PlayerUtils {
  protected static inventoryMap: Map<string, Inventory> = new Map<string, Inventory>();

  static isPlayer(entity: Entity): entity is Player {
    return entity.typeId === 'minecraft:player';
  }

  static isGameMode(player: Player, mode: GameMode) {
    return player.getGameMode() === mode;
  }

  static anyGameModes(player: Player, ...modes: GameMode[]) {
    for (const mode of modes) {
      if (this.isGameMode(player, mode)) return true;
    }
    return false;
  }

  static notGameMode(player: Player, mode: GameMode) {
    return !this.isGameMode(player, mode);
  }

  static notGameModes(player: Player, ...modes: GameMode[]) {
    for (const mode of modes) {
      if (this.isGameMode(player, mode)) return false;
    }
    return true;
  }

  static getInventory(player: Player) {
    const container = EntityUtils.getContainer(player);
    if (this.inventoryMap.has(player.id)) {
      return this.inventoryMap.get(player.id);
    }
    return this.inventoryMap.set(player.id, new Inventory(container)).get(player.id);
  }

  static getSelectedSlot(player: Player) {
    const container = EntityUtils.getContainer(player);
    return container?.getSlot(player.selectedSlotIndex);
  }

  static consumeMainHandItem(player: Player, amount = 1): boolean {
    return EntityUtils.consumeItem(player, player.selectedSlotIndex, amount);
  }

  static consumeOffHandItem(player: Player, amount = 1): boolean {
    return EntityUtils.consumeEquipmentItem(player, EquipmentSlot.Offhand, amount);
  }

  static damageMainHandItem(player: Player, amount = 1, options?: DamageSlotItemStackOptions): ItemDamageResult {
    return EntityUtils.damageItem(player, player.selectedSlotIndex, amount, options);
  }

  static setMainHandItemDamage(player: Player, damage: number, options?: DamageItemStackImplOptions): ItemDamageResult {
    return EntityUtils.setItemDamage(player, player.selectedSlotIndex, damage, options);
  }

  static getMainHandItem(player: Player) {
    return EntityUtils.getContainer(player).getItem(player.selectedSlotIndex);
  }

  static getOffHandItem(player: Player) {
    return EntityUtils.getEquipment(player, EquipmentSlot.Offhand);
  }
}