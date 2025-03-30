export class EntityNoContainerError extends Error {
    constructor(entity) {
        super(`EntityNoContainerError: Entity - "${entity.typeId}" doesn't have any container!`);
    }
}
//# sourceMappingURL=EntityNoContainerError.js.map