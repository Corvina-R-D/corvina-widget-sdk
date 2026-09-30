import { Value, DataLink } from '@/corvina-model';
import { ColorSchemeWgt } from "./ColorPaletteWgt";
import ColorGenerator from './ColorGenerator';
import CategoricalChartWgt from './CategoricalChartWgt';
import BaseDatasetWgt from "./BaseDatasetWgt";
declare enum ColorSchemeMode {
    COMMON = 0,
    CUSTOM = 1
}
export default class CategoricalDatasetWgt extends BaseDatasetWgt {
    parent: CategoricalChartWgt;
    private source;
    private sourceDataLink;
    private queryDataWgt;
    private sources;
    private datasetMode;
    private generator;
    private sourceTemplate;
    private labelTemplate;
    protected autoColors: boolean;
    protected colorSchemeMode: ColorSchemeMode;
    protected colorScheme: string;
    protected colors: Value<string[]>;
    colorGenerator: ColorGenerator;
    constructor(args: any);
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private setupModeStandard;
    private setupModeGenerator;
    protected updateColorsDatalink(): DataLink;
    protected createColorsDatalink(colorScheme: ColorSchemeWgt): DataLink;
    protected updateGeneratedDatasetColor(): void;
    getPropertyValue(prop: any): any;
    generateDatasets(): boolean;
    addDatalink(dl: any): DataLink;
    private updateSources;
    onDataLinkUpdated(event: any): void;
    serialize(): import("@/corvina-model").IWidgetSerialization;
}
export {};
