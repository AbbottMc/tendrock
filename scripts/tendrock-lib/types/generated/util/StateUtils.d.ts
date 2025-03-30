import { BlockPermutation } from "@minecraft/server";
export declare class StateUtils {
    static getState<T extends (number | string | boolean)>(permutation: BlockPermutation, state: string): T;
    static withState<T extends (number | string | boolean)>(permutation: BlockPermutation, stateName: string, state: T): BlockPermutation;
    static hasState(permutation: BlockPermutation, stateName: string): boolean;
}
