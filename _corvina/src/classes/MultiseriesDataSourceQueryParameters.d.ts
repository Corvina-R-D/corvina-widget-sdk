import Value from "./Value";
import DataSourceQueryWgt, { IAlignmentSource, IQueryFunctions } from "./DataSourceQueryWgt";
import { PlatformFillDataGapsInDTO, PlatformPaddingDataInDTO, AggregationMode } from "@/interfaces/IPlatformController";
import BaseWgt from "./BaseWgt";
import BaseDatasourceQueryParameter from "./BaseDatasourceQueryParameter";
interface IAggregation {
    operator: string;
    deltaCounterMode?: "reset" | "overflow";
    deltaCounterRange?: {
        min: number;
        max: number;
    };
    deltaCounterOscillationThreshold?: number;
    deltaSkipFalsePositiveOverflow?: number;
    deltaCounterNullAsZero?: boolean;
    countSkipNull?: boolean;
    averageSkipNull?: boolean;
    sumTimeValue?: number;
    sumTimeUnit?: string;
}
interface IAlignmentAggregation extends IAggregation {
    deviceId: string;
    modelPath: string;
    operator: string;
}
interface IFunction {
    name: string;
    function: string;
    algAggregations: Array<IAlignmentAggregation>;
    outputAggregation: IAggregation;
}
export default class MultiseriesDatasourceQueryParameters extends BaseDatasourceQueryParameter {
    algEnabled: boolean;
    algInterval: number;
    algExtent: number;
    algUnit: string;
    algMissingValues: PlatformFillDataGapsInDTO;
    algPadding: PlatformPaddingDataInDTO;
    algSourceType: string;
    algSource: Value<any>;
    algDataSource: {
        modelPath: string;
        deviceId: string;
    };
    aggrMode: AggregationMode;
    aggrInterval: number;
    aggrUnit: string;
    aggrExtent: number;
    functions: Array<IFunction>;
    aggrParams: {
        [name: string]: string | number | boolean | object;
    };
    filterConditions: string;
    filterBeforeAlignment: string;
    widget: BaseWgt;
    data: DataSourceQueryWgt;
    constructor(args: any, dataWgt: DataSourceQueryWgt);
    hasParameter(name: string): boolean;
    formatAlignmentParams(): {
        sampling: {
            size: number;
            unit: string;
            extent: number;
        };
        aggregation: string;
        missingValues: {
            fillPolicy: PlatformFillDataGapsInDTO;
            paddingPolicy: PlatformPaddingDataInDTO;
        };
        source: {
            modelPath: string;
            deviceId: string;
        };
    };
    getDefaultAlignmentParams(opertator?: string): any;
    setDefaultAlignmentParams(): void;
    formatAggregationParams(): {
        mode: AggregationMode;
        size: number;
        unit: string;
        extent: number;
    };
    private _formatEmptyFunctions;
    private _updateSource;
    private _updateAllSources;
    private _updateSources;
    private _formatAggregation;
    private _formatSource;
    formatSources(): Array<IAlignmentSource>;
    formatFunctions(): IQueryFunctions;
    private _updateAlignmentFromFormula;
    private applyDeltaCounterSideEffects;
    private _updateFunctions;
    private createUniqueNameGenerator;
    private _populateEmptyFunctions;
    setPropertyValue({ prop, value }: {
        prop: string;
        value: any;
    }): void;
    getPropertyValue(prop: string): any;
    static get(instance: MultiseriesDatasourceQueryParameters, property: string): any;
    serialize(): any;
    private _updateRequest;
    private _assign;
}
export {};
