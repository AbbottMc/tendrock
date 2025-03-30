export class BetterSet<E> {
  protected elementList: E[] = [];

  add(element: E) {
    if (this.elementList.includes(element)) return false;
    this.elementList.push(element);
    return true;
  }

  delete(element: E) {
    if (!this.elementList.includes(element)) return false;
    this.elementList.splice(this.elementList.indexOf(element), 1);
    return true;
  }

  get(index: number): E | undefined {
    if (index >= this.elementList.length || index < 0) return undefined;
    return this.elementList[index];
  }

  has(element: E): boolean {
    return this.elementList.includes(element);
  }

  forEach(callback: (element: E, index: number) => void) {
    this.elementList.forEach(callback);
  }

  size() {
    return this.elementList.length;
  }
}