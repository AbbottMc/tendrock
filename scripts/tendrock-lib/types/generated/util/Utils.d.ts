export interface GameObjectType {
    id: string;
}
export declare class Utils {
    static getTypeId<T extends GameObjectType>(type: T | string): string;
}
