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
    timestamps: number[];
    values: any[];
    timeShift: number;
    private sortingMode;
    private chunkSize;
    private scalar;
    getDataLimit: () => number;
    getTimeResolution: () => {
        size: number;
        extent: number;
        unit: SizeUnit;
    };
    private fetch;
    private update;
    private updateCounter;
    constructor(params?: {
        sortingMode?: "asc" | "desc";
        scalar?: boolean;
    });
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
    setChunkSize(limit: number): void;
    setScalar(scalar: boolean): void;
    setSortingMode(mode: "asc" | "desc"): void;
    /**
     * Avvia o aggiorna il processo di recupero dei dati.
     * @param pStart Inizio dell'intervallo cronologico.
     * @param pEnd Fine dell'intervallo cronologico (deve essere >= pStart).
     */
    refresh(pStart: number, pEnd: number): Promise<void>;
    clearTrendData(): void;
    private scheduleExtendLeft;
    private calculateExtendStart;
    private toTimeResolution;
    private scheduleExtendRight;
    nextChunk(direction: ExtendDirection): Promise<void>;
    private extend;
}
export {};
