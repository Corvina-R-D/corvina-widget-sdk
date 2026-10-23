import { SizeUnit } from "@/utils/aggregation/Aggreagator";
import { DataValue } from "../communication/axios/model/devicedata";
type ExtendDirection = "left" | "right";
export default class SchedulerDataRequest {
    /** Current interval being fetched */
    private currentInterval;
    /** If more data is required */
    private scheduledInterval;
    private extendingRight;
    private extendingLeft;
    private _timestamps;
    private _values;
    timeShift: number;
    private sortingMode;
    private chunkSize;
    private scalar;
    /** Bumped by setSortingMode() so in-flight extend() calls from the old mode can detect they're stale and bail out instead of merging into the new mode's buffers. */
    private generation;
    getDataLimit: () => number;
    getTimeResolution: () => {
        size: number;
        extent: number;
        unit: SizeUnit;
    };
    isAggregationEnabled: () => boolean;
    private fetch;
    private update;
    private updateCounter;
    constructor(params?: {
        sortingMode?: "asc" | "desc";
        scalar?: boolean;
    });
    /**
     * The fetched series is kept out of Vue's reactive graph: these accessors live on the prototype
     * and the backing arrays are hidden properties, so `Observer.walk()` never sees them, and the
     * setter marks every incoming array so Vue will not observe it even once the owning widget
     * copies it into its own reactive state (`onDataUpdate`). An observed array has a patched
     * `__proto__`, which makes `slice`/`concat`/`map` on it up to 6x slower.
     * Consumers are notified explicitly via `this.update?.(this)`. See {@link markNonReactive}.
     */
    get timestamps(): number[];
    set timestamps(value: number[]);
    get values(): any[];
    set values(value: any[]);
    setFetchFunction(f: (from: number, to: number, timeShift: number, limit?: number) => Promise<{
        data: DataValue[];
        timestamps: number[];
        values: any[];
    }>): void;
    onDataUpdate(f: (data: SchedulerDataRequest) => any): void;
    onCounterUpdate(f: (counter: number) => any): void;
    setDatalimit(f: () => number): void;
    setTimeResolution(f: () => {
        size: number;
        extent: number;
        unit: SizeUnit;
    }): void;
    setAggregationEnabled(f: () => boolean): void;
    setChunkSize(limit: number): void;
    setScalar(scalar: boolean): void;
    setSortingMode(mode: "asc" | "desc"): void;
    refresh(pStart: number, pEnd: number): Promise<void>;
    clearTrendData(): void;
    private scheduleExtendLeft;
    private scheduleExtendRight;
    /**
     * Regardless of sorting mode, the initial fetch (see refresh()) always grows the
     * interval via a "right" extend, so continuing pagination (loading further chunks)
     * must also always extend "right"; "left" is reserved for the opposite direction
     * (e.g. filling in a pan towards an earlier scheduledInterval[0]).
     */
    nextChunk(): Promise<void>;
    prevChunk(): Promise<void>;
    fetchChunkByDirection(direction: ExtendDirection): Promise<void>;
    private extend;
}
export {};
