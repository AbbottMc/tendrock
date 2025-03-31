import {Dimension, Vector3} from "@minecraft/server";
import {MinecraftEntityTypes} from "@minecraft/vanilla-data";
import {NumberRange} from "@minecraft/common";

export class EntityUtils {
  private static getNumber(num: number | NumberRange) {
    if (typeof num == "number") {
      return num;
    } else {
      return (Math.random() * (num.max - num.min) + num.min);
    }
  }

  static spawnXpOrbs(xp: number | NumberRange, dimension: Dimension, location: Vector3) {
    const orbCount = Math.round(this.getNumber(xp));
    for (let i = 0; i < orbCount; i++) {
      dimension.spawnEntity(MinecraftEntityTypes.XpOrb, location);
    }
  }
}