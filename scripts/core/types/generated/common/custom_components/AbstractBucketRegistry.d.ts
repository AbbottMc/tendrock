import { SetMap } from "@tendrock/lib";
import { FluidType, ItemStack } from "@minecraft/server";
import { AbstractRegistry } from "../../core/registry/AbstractRegistry";
import { BucketRegisterConfig } from "../../core/registry/BucketRegistry";
export declare class AbstractBucketRegistry extends AbstractRegistry<BucketRegisterConfig> {
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
    register(config: BucketRegisterConfig): void;
    getEmptyBucketId(fullBucketId: string): string;
    getFluidType(fullBucketTypeId: string): FluidType;
    private addToMapEle;
}
