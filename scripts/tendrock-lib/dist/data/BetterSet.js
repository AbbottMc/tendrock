export class BetterSet {
    constructor() {
        this.elementList = [];
    }
    add(element) {
        if (this.elementList.includes(element))
            return false;
        this.elementList.push(element);
        return true;
    }
    delete(element) {
        if (!this.elementList.includes(element))
            return false;
        this.elementList.splice(this.elementList.indexOf(element), 1);
        return true;
    }
    get(index) {
        if (index >= this.elementList.length || index < 0)
            return undefined;
        return this.elementList[index];
    }
    has(element) {
        return this.elementList.includes(element);
    }
    forEach(callback) {
        this.elementList.forEach(callback);
    }
    size() {
        return this.elementList.length;
    }
}
//# sourceMappingURL=BetterSet.js.map