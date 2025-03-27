import {Vector3} from "@minecraft/server";

export class LocationUtils {
  private static randomSign() {
    return Math.random() > 0.5 ? 1 : -1;
  }

  public static randomXZIn(location: Vector3) {
    return {
      x: location.x + 0.5 + (this.randomSign() * Math.random() / 2),
      y: location.y,
      z: location.z + 0.5 + (this.randomSign() * Math.random() / 2),
    };
  }
}