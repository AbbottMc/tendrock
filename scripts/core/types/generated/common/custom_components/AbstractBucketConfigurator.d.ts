import { SetMap } from "@tendrock/lib";
import { FluidType, ItemStack } from "@minecraft/server";
import { AbstractConfigurator } from "../../core/config/AbstractConfigurator";
import { BucketConfig } from "../../core/config/item/BucketConfigurator";
export declare class AbstractBucketConfigurator extends AbstractConfigurator<BucketConfig> {
    protected fullBucketToEmptyMap: Map<string, string>;
    protected fullBucketToFluidMap: Map<string, string>;
    protected emptyBucketToFullMap: Map<string, Map<string, string>>;
    protected emptyBucketToFluidMap: SetMap<string, string>;
    protected fullBucketEmptySoundIdMap: Map<string, string>;
    protected emptyBucketFillSoundIdMap: Map<string, string>;
    protected fullBucketToFluidType: Map<string, FluidType>;
    protected isEmptyBucket(itemStack: ItemStack): boolean;
    protected isFullBucket(itemStack: ItemStack): boolean;
    protected isBucket(itemStack: ItemStack): boolean;
    config(config: BucketConfig): void;
    getEmptyBucketId(fullBucketId: string): string;
    getFluidType(fullBucketTypeId: string): FluidType;
    private addToMapEle;
}
