import { Container, ContainerSlot, ItemStack } from '@minecraft/server';
export declare class ContainerUtils {
    static getSlot(container: Container, slot: number | ContainerSlot): ContainerSlot;
    static getSlotItem(container: Container, slot: number | ContainerSlot): ItemStack;
    static setSlotItem(container: Container, slot: number | ContainerSlot, itemStack?: ItemStack): boolean;
    static consume(container: Container, slotId: number, amount?: number): boolean;
    static tryConsume(container: Container, slotId: number, amount?: number): boolean;
    static consumeSlot(container: Container, slot: number | ContainerSlot, amount?: number): boolean;
    static tryConsumeSlot(container: Container, slot: number | ContainerSlot, amount?: number): boolean;
}
