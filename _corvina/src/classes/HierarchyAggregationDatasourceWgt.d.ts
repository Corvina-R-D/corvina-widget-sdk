import { Value, BaseDatasourceWgt, IWidgetSerialization, IDataLinkConstructorArgs, DataLink } from '@/corvina-model';
import { PlatformFillDataGapsInDTO, PlatformPaddingDataInDTO } from '@/interfaces/IPlatformController';
export interface IAggregation {
    alignment: {
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
    params?: {
        [key: string]: any;
    };
    filters?: {
        beforeAlignment: {
            condition: string;
        };
    };
}
export default class HierarchyAggregationDatasourceWgt extends BaseDatasourceWgt {
    root: Value<object>;
    model: Value<Array<{
        id: string;
        value: string;
        config: IAggregation;
    }>>;
    path: Value<string>;
    fetchMaps: {
        [path: string]: any;
    };
    queries: {
        [path: string]: {
            [property: string]: any;
        };
    };
    nextPaths: {
        [path: string]: {
            isLeaf: boolean;
        };
    };
    constructor(args: any);
    addDatalink(args: IDataLinkConstructorArgs, options?: any): DataLink;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private getFlatPropertyValue;
    private setFlatPropertyValue;
    private getModelConfigProperty;
    private setModelConfigProperty;
    getPropertyValue(prop: string): any;
    private aggregateCommonPath;
    addTagConfiguration(): void;
    private generateQueryConfiguration;
    prepareFetchParameters(): Promise<void>;
    private parseFetchResult;
    fetchData(from: Date, to: Date, property: string): Promise<{
        property: string;
        data: {};
    }>;
    private generateMapFromula;
    private applyAggregation;
    calculateFetchMaps(path: string, properties: any): void;
    filterByModelProperties(listPropertyPaths: string[], properties: string[]): {};
    private prepareDeltaCounterParams;
    private getModelPropertyAggreation;
    private getModelPropertyAlignment;
    private getModelPropertyFilters;
    generateDefaultConfiguration(aggregation: string): IAggregation;
    private getModelProperties;
    getDataModel(property: string): any;
    serialize(): IWidgetSerialization;
}
