import ColorGenerator from './ColorGenerator';
import Value from "./Value";
import { PlatformFillDataGapsInDTO, PlatformPaddingDataInDTO } from "../interfaces/IPlatformController";
import QueryDataWgt from './QueryDataWgt';
import DatasetWgt from "./DatasetWgt";
import CategoricalDatasetWgt from "./CategoricalDataset";
import { BaseWgt } from "src/corvina-module";
import DataLink from "./DataLink";
import { ColorSchemeWgt } from "./ColorPaletteWgt";
import ChartWgt from "./ChartWgt";
import { IAlignmentTimeBaseSource } from "./DataSourceQueryWgt";
export declare enum DATASET_MODE {
    ANALYTIC = 0,
    SIMPLE = 1,
    DATA_DRILL = 2
}
export default class CategoricalChartWgt extends ChartWgt {
    fetchingData: number;
    startDate: Value<Date>;
    endDate: Value<Date>;
    refreshCount: number;
    colorGenerator: ColorGenerator;
    colorScheme: string;
    protected mode: DATASET_MODE;
    protected enableAlignment: boolean;
    protected algInterval: number;
    protected algUnit: string;
    protected algAggregation: string;
    protected algMissingValues: PlatformFillDataGapsInDTO;
    protected algPadding: PlatformPaddingDataInDTO;
    protected algSourceType: string;
    protected algSource: Value<IAlignmentTimeBaseSource>;
    protected algDataSource: IAlignmentTimeBaseSource;
    protected aggrOperator: string;
    protected aggrParams: {
        [name: string]: string | number;
    };
    protected aggrSumTimeValue: number;
    protected aggrSumTimeUnit: string;
    protected limit: number;
    protected refreshDB: Function;
    protected showlegend: boolean;
    private colors;
    constructor(args: any);
    setChartData(): void;
    protected refresh(): void;
    loadDefaultConfiguration(): void;
    protected updateParams(): void;
    datasetUpdated(): void;
    clearQueryDataWgt(): void;
    private formatAlignmentParams;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    updateChartData<QueryDataWgt>(data?: QueryDataWgt): void;
    protected addQueryDataWgt(state: any): QueryDataWgt;
    protected initColorSystem(): void;
    protected updateColorsDatalink(): DataLink;
    protected createColorsDatalink(colorScheme: ColorSchemeWgt): DataLink;
    protected updateDatasetColor(): void;
    getPropertyValue(prop: string): any;
    addDatalink(dl: any): DataLink;
    removeDatalink(dl: DataLink): void;
    addChild(child: BaseWgt): void;
    removeChild(childIndex: number): BaseWgt;
    protected generateDynamicDatasets(): boolean;
    protected isGenerator(dataset: CategoricalDatasetWgt | DatasetWgt): boolean;
    protected isGenerated(dataset: CategoricalDatasetWgt | DatasetWgt): boolean;
    serialize(): any;
}
