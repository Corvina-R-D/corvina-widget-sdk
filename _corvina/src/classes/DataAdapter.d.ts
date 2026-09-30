import { BaseObject } from "src/interfaces/Widgets";
export type DataTransformFunction = (params: {
    x: any[];
    y: any[];
}) => {
    x: any[];
    y: any[];
};
export default class DataAdapter<DataSeries extends BaseObject, DataFormat extends {
    name: string;
}> {
    protected datasetMap: Map<DataSeries, DataFormat>;
    protected chartData: Array<DataFormat>;
    protected unique: boolean;
    protected uniqueDatasetMap: Map<string, {
        series: DataSeries;
        data: DataFormat;
        style: any;
    }>;
    protected chart: any;
    constructor(chart?: any);
    appendSerie(source: DataSeries, style?: any): void;
    removeSerie(source: DataSeries): void;
    updateChartData(serie: DataSeries, style?: any): void;
    getSerie(): DataSeries[];
    getData(): Array<DataFormat>;
    clearData(): void;
    keepUniqueLabels(status: boolean): void;
    protected getDataTemplate(): DataFormat;
    protected fillChartData(source: DataSeries, targetData: DataFormat, style?: any): void;
    protected normalizeUniqueCurveNames(): void;
}
