import BaseWgt from "../BaseWgt";
export interface PropertyMetaInfo {
    type: string;
    version: string;
    label?: string;
    description?: string;
    unit?: string;
}
export interface DataModelDeviceSlot {
    [propertyName: string]: PropertyMetaInfo & {
        properties?: DataModelDeviceSlot;
    };
}
export type DataModelDeviceSlotProperty = PropertyMetaInfo & {
    properties?: DataModelDeviceSlot;
};
export interface IPropertyInfo {
    modelPath: string;
    formula?: string;
}
export declare function visitNodesFromTagName({ tree, tagName, notFoundCallback, nodeCallback, finalNodeCallback }: {
    tree: DataModelDeviceSlot;
    tagName: string;
    notFoundCallback?: () => void;
    nodeCallback?: (node: DataModelDeviceSlot, name: string) => void;
    finalNodeCallback?: (node: DataModelDeviceSlot, name: string) => void;
}): void;
export declare function tagPathToPropertyPath(tagName: string, property: string): string;
export declare function waitForPromises(promises: Promise<Promise<void>[]>[]): Promise<void>;
export default class ModelUtility {
    private static getPropertyType;
    private static filterByPropertyName;
    private static filterByPropertyType;
    private static applyDatalinkFactoryFilter;
    static applyDatalinkFactoryPolicy(factory: Array<{
        type: string;
        properties: string[];
        policy?: string;
    }>, widget: BaseWgt): void;
    static applyFiltersToWidgetModel(widget: any, model: any, links: any, filters: any): Promise<Promise<void>[]>[];
    static runDataLinkFactory(factory: Array<{
        type: string;
        properties: string[];
        policy?: string;
    }>, widget: BaseWgt, models: Object | Array<IPropertyInfo>, save?: boolean, matches?: RegExp[]): Promise<Promise<void>[]>;
    static getFullModelPath(model: any, name?: string, path?: string): string;
    static listTagsFromModel(models: any): IPropertyInfo[];
    static listTagInfoFromModel(models: any, addRoot?: boolean, level?: number): Array<[string, PropertyMetaInfo]>;
    static commonTagPrefix(list: string[]): string;
    static getTagPropertyChain(tagName: string, property: string): string;
}
