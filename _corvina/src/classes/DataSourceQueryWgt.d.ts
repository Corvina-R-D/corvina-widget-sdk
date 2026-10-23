import { DataValue } from '../communication/axios/model/devicedata';
import BaseWgt from "./BaseWgt";
import { IWgtConstructorParams, IWidgetSerialization } from 'src/corvina-module';
import { PlatformQueryDataDTO } from "../interfaces/IPlatformController";
import DatasourceWgt from "@/classes/DatasourceWgt";
export declare enum QueryMode {
    STANDARD = 0,
    SCHEDULED = 1
}
export interface IAlignmentTimeBaseSource {
    modelPath: string;
    deviceId?: string;
}
export interface IAlignmentSource {
    deviceId?: string;
    modelPath: string;
    alignment?: {
        operator: string;
        params?: {
            [name: string]: number | string;
        };
    };
}
export interface IQueryFunction {
    map: string;
    reduce?: {
        operator: string;
        params?: {
            [name: string]: number | string;
        };
    };
}
export interface IQueryFunctions {
    [name: string]: IQueryFunction;
}
export default class DataSourceQueryWgt extends BaseWgt {
    timestamps: number[];
    values: any[];
    enabled: boolean;
    parent: DatasourceWgt;
    private scheduler;
    private mode;
    private alignment;
    private operator;
    private operatorParams;
    private sources;
    private aggregation;
    private functions;
    private parameters;
    private extendedParameters;
    private clockId;
    constructor(args: IWgtConstructorParams<IWidgetSerialization>);
    refresh(pStart?: number, pEnd?: number): Promise<void>;
    getClockId(): string;
    private getStartDate;
    private getEndDate;
    private initMode;
    private getData;
    fetchData(pStart?: number, pEnd?: number, limitRawData?: number, limitAggregatedData?: number): Promise<{
        data: DataValue[];
        timestamps: number[];
        values: any[];
    }>;
    private getSimpleData;
    private getDataScheduled;
    private updateQuery;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getPropertyValue(property: string): any;
    clearTrendData(): void;
    private getDataLimit;
    private getAggregationDataLimit;
    private createQuery;
    /**
     * The sources of the query as platform-api receives them. [] when platform-api takes them from the maps (the
     * sources are not sent); undefined when the query cannot be built, e.g. a tag without configuration.
     */
    serverQuerySources(): Array<{
        deviceId?: string | null;
        modelPath?: string | null;
    }> | undefined;
    getQueryDefinition(): {
        method: string;
        url: string;
        data: PlatformQueryDataDTO;
    } | undefined;
    private fetchFormula;
    private fetchTag;
    private getAggregation;
    private getFilterCondition;
    private getFilterBeforeAlignment;
    private formatError;
    private emit;
    serialize(): IWidgetSerialization;
}
