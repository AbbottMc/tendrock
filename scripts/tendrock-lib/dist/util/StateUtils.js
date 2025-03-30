export class StateUtils {
    static getState(permutation, state) {
        return permutation.getState(state);
    }
    static withState(permutation, stateName, state) {
        return permutation.withState(stateName, state);
    }
    static hasState(permutation, stateName) {
        return permutation.getAllStates().hasOwnProperty(stateName);
    }
}
//# sourceMappingURL=StateUtils.js.map