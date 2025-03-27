import {VanillaIdRefs} from "./VanillaIdRefs";

export class VanillaItemTags extends VanillaIdRefs {
  static IsAxe = this.get('is_axe');
  static IsPickaxe = this.get('is_pickaxe');
  static IsShovel = this.get('is_shovel');
  static IsSword = this.get('is_sword');
  static IsArmor = this.get('is_armor');

  static IsFood = this.get('is_food');

  static WoodenTier = this.get('wooden_tier');
  static LeatherTier = this.get('leather_tier');
  static StoneTier = this.get('stone_tier');
  static IronTier = this.get('iron_tier');
  static ChainmailTier = this.get('chainmail_tier');
  static GoldenTier = this.get('golden_tier');
  static DiamondTier = this.get('diamond_tier');
  static NetheriteTier = this.get('netherite_tier');

  static Planks = this.get('planks');
  static Door = this.get('door');
  static Boats = this.get('boats');
  static LogsThatBurn = this.get('logs_that_burn');
  static Logs = this.get('logs');
  static WoodenSlabs = this.get('wooden_slabs');
  static Coals = this.get('coals');
  static Wool = this.get('wool');
  static Carpet = this.get('carpet');
  // ----
  static Saplings = this.get('saplings');
  static PressurePlates = this.get('pressure_plates');
  static FenceGates = this.get('fence_gates');
  static Fence = this.get('fence');
  static Stairs = this.get('stairs');
  static TrapDoors = this.get('trap_doors');
}