import { DataValue } from '../communication/axios/model/devicedata';
import { Value, DataLink, HistoricalDataSet } from '@/corvina-model';
import BaseWgt from "./BaseWgt";
export default class TrendDataWgt extends BaseWgt {
    label: Value<any>;
    labelId: string;
    source: Value<any>;
    timestamps: number[];
    values: any[];
    enabled: boolean;
    stopped: boolean;
    parent: HistoricalDataSet;
    intervalProps: {
        start: string;
        end: string;
    };
    private dataSrcWgt;
    private sourceDataLink;
    /** Current interval being fetched */
    private currentInterval;
    /** If more data is required */
    private scheduledInterval;
    private trendName;
    private extendingRight;
    private extendingLeft;
    private unwatchXform;
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
    private fetchData;
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
    private _fetch;
    serialize(): import("@/corvina-model").IWidgetSerialization;
    unload(): void;
    fetch(from: number, to: number, maxSamples?: number): Promise<Array<DataValue>>;
    prependData(data: DataValue): void;
}
