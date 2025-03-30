export declare class BetterSet<E> {
    protected elementList: E[];
    add(element: E): boolean;
    delete(element: E): boolean;
    get(index: number): E | undefined;
    has(element: E): boolean;
    forEach(callback: (element: E, index: number) => void): void;
    size(): number;
}
