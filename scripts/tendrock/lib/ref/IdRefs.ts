import {Tendrock} from "../Tendrock";

export class IdRefs {
  protected static get(id: string) {
    return Tendrock.getIdentifier(id);
  }
}