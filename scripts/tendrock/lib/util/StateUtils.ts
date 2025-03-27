import {BlockPermutation} from "@minecraft/server";

export class StateUtils {
  public static getState<T extends (number | string | boolean)>(permutation: BlockPermutation, state: string): T {
    return permutation.getState(state as any) as T;
  }


  public static setState<T extends (number | string | boolean)>(permutation: BlockPermutation, stateName: string, state: T): BlockPermutation {
    return permutation.withState(stateName as any, state);
  }


  public static hasState(permutation: BlockPermutation, stateName: string): boolean {
    return permutation.getAllStates().hasOwnProperty(stateName);
  }
}