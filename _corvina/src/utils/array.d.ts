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
 * @param arr Sorted array of numbers
 * @param target Number to search for
 * @returns index of the first element in arr that is greater than or equal to target, or -1 if no such element exists.
 */
export declare function binarySearchGte(arr: number[], target: number): number;
/**
 * Binary search on a descending sorted array.
 * Returns the index of the first element that is less than or equal to the target.
 * If all elements are greater than the target, returns the length of the array.
 * @param arr Array of numbers sorted in descending order.
 * @param target number to search for.
 * @returns index of the first element that is less than or equal to the target, or the length of the array if no such element exists.
 */
export declare function binarySearchLte(arr: number[], target: number): number;
