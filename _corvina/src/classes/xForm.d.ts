import { BaseWgt, DataValue, IDataLinkConstructorArgs, IWgtConstructorParams, IWidgetSerialization } from '@/corvina-model';
import { DataLinkFunction, DataLinkFunctionType, IDatalinkFunctionSerialization } from "./DataLinkFunction";
export interface IXFormSerialization extends IWidgetSerialization {
    function: IDatalinkFunctionSerialization;
    datalinks?: Record<string, IDataLinkConstructorArgs>;
}
export declare function assertXForm(wgt: any): asserts wgt is xForm;
/**
 * This class provides a transformation function to apply to a datalink.
 *
 * Datalinks calls xForms either directly, by calling .apply() (reading) and .inverse() (writing)
 * on the function provided by the xForm (for DataLinkFunctionType=SIMPLE ), or indirectly by
 * subscribing to the result of the xForm (when DataLinkFunctionType=DATASOURCE)
 * as the new datasource. In the latter case the xForm will internally create datalinks
 * to the actual sources.
 */
export default class xForm extends BaseWgt {
    result: any;
    inversePermission: "readonly" | "read/write";
    function: DataLinkFunction;
    mapResolvedSelectors: Map<string, string>;
    constructor(args: IWgtConstructorParams<IXFormSerialization>);
    private createFormula;
    getFunctionType(): DataLinkFunctionType;
    getFunction(): DataLinkFunction;
    serialize(): IXFormSerialization;
    init(): void;
    stopDatalinks(): void;
    addDatalink({ sourceId, srcProp, tgtProp, targetId, permission, weak }: {
        sourceId: any;
        srcProp: any;
        tgtProp: any;
        targetId: any;
        permission: any;
        weak: any;
    }): import("@/corvina-model").DataLink;
    getPropertyValue(prop: any): any;
    getWatchProperty(prop: string): any;
    private writeInverse;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private unmountSelectorDependencies;
    subscribeTag(tag: string): {
        counter: number;
    };
    /**
     * If a formula selector is dynamic for example $("model/"+$("variable:vars"))+$("model/Tag2")
     * references to formula variables can change. This function keeps them updated.
     */
    updateFormulaVariableReference(): void;
    removeDatalink(dl: any): void;
    unmountLinks(): void;
    updateResult(): any;
    readHistData(prop: string, from: number, to: number, nSamples: number, downsample?: boolean, aggregation?: any, downsampling?: {
        size: number;
    }, _filterCondition?: string, filters?: {
        filterRawData: string;
    }): Promise<Array<DataValue> | DataValue>;
    apply(value?: any): any;
    inverse(value?: any): any;
    hasVariable(variable: string): boolean;
    hasInverse(): boolean;
    getInverse(): string;
    getInverseSelectorVariable(): string;
    getInverseSelector(): string;
    setInversePermission(permission: "readonly" | "read/write"): void;
    private getModel;
    private validateModel;
    private addFormulaToDataModel;
    private isDataTypeFormula;
}
