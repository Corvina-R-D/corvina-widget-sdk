import DataAdapter, { DataTransformFunction } from "./DataAdapter";
import { IChartData } from "@/interfaces/plotly";
import { BaseObject } from "src/interfaces/Widgets";
export interface StubIChartData extends IChartData {
    isLeaf?: boolean[];
}
export default class StubDataAdapterBar<DataSerie extends BaseObject> extends DataAdapter<DataSerie, StubIChartData> {
    protected __mokValues(partialPreSet: object): {
        x: string[];
        y: number[];
        isLeaf: boolean[];
    };
    protected __mokPropValue(obj: any, i: any): number;
    protected __findProperty(path: string[], stupPreSet: any): any;
    protected __isLeaf(obj: object): boolean;
    protected __mokData(totalPath: string, stupPreSet: object): {
        x: string[];
        y: number[];
        isLeaf: boolean[];
    };
    protected __removeSlotName(str: string): string | false;
    protected fillChartData(source: DataSerie, targetData: StubIChartData, style?: any, transformations?: DataTransformFunction[]): void;
    protected getDataTemplate(): StubIChartData;
    private extractStyle;
    protected normalizeUniqueCurveNames(): void;
}
