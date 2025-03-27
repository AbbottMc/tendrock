export class Identifier {

  static getNamespace(namespacedId: string): string | undefined {
    if (!namespacedId.includes(':')) {
      return undefined;
    }
    return namespacedId.split(':')[0];
  }

  static getId(namespacedId: string): string {
    if (!namespacedId.includes(':')) {
      return namespacedId;
    }
    return namespacedId.split(':')[1];
  }

  static getVanilla(id: string): string {
    return `minecraft:${id}`;
  }

  static isVanilla(namespacedId: string): boolean {
    return this.getNamespace(namespacedId) === 'minecraft';
  }

  static isNamespace(namespacedId: string, namespace: string): boolean {
    return this.getNamespace(namespacedId) === namespace;
  }

  static hasNamespace(namespacedId: string): boolean {
    return namespacedId.includes(':');
  }
}