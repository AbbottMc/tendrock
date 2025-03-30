import { Dimension, ItemStack, Vector3 } from '@minecraft/server';
export interface DamageItemStackImplOptions extends DamageItemStackOptions {
    isSimulate: boolean;
}
export interface DamageItemStackOptions {
    dimension: Dimension;
    playSoundWhenBroken?: boolean;
    useUnbreaking?: boolean;
    brokenWhenFullDamage?: boolean;
    damagedItemStack?: ItemStack;
}
export interface DamageSlotItemStackOptions extends DamageItemStackOptions {
    location: Vector3;
}
export interface SetSlotItemDamageOptions {
    location?: Vector3;
    dimension: Dimension;
    playSoundWhenBroken?: boolean;
    brokenWhenFullDamage?: boolean;
    itemStack?: ItemStack;
}
