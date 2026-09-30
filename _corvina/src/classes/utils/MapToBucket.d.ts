/**
 * Porting from formula-evaluator!
 * This module provides utilities for temporal discretization ("bucketing").
 * It is responsible for converting continuous timestamps into discrete bucket indices
 * and converting a bucket index back into a representative timestamp.
 * This code is a port from an internal library called "formula-evaluator".
 */
export type BucketIndex = number;
export type TimestampValue = number;
import { SizeUnit } from "@/utils/aggregation/Aggreagator";
interface Timebase {
    /**
     * The size of each bucket, expressed in the unit defined by `unit`.
     * E.g., if unit is 'days' and size is 7, each bucket represents one week.
     */
    size: number;
    /**
     * The duration or extent of an event, expressed in the same unit as `size`.
     * Used to determine if an event spans across multiple buckets.
     */
    extent: number;
    /**
     * The unit of measurement for both `size` and `extent`.
     */
    unit: SizeUnit;
}
/**
 * Maps a timestamp to its corresponding start and end bucket indices based on a `Timebase`.
 *
 * @param value The start timestamp of the event (in milliseconds).
 * @param timebase The bucketing configuration (size, extent, unit).
 * @returns An array containing two elements: [startBucketIndex, endBucketIndex].
 * @warning This function detects the timezone of the system where it runs.
 * This can lead to different results between client and server if they are in
 * different timezones. For consistent results, the timezone should be an explicit parameter.
 */
declare function mapToBuckets(value: TimestampValue, timebase: Timebase): BucketIndex[];
/**
 * Calculates a representative timestamp for a given bucket index.
 * This is the inverse function of `mapToBuckets`.
 *
 * @param bucketIndex The index of the bucket.
 * @param timebase The bucketing configuration.
 * @returns A representative timestamp (in milliseconds) for that bucket.
 * @note For fixed-duration units, this returns the midpoint of the bucket.
 * For months/years, it returns a representative date (e.g., middle of the month).
 * It always uses UTC calculations to ensure deterministic results.
 */
declare function mapFromBucket(bucketIndex: number, timebase: Timebase): TimestampValue;
/**
 * Snaps a timestamp to the nearest boundary (start or end) of the bucket it belongs to.
 * This is useful for rounding timestamps to align with the bucketing grid.
 *
 * @param value The timestamp (in milliseconds) to snap.
 * @param side Determines whether to snap to the start ('left') or end ('right') of the bucket.
 * @param timebase The bucketing configuration.
 * @returns The timestamp of the calculated boundary (in milliseconds).
 */
declare function findClosestBound(value: number, side: "left" | "right", timebase: Timebase): number;
export { mapToBuckets, mapFromBucket, findClosestBound };
