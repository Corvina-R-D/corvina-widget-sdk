import { BaseWgt, DataLink, IDataLinkConstructorArgs, Value } from '@/corvina-model';
import TrendDataWgt from './TrendDataWgt';
import ChartWgt from './ChartWgt';
export default class HistoricalDataSet extends BaseWgt {
    parent: ChartWgt;
    protected trendName: string;
    protected fetchingDataCounter: number;
    protected datasetType: string;
    protected enabledAggregation: boolean;
    protected aggregation: string;
    protected extent: number;
    protected size: number;
    protected unit: string;
    protected offset: number;
    protected aggrParams: any;
    protected filterRawData: string;
    protected label: Value<string>;
    protected source: Value<string>;
    protected color: Value<string>;
    protected timestamps: number[];
    protected values: any[];
    protected dataSrcWgt: BaseWgt;
    protected updateCallback: Function;
    protected lineWidth: number;
    protected lineStyle: string;
    protected lineShape: string;
    protected lineDisplayPoints: boolean;
    protected lineDisplayLines: boolean;
    protected lineFilledArea: string;
    protected barBorderWidth: number;
    protected barBorderColor: string;
    protected autoColors: boolean;
    protected mapColors: Map<string, {
        color: string;
    }>;
    protected sourceDataLink: DataLink;
    protected unwatchXform: any;
    protected model: Value<any>;
    protected tagsFromModel: string[];
    protected fnDataLinkUpdate: (event: any) => void;
    constructor(args: any);
    protected addTrendData(state: any): TrendDataWgt;
    addChild(child: BaseWgt): void;
    protected notifyNewColor(child: BaseWgt): void;
    protected setDefaultStyle(): void;
    /**
     * Will be deprecated in future versions, use getChildrenLimit instead
     */
    getChildrendLimit(type: string): number;
    getChildrenLimit(type: string): number;
    /**
     * @deprecated
     * Will be deprecated in future versions, use setChildrenOverflow instead
     */
    setChildrendOverflow(type: string, overflow: boolean): void;
    setChildrenOverflow(type: string, overflow: boolean): void;
    updateModel(): Promise<void>;
    protected onModelUpdated(): void;
    getSampling(): {
        enabled: boolean;
        aggregation: string;
        size: number;
        extent: number;
        unit: string;
        offset?: number;
        params?: any;
        filterRawData?: string;
    };
    setSampling(args: {
        aggregation: string;
        size: number;
        extent: number;
        unit: string;
        offset?: number;
        params?: any;
        filterRawData?: string;
    }): void;
    private getAverageUnit;
    private getAverageSize;
    generateSamplingParameters(start: Date, end: Date, graphicSize: number): void;
    onUpdate(cb: Function): void;
    onDataLinkUpdated(event: any): void;
    isFetchingData(): boolean;
    refresh(pStart?: number, pEnd?: number): Promise<any>;
    loadDatalinks(): void;
    updateChartData(trendData: any): void;
    getDataStyle(id: string): any;
    protected watchXFormUpdate(): void;
    protected clearModel(): void;
    addDatalink(dl: any): DataLink;
    removeDatalink(dl: DataLink): void;
    clearData(): void;
    clearSeries(): void;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(prop: any): any;
    serialize(): import("@/corvina-model").IWidgetSerialization;
    protected getFirstTrendDataWgt(): TrendDataWgt;
    requestRedraw(): void;
    protected createDatalinkAlias(sourceDL: DataLink, target: TrendDataWgt, dlArgs: IDataLinkConstructorArgs): DataLink;
    protected watchXFormAlias(datalink: DataLink, trendData: TrendDataWgt, trendDataLink: DataLink): void;
    unload(): void;
}
