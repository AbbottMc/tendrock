import {BetterSet} from './BetterSet'

export class SetMap<K, V> {
  protected elementMap: Map<K, BetterSet<V>> = new Map<K, BetterSet<V>>();

  push(key: K, value: V): boolean {
    const eleSet = this.elementMap.get(key) ?? new BetterSet<V>();
    const isSucceed = eleSet.add(value);
    this.elementMap.set(key, eleSet);
    return isSucceed;
  }

  delete(key: K, value: V): boolean {
    const eleSet = this.elementMap.get(key);
    if (!eleSet) return false;
    const isSucceed = eleSet.delete(value);
    if (eleSet.size() > 0) {
      this.elementMap.set(key, eleSet);
    } else {
      this.elementMap.delete(key);
    }
    return isSucceed;
  }

  get(key: K): BetterSet<V> | undefined {
    return this.elementMap.get(key);
  }

  getAt(key: K, index: number): V | undefined {
    const eleSet = this.elementMap.get(key);
    if (!eleSet) return undefined;
    return eleSet.get(index);
  }

  forEach(callback: (value: V, key: K, index: number) => void) {
    this.elementMap.forEach((eleSet, key) => {
      eleSet.forEach((element, index) => callback(element, key, index));
    });
  }

  forEachSet(callback: (valueSet: BetterSet<V>, key: K) => void) {
    this.elementMap.forEach(callback);
  }
}