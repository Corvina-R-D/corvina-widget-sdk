import { ModelRoot } from "@/interfaces/model";
export declare function sanitizeModelPath(path: string, separator?: string): string;
export interface RawTag {
    name: string;
    type: string;
    instanceOf?: string;
    originalName?: string;
}
export declare function isRawTag(obj: any): obj is RawTag;
export interface SanitizedTag {
    sanitizedName: string;
    originalName: string;
    type: string;
    instanceOf?: string;
    parent?: SanitizedTag;
    children?: SanitizedTag[];
    fullName?: string;
}
export declare function isSanitizedTag(obj: any): obj is SanitizedTag;
export declare function guessSeparator(tags: RawTag[] | SanitizedTag[]): string;
export declare function guessStructs(tags: RawTag[], minimumModelInstances?: number, separator?: string): RawTag[];
export declare function iterateSanitizedTags(tags: SanitizedTag[], parentName?: string, separator?: string): IterableIterator<SanitizedTag>;
export declare function filterSanitizedTags(tags: SanitizedTag[], filter: RawTag[]): void;
export declare function getSanitizedTags(tags: RawTag[] | SanitizedTag[], separator?: string, existingProperties?: {}): SanitizedTag[];
/**
 * Checks if the testModel is compatible with the baseMode, that is, if it contains
 * a subset of the tags of the baseModel.
 * @param testModel
 * @param baseModel
 */
export declare function isModelCompatibleWith(testModel: ModelRoot, baseModel: ModelRoot): boolean;
export declare function isTagSetCompatibleWith(sanitizedTags: SanitizedTag[], baseTagSet: ModelRoot): boolean;
export declare function applySearchTags(tags: RawTag[], searchTags: string): RawTag[];
