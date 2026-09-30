import { BaseWgt, DataLink, IDataLinkConstructorArgs } from '../corvina-model';
import HistoricalDataSet from './HistoricalDataSet';
import TrendDataWgt from './TrendDataWgt';
import ChartWgt from './ChartWgt';
export interface ITrendData {
    x: any[];
    y: any[];
    name?: string;
}
interface IDataStyle {
    color: string;
    lineWidth: number;
    lineStyle: string;
    lineShape: string;
    lineDisplayLines: boolean;
    lineDisplayPoints: boolean;
    barBorderColor: string;
    barBorderWidth: number;
    datasetType: string;
    yAxis: number;
    lineFilledArea: string;
    lineFillColor: string;
}
export default class TrendDatasetWgt extends HistoricalDataSet {
    lineFillColor: string;
    parent: ChartWgt;
    protected autoColors: boolean;
    protected mapColors: Map<string, {
        color: string;
    }>;
    protected fnDataLinkUpdate: (event: any) => void;
    protected yAxis: number;
    protected yAxis_options: number[];
    protected modTimeShiftMode: 'manual' | 'linkedClock';
    protected linkedClockId: string;
    protected modTimeShift: {
        value: number;
        unit: string;
    };
    protected downsampling: boolean;
    static defaultColor: string;
    constructor(args: any);
    protected setDefaultStyle(): void;
    protected beforeRemove(): void;
    protected onModelUpdated(): void;
    onDataLinkUpdated(event: any): void;
    clearDataset(): void;
    refresh(): Promise<any>;
    removeDatalink(dl: DataLink): void;
    protected watchXFormAlias(datalink: DataLink, trendData: TrendDataWgt, trendDataLink: DataLink): void;
    addDatalink(dl: IDataLinkConstructorArgs): DataLink;
    loadDatalinks(): void;
    updateChartData(trendData: any): void;
    getDataTransformFunction(): any;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getDataStyle(id: string): IDataStyle;
    getPropertyValue(prop: any): any;
    removeChild(childIndex: number): BaseWgt;
    private removeAllTrendDataWgt;
    serialize(): any;
    unload(): void;
}
export {};
