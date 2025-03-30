export interface GameObjectType {
  id: string;
}

export class Utils {
  static getTypeId<T extends GameObjectType>(type: T | string) {
    return typeof type === 'string' ? type : type.id;
  }
}