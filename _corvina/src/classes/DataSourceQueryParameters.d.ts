import Value from "./Value";
import DataSourceQueryWgt from "./DataSourceQueryWgt";
import { PlatformFillDataGapsInDTO, PlatformPaddingDataInDTO, AggregationMode } from "@/interfaces/IPlatformController";
import BaseWgt from "./BaseWgt";
import BaseDatasourceQueryParameter from "./BaseDatasourceQueryParameter";
export default class DataSourceQueryParameters extends BaseDatasourceQueryParameter {
    algEnabled: boolean;
    algInterval: number;
    algExtent: number;
    algUnit: string;
    algAggregation: string;
    algMissingValues: PlatformFillDataGapsInDTO;
    algPadding: PlatformPaddingDataInDTO;
    algSourceType: string;
    algSource: Value<any>;
    algDataSource: {
        modelPath: string;
        deviceId: string;
    };
    aggrMode: AggregationMode;
    aggrOperator: string;
    aggrInterval: number;
    aggrUnit: string;
    aggrExtent: number;
    aggrParams: {
        [name: string]: string | number | boolean | object;
    };
    aggrSumTimeValue: number;
    aggrSumTimeUnit: string;
    aggrDeltaCounterMaxValue: number;
    aggrDeltaCounterNullAsZero: boolean;
    aggrDeltaSkipFalsePositiveOverflow: number;
    aggrCountSkipNull: boolean;
    aggrAverageSkipNull: boolean;
    aggrDeltaCounterMode: "reset" | "overflow";
    aggrDeltaCounterOscillationThreshold: number;
    aggrDeltaCounterRange: {
        min: number;
        max: number;
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
    getDefaultAlignmentParams(): {
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
    };
    setDefaultAlignmentParams(): void;
    formatAggregationParams(): {
        mode: AggregationMode;
        size: number;
        unit: string;
        extent: number;
    };
    setPropertyValue({ prop, value }: {
        prop: string;
        value: any;
    }): void;
    getPropertyValue(prop: string): any;
    static get(instance: DataSourceQueryParameters, property: string): any;
    serialize(): any;
    private updateRequest;
    private _assign;
    protected updateAggregationParams(): {
        [name: string]: string | number | boolean | object;
    };
}
