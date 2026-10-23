import { DataValue } from '../communication/axios/model/devicedata';
import { Value, DataLink, HistoricalDataSet } from '@/corvina-model';
import BaseWgt from "./BaseWgt";
export default class TrendDataWgt extends BaseWgt {
    label: Value<any>;
    labelId: string;
    source: Value<any>;
    private _timestamps;
    private _values;
    enabled: boolean;
    stopped: boolean;
    parent: HistoricalDataSet;
    intervalProps: {
        start: string;
        end: string;
    };
    private dataSrcWgt;
    private sourceDataLink;
    /**
     * How far the data has actually been *queried* in display time. Deliberately not where the
     * samples happen to start or end — that is `timestamps` itself.
     */
    private queriedInterval;
    /**
     * Exact right endpoint sent to the historical query while a TrendChart window reaches beyond
     * the current clock. Calendar shifts are not invertible at month/year boundaries, so this query
     * watermark, rather than an inverse-shifted Date.now(), owns right-side scheduling until the
     * complete requested query range has become available.
     */
    private queryCoverageEnd;
    private rightCoverageUsesQueryTime;
    /**
     * The display-time window we want covered: the target, grown by the chart or by the clock.
     */
    private scheduledInterval;
    /** Incremented on clearTrendData to invalidate stale async boundary fetches */
    private dataVersion;
    private trendName;
    private extendingRight;
    private extendingLeft;
    private unwatchXform;
    /**
     * Width (ms) of the visible window, refreshed by `_refresh`. It is the reference the
     * downsampling bucket is derived from — deliberately *not* the range of the single
     * request. See {@link getDownsamplingBucketMs}.
     */
    private downsamplingWindowMs;
    /**
     * Bucket the samples currently in cache were downsampled with, or undefined when they were
     * not downsampled at all. Samples fetched with different buckets cannot be mixed, so this is
     * what decides when the cache has to go — see `_refresh`.
     */
    private cachedBucketMs;
    /** Whether cachedBucketMs describes the resolution selected by a previous refresh. */
    private cachedBucketInitialized;
    protected enableAggregation: boolean;
    protected aggregation: string;
    protected extent: number;
    protected size: number;
    protected unit: string;
    protected offset: number;
    protected aggrParams: any;
    protected filterRawData: string;
    private startTimeFromPreviousValue;
    refresh: Function;
    private _initialized;
    private _initComplete;
    constructor(args: any);
    /**
     * Time series samples are deliberately kept out of Vue's reactive graph, for two reasons:
     * - `Observer.walk()` only visits own *enumerable* keys, and these accessors live on the
     *   prototype while the backing arrays are hidden properties, so the series is never turned
     *   into reactive state (no per-assignment `dep.notify()`, no `observeArray` over 100k+ items);
     * - the setter marks every incoming array with `markNonReactive`, so Vue will not observe it
     *   even after it is handed to another widget or to a chart adapter. An observed array has a
     *   patched `__proto__`, which makes `slice`/`concat`/`map` on it up to 6x slower.
     *
     * Consumers are notified explicitly through `this.parent.updateChartData(this)` after every
     * change, so no reactivity is lost. See {@link markNonReactive}.
     */
    get timestamps(): number[];
    set timestamps(value: number[]);
    get values(): any[];
    set values(value: any[]);
    private hasSampleBefore;
    private calculteStartTime;
    /** Use parent start/end date to fetch extra data */
    private _refresh;
    setPropertyValue({ prop, value, ts }: {
        prop: any;
        value: any;
        ts: any;
    }): void;
    getPropertyValue(property: string): any;
    private simplehash;
    clearTrendData(): void;
    /**
     * Binary search: find index of last element < target in this.timestamps.
     * Returns -1 if no such element exists.
     */
    private findLastBefore;
    /**
     * Binary search: find index of first element > target in this.timestamps.
     * Returns -1 if no such element exists.
     */
    private findFirstAfter;
    /**
     * Ensures boundary points exist just outside the visible interval [pStart, pEnd].
     * Uses binary search (O(log n)) to check cached data; only fetches missing left/right
     * boundary points when needed to draw lines entering or exiting the visible interval.
     * Fetches without downsampling to guarantee exact boundary points are retrieved.
     */
    private ensureBoundaryPoints;
    /**
     * Fetches a single boundary point before or after a given timestamp.
     * Uses a search window and raw fetch (no downsampling) to find the nearest point.
     * For 'before': fetches last point in [searchStart, pStart]
     * For 'after': fetches first point in [pEnd, searchEnd]
     */
    private fetchBoundaryPoint;
    private watchXFormUpdate;
    private updateLabel;
    private initLabelFromDataLink;
    addDatalink(dl: any): DataLink;
    removeDatalink(dl: DataLink): void;
    loadDatalinks(): void;
    onDataLinkUpdated(event: any): void;
    stop(): void;
    addChild(child: BaseWgt): void;
    private isLabelDefaultValue;
    private scheduleExtendLeft;
    private calculateExtendStart;
    private scheduleExtendRight;
    private _applyCalendarShift;
    private toQueryTime;
    private shouldCapRightAtNow;
    private usesQueryTimeForRightCoverage;
    private needsRightExtension;
    private createCappedQueryRange;
    /**
     * Maps a timestamp returned by the historical query onto the display timeline. Calendar
     * shifts are not necessarily invertible, so query coverage must not be derived through this
     * conversion.
     */
    private toDisplayTime;
    private fetchDisplayRange;
    private fetchQueryRange;
    private extendLeft;
    private extendRight;
    private getDataLimit;
    getFilters(): {
        filterRawData: string;
    };
    getAggregation(): {
        type: string;
        sampling: {
            extent: number;
            size: number;
            unit: string;
            offset: number;
        };
    };
    /**
     * Bucket width (ms) to ask the backend to downsample to, or undefined when downsampling
     * does not apply.
     */
    private getDownsamplingBucketMs;
    private _fetch;
    serialize(): import("@/corvina-model").IWidgetSerialization;
    unload(): void;
    fetch(from: number, to: number, maxSamples?: number): Promise<Array<DataValue>>;
    prependData(data: DataValue): void;
}
