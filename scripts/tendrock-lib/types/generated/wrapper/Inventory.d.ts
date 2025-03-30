import { Container, ContainerSlot, ItemStack, ItemType } from '@minecraft/server';
export declare class Inventory {
    protected container: Container;
    constructor(container: Container);
    getItemSlot(itemType: ItemType | string): ContainerSlot | undefined;
    consume(slot: number | ContainerSlot, amount?: number): boolean;
    tryConsume(slot: number | ContainerSlot, amount?: number): boolean;
    addItem(itemType: string | ItemType, amount?: number): boolean;
    add(itemStack: ItemStack): boolean;
}
