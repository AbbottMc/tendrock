import { BetterSet } from './BetterSet';
export declare class SetMap<K, V> {
    protected elementMap: Map<K, BetterSet<V>>;
    push(key: K, value: V): boolean;
    delete(key: K, value: V): boolean;
    get(key: K): BetterSet<V> | undefined;
    getAt(key: K, index: number): V | undefined;
    forEach(callback: (value: V, key: K, index: number) => void): void;
    forEachSet(callback: (valueSet: BetterSet<V>, key: K) => void): void;
}
