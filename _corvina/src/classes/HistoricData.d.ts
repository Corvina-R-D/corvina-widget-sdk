import { DataValue } from '../communication/axios/model/devicedata';
export default class HistoricData {
    /** Current interval being fetched */
    private currentInterval;
    /** If more data is required */
    private scheduledInterval;
    private extendingRight;
    private extendingLeft;
    timestamps: number[];
    values: any[];
    getDataLimit: () => number;
    private fetch;
    private update;
    private updateCounter;
    constructor();
    setFetchFunction(f: (from: number, to: number) => Promise<Array<DataValue>>): void;
    onDataUpdate(f: (data: HistoricData) => any): void;
    onCounterUpdate(f: (counter: number) => any): void;
    setDatalimit(f: () => number): void;
    refresh(pStart: number, pEnd: number): Promise<void>;
    clearTrendData(): void;
    private scheduleExtendLeft;
    private scheduleExtendRight;
    private extendLeft;
    private extendRight;
}
