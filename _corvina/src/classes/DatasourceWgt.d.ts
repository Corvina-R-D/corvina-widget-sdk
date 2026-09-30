import { Value, DataLink, BaseDatasourceWgt, DataValue } from '@/corvina-model';
import DataSourceQueryWgt from "./DataSourceQueryWgt";
import DataSourceQueryParameters from "./DataSourceQueryParameters";
import { AsyncQueueDebounced } from '@/utils/AsyncQueueDebounced';
import { TagDataType } from '@/utils/Tag';
import ReactiveClockCache from './utils/ReactiveClockCache';
import { SizeUnit } from '@/utils/aggregation/Aggreagator';
export interface CorvinaDatasetStatus {
    historical: boolean;
    alignment: boolean;
    aggregation: boolean;
    generator: boolean;
    generatorDatasets: number;
    tagstype: "mixed" | "remote" | "local";
    timeseries: boolean;
    ntags: number;
}
export declare enum DatasetMode {
    STANDARD = 0,
    GENERATOR = 1
}
export default class DatasourceWgt extends BaseDatasourceWgt {
    private labelId;
    private label;
    private source;
    private algSource;
    private sourceDataLink;
    protected queryWgt: DataSourceQueryWgt;
    protected sources: string[];
    private datasetMode;
    private sourceTemplate;
    private labelTemplate;
    protected startDate: Value<Date>;
    protected endDate: Value<Date>;
    private data;
    private dataType;
    protected limit: number;
    private _filterCondition;
    private _filterBeforeAlignment;
    protected status: CorvinaDatasetStatus;
    private messagesInfo;
    private messagesErrors;
    protected _requestQueue: AsyncQueueDebounced;
    protected _reactiveClockCache: ReactiveClockCache;
    constructor(args: any);
    loadDefaultConfiguration(): void;
    protected addQueryDataWgt(clockId?: string, initState?: any): DataSourceQueryWgt;
    getDataType(): string | Object;
    getStatus(): CorvinaDatasetStatus;
    setPropertyValue({ prop, value, ts }: {
        prop: any;
        value: any;
        ts?: number;
    }): void;
    private setClockData;
    refresh(): void;
    getCategoricalDatasetType(): DatasetMode;
    getPropertyValue(prop: any): any;
    private initQueryDataWgtForDifferentClock;
    addDatalink(dl: any): DataLink;
    removeDatalink(dl: DataLink): void;
    updateQuery(): boolean;
    protected getQueryParameters(): DataSourceQueryParameters;
    protected getQueryParameter(parameter: any): any;
    protected setQueryParameter(parameter: string, value: any): boolean;
    private updateQueryParameters;
    protected updateSources(): boolean;
    onDataLinkUpdated(event: any): void;
    protected updateStatus(): void;
    updateMessagesErrors(errors?: {
        description: string;
    }[]): void;
    private showMessageInfo;
    protected resolveConfigurationIssues(): void;
    private getFormula;
    protected registerTags(): void;
    protected updateConfiguration(): void;
    updateDatasetData(data: DataSourceQueryWgt): void;
    private formatValue;
    private calcFormatType;
    private mergeFormat;
    getPropertyType(property: string): TagDataType;
    getDataModel(filterModel?: string): any;
    readHistData(tagName: string, from: number, to: number, nSamples: number, downsample?: boolean, aggregation?: any, downsampling?: {
        size: number;
    }, filterCondition?: string, filters?: {
        filterRawData?: string;
    }): Promise<Array<DataValue>>;
    getColumns(): string[];
    getTimeResolution(): {
        size: number;
        extent: number;
        unit: SizeUnit;
    };
    serialize(): import("@/corvina-model").IWidgetSerialization;
}
