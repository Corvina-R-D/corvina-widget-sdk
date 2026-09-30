import { DataValue } from '@/corvina-module';
import { BaseWgt, xForm } from '@/corvina-model';
import Value from './Value';
import { IXFormSerialization } from './xForm';
import { DatalinkPermission } from '@/interfaces/datalink';
interface IFetchHistoricalDataArgs {
    from: number;
    to: number;
    maxSamples?: number;
    aggregation?: any;
    downsampling?: {
        size: number;
    };
    filters?: {
        filterRawData: string;
    };
}
export default class DataLink {
    id: string;
    sourceId: string | Value<string>;
    targetId: string;
    srcProp: string;
    tgtProp: string;
    permission: DatalinkPermission;
    xForm: any;
    watcherStoppers: Array<Function>;
    linkToModel: boolean;
    alias: boolean;
    weak: boolean;
    tagIndex: number;
    private srcPropType;
    private _expression;
    private status;
    private parameters;
    static RegExpParameter: RegExp;
    constructor(args: IDataLinkConstructorArgs);
    get expression(): string;
    set expression(value: string);
    get expressionExtended(): string;
    get sourcePropertyType(): string;
    set sourcePropertyType(value: string);
    private deconstructArray;
    private reconstructArray;
    private sourcePropertyIsArray;
    setAlias(value: boolean): void;
    isAlias(): boolean;
    serialize(): IDataLinkConstructorArgs;
    init(): boolean;
    private run;
    stop(): void;
    getDatalinkWithDuplicateTarget(): DataLink;
    refreshValue(): void;
    private resolveVariable;
    private initXForm;
    addXForm(xForm: any): void;
    removeXForms(): void;
    private generateExpression;
    private setSourcefromExpression;
    private updateSource;
    private replaceParameters;
    private watchParameters;
    private getSourceFromExpression;
    private initializeWatchers;
    getSourceId(): string;
    getDataSourceWidget(): BaseWgt | xForm;
    getTargetWidget(): BaseWgt | xForm;
    private watchModel;
    private watch;
    getClockCongfiguration(): import("../interfaces/dashboard").IClockConfiguration;
    fetchHistoricalData({ from, to, maxSamples, aggregation, downsampling, filters }: IFetchHistoricalDataArgs): Promise<DataValue[]>;
    static clockIdToName(id: string): string;
    static clockNameToId(name: string): string;
    static idToName(expression: string): string;
    static nameToId(expression: string): string;
    static parseSource(expression: string): {
        prop: string;
        id: string;
    };
    getSourcePropertyInfo(): import("@/corvina-model").DeviceSlot | import("./utils/ModelUtility").DataModelDeviceSlot | import("./utils/ModelUtility").PropertyMetaInfo;
    getXForm(): any;
    setPermission(permission: 'readonly' | 'read/write' | 'write'): void;
}
export interface IDataLinkConstructorArgs {
    id?: string;
    sourceId?: string;
    targetId?: string;
    srcProp?: string;
    tgtProp: string;
    expression?: string;
    permission?: DatalinkPermission;
    xForm?: IXFormSerialization;
    linkToModel?: boolean;
    tagIndex?: number;
    alias?: boolean;
    weak?: boolean;
}
export {};
