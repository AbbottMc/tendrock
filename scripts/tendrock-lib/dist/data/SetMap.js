import { BetterSet } from './BetterSet';
export class SetMap {
    constructor() {
        this.elementMap = new Map();
    }
    push(key, value) {
        var _a;
        const eleSet = (_a = this.elementMap.get(key)) !== null && _a !== void 0 ? _a : new BetterSet();
        const isSucceed = eleSet.add(value);
        this.elementMap.set(key, eleSet);
        return isSucceed;
    }
    delete(key, value) {
        const eleSet = this.elementMap.get(key);
        if (!eleSet)
            return false;
        const isSucceed = eleSet.delete(value);
        if (eleSet.size() > 0) {
            this.elementMap.set(key, eleSet);
        }
        else {
            this.elementMap.delete(key);
        }
        return isSucceed;
    }
    get(key) {
        return this.elementMap.get(key);
    }
    getAt(key, index) {
        const eleSet = this.elementMap.get(key);
        if (!eleSet)
            return undefined;
        return eleSet.get(index);
    }
    forEach(callback) {
        this.elementMap.forEach((eleSet, key) => {
            eleSet.forEach((element, index) => callback(element, key, index));
        });
    }
    forEachSet(callback) {
        this.elementMap.forEach(callback);
    }
}
//# sourceMappingURL=SetMap.js.map