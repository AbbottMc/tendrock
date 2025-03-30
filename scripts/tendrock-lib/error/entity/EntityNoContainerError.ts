import {Entity} from '@minecraft/server'

export class EntityNoContainerError extends Error {
  constructor(entity: Entity) {
    super(`EntityNoContainerError: Entity - "${entity.typeId}" doesn't have any container!`);
  }
}