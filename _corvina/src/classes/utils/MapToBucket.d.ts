/**
 * Porting from formula-evaluator!
 * This module provides utilities for temporal discretization ("bucketing").
 * It is responsible for converting continuous timestamps into discrete bucket indices
 * and converting a bucket index back into a representative timestamp.
 * This code is a port from an internal library called "formula-evaluator".
 *
 * It must agree with the backend `StaticTimebase` bucket for bucket: the scheduler uses it to
 * decide where to resume paging (see DataSourceSchedulerDataRequest.calculateExtendStart), so a
 * boundary computed here that is not a real bucket boundary makes the backend recompute a
 * *partial* bucket. For a `deltaCounter` that means a visibly wrong number, not just a shifted
 * label.
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
    /**
     * IANA timezone the grid is aligned to (e.g. "Europe/Rome"). Defaults to the timezone of the
     * system where this runs, which is also what `WSServerInterface` puts in `query.timezone`, so
     * client and backend agree by default. Pass it explicitly to make a call deterministic.
     */
    timezone?: string;
}
/**
 * Maps a timestamp to its corresponding start and end bucket indices based on a `Timebase`.
 *
 * @param value The start timestamp of the event (in milliseconds).
 * @param timebase The bucketing configuration (size, extent, unit, optional timezone).
 * @returns An array containing two elements: [startBucketIndex, endBucketIndex].
 */
declare function mapToBuckets(value: TimestampValue, timebase: Timebase): BucketIndex[];
/**
 * Calculates a representative timestamp for a given bucket index.
 * This is the inverse function of `mapToBuckets`.
 *
 * @param bucketIndex The index of the bucket.
 * @param timebase The bucketing configuration.
 * @returns A representative timestamp (in milliseconds) for that bucket.
 * @note For fixed-duration units, this returns the midpoint of the bucket. For days it returns
 * local noon, and for months/years a representative date (e.g. middle of the month).
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
/**
 *
 * @param timeResolution
 * @param fallbackTs clockTime, start or end time
 * @returns
 */
declare function toTimeResolution(timeResolution: {
    size: number;
    extent: number;
    unit: SizeUnit;
}, fallbackTs: number): number;
export { mapToBuckets, mapFromBucket, findClosestBound, toTimeResolution };
export type { Timebase };
