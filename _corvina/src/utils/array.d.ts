export type Comparator = (a: any, b: any) => boolean;
export declare const DEFAULT_COMPARATOR: (a: any, b: any) => boolean;
export declare const getArrayToAddAndDelete: (oldArray: any[], newArray: any[], options?: {
    comparator: Comparator;
}) => {
    toAdd: any[];
    toDelete: any[];
};
/** Given arr: ["a", "b", "c"] and new partial order ["c", "a"] return ["c", "b", "a"] */
export declare function partialSorting(arr: string[], newPartialOrder: string[]): string[];
/**
 * Binary search for the first index in arr where arr[index] >= target.
 * If no such index exists, returns -1.
 * Array can be an array of objects, in that case the key parameter is used to extract the number to compare.
 * @param arr Sorted array of numbers or objects
 * @param target Number to search for
 * @param key Optional key to extract the number from objects
 * @returns index of the first element in arr that is greater than or equal to target, or -1 if no such element exists.
 */
export declare function binarySearchGte<T>(arr: T[], target: number, key?: string): number;
/**
 * Binary search on a DESCENDING sorted array.
 * Returns the index of the first element that is less than or equal to the target.
 * If all elements are greater than the target, returns the length of the array.
 * Array can be an array of objects, in that case the key parameter is used to extract the number to compare.
 * @param arr Array of numbers sorted in descending order.
 * @param target number to search for.
 * @returns index of the first element that is less than or equal to the target, or the length of the array if no such element exists.
 */
export declare function binarySearchLteDesc<T>(arr: T[], target: number, key?: string): number;
/**
 * Returns the index of the first element that is less than or equal to the target.
 * If no such element is found (i.e., all elements are greater than the target), returns -1.
 * Array can be an array of objects, in that case the key parameter is used to extract the number to compare.
 * @param arr Array of numbers or objects sorted in ASCENDING order.
 * @param target number to search for.
 * @param key Optional key to extract the number from objects.
 * @returns index of the last element that is less than or equal to the target, or -1 if no such element exists.
 */
export declare function binarySearchLte<T>(arr: T[], target: number, key?: string): number;
