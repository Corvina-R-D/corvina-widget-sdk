import { DataValue } from "@/corvina-module";
import BaseGraphicWgt from "./BaseGraphicWgt";
export declare enum EXPORT_FORMAT {
    "CSV" = 0,
    "JSON" = 1
}
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
declare abstract class ChartWgt extends BaseGraphicWgt {
    fetchingData: number;
    setChartData(): void;
    updateChartData<T>(data: T, style?: {
        [rule: string]: string;
    }): void;
    notifyDataColor(color: string): void;
    getDataColor(): string;
    hasDataWgt(labelID: string): boolean;
    updateDatasets(): void;
    addAxis(axis: string): void;
    exportChartData(format: EXPORT_FORMAT): IExportTraceDataJSON | IExportTraceDataCSV;
}
export default ChartWgt;
