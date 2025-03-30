import {Tendrock} from "../../../common/Tendrock";

export class IdRefs {
  protected static get(id: string) {
    return Tendrock.getIdentifier(id);
  }
}