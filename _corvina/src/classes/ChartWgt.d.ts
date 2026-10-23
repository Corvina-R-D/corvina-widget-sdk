import { DataValue } from "@/corvina-module";
import BaseGraphicWgt from "./BaseGraphicWgt";
import type BaseWgt from "./BaseWgt";
export declare enum EXPORT_FORMAT {
    "CSV" = 0,
    "JSON" = 1
}
export type ExportDateFormat = string;
export interface IExportTraceDataOptions {
    downsampling: boolean;
}
export interface IExportTraceDataJSON {
    json: {
        label: string;
        options: IExportTraceDataOptions;
        data: DataValue[];
    }[];
}
export interface IExportTraceDataCSV {
    csv: string;
}
declare class ChartWgt extends BaseGraphicWgt {
    fetchingData: number;
    exportDateFormat: ExportDateFormat;
    exportValueFormat: string;
    constructor(args: any);
    setChartData(): void;
    updateChartData<T>(data: T, style?: {
        [rule: string]: string;
    }): void;
    notifyDataColor(color: string): void;
    getDataColor(): string;
    hasDataWgt(labelID: string, exclude?: BaseWgt): boolean;
    updateDatasets(): void;
    addAxis(axis: string): void;
    protected createExportTimestampFormatter(format: string): (ts: number) => string;
    protected createExportValueFormatter(format: string): (value: any) => number | string | boolean;
    protected escapeCsvField(value: unknown): string;
    protected buildCsvRow(fields: unknown[]): string;
    exportChartData(format: EXPORT_FORMAT): IExportTraceDataJSON | IExportTraceDataCSV;
    serialize(): any;
}
export default ChartWgt;
