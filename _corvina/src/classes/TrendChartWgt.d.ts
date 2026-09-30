import { Value } from '@/corvina-model';
import TrendDataWgt from "./TrendDataWgt";
import BaseWgt from './BaseWgt';
import DataLink from "./DataLink";
import DataAdapter from "./DataAdapter";
import { IChartData } from '@/interfaces/plotly';
import ChartWgt, { EXPORT_FORMAT, IExportTraceDataCSV, IExportTraceDataJSON } from './ChartWgt';
export declare enum TRENDCHARTMODE {
    LOCAL = 0,
    GLOBAL = 1,
    MANUAL = 2
}
export default class TrendChartWgt extends ChartWgt {
    wgts: BaseWgt[];
    startDate: Value<Date>;
    endDate: Value<Date>;
    duration: Value<number>;
    fetchingData: number;
    refreshCount: number;
    dataVersion: number;
    autoscroll: boolean;
    xLabels: number;
    xLabelsFormat: string;
    hovermode: string;
    tooltipFormat: string;
    mode: TRENDCHARTMODE;
    private cachedDuration;
    private axisColor;
    private gridColor;
    private yAxes;
    private model;
    private tagsFromModel;
    private defaultDataColors;
    private defaultDataIndex;
    limit: number;
    private legendOrientation;
    private legendVisibility;
    private legendFontColor;
    protected plotlyDataAdapter: DataAdapter<TrendDataWgt, IChartData>;
    private y1AxisColor;
    private y2AxisColor;
    private y1AxisLabel;
    private y2AxisLabel;
    private y1AxisRangeMode;
    private y1AxisRange;
    private y2AxisRangeMode;
    private y2AxisRange;
    private yAxesVisibile;
    private marginsType;
    private marginBottom;
    private marginTop;
    private marginLeft;
    private marginRight;
    private dbRefresh;
    private globalDuration;
    private dragmode;
    private limitTrendData;
    private limitFilter;
    private defaultClockId;
    private defaultClockId_options;
    constructor(args: any);
    private _initYAxes;
    addAxis(axis: string): void;
    protected createDataAdapter(): void;
    notifyDataColor(color: string): void;
    getDataColor(): string;
    updateTimeRangeFromDuration(): void;
    loadDefaultConfiguration(): void;
    private loadDefaultClockConfiguration;
    private unloadDefaultConfiguration;
    private reloadGlobalDataLinksToRW;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    /**
     * Will be deprecated in future versions, use getChildrenLimit instead
     */
    getChildrendLimit(type: string): number;
    getChildrenLimit(type: string): number;
    updateModel(): Promise<void>;
    protected onModelUpdated(): void;
    getPropertyValue(prop: string): any;
    hasDataWgt(labelID: string): boolean;
    private getDataInterval;
    serialize(): any;
    private isAutoscrollUpdate;
    updateTimeRangeData(): void;
    setChartData(): void;
    applyBounds(): void;
    updateChartData<TrendDataWgt>(data: any, style: any): void;
    addChild(child: BaseWgt): void;
    removeChild(childIndex: number): BaseWgt;
    removeDatalink(dl: DataLink): void;
    exportChartData(format: EXPORT_FORMAT): IExportTraceDataJSON | IExportTraceDataCSV;
}
