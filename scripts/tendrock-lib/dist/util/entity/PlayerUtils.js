import { EquipmentSlot } from '@minecraft/server';
import { EntityUtils } from './EntityUtils';
import { Inventory } from '../../wrapper/Inventory';
export class PlayerUtils {
    static isPlayer(entity) {
        return entity.typeId === 'minecraft:player';
    }
    static isGameMode(player, mode) {
        return player.getGameMode() === mode;
    }
    static anyGameModes(player, ...modes) {
        for (const mode of modes) {
            if (this.isGameMode(player, mode))
                return true;
        }
        return false;
    }
    static notGameMode(player, mode) {
        return !this.isGameMode(player, mode);
    }
    static notGameModes(player, ...modes) {
        for (const mode of modes) {
            if (this.isGameMode(player, mode))
                return false;
        }
        return true;
    }
    static getInventory(player) {
        const container = EntityUtils.getContainer(player);
        if (this.inventoryMap.has(player.id)) {
            return this.inventoryMap.get(player.id);
        }
        return this.inventoryMap.set(player.id, new Inventory(container)).get(player.id);
    }
    static getSelectedSlot(player) {
        const container = EntityUtils.getContainer(player);
        return container === null || container === void 0 ? void 0 : container.getSlot(player.selectedSlotIndex);
    }
    static consumeMainHandItem(player, amount = 1) {
        return EntityUtils.consumeItem(player, player.selectedSlotIndex, amount);
    }
    static consumeOffHandItem(player, amount = 1) {
        return EntityUtils.consumeEquipmentItem(player, EquipmentSlot.Offhand, amount);
    }
    static damageMainHandItem(player, amount = 1, options) {
        return EntityUtils.damageItem(player, player.selectedSlotIndex, amount, options);
    }
    static setMainHandItemDamage(player, damage, options) {
        return EntityUtils.setItemDamage(player, player.selectedSlotIndex, damage, options);
    }
    static getMainHandItem(player) {
        return EntityUtils.getContainer(player).getItem(player.selectedSlotIndex);
    }
    static getOffHandItem(player) {
        return EntityUtils.getEquipment(player, EquipmentSlot.Offhand);
    }
}
PlayerUtils.inventoryMap = new Map();
//# sourceMappingURL=PlayerUtils.js.map