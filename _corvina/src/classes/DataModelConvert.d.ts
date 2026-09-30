import { PresetOutDTO, PresetObject, PresetIn, PresetNode } from '../interfaces/preset';
import { ModelOutDTO, ModelObject, ModelIn } from '../interfaces/model';
export type TreeviewModelNode = PresetNode & {
    name: string;
    parentNode?: TreeviewModelNode;
    instanceOf?: string;
    children?: TreeviewModelNode[];
    isEditable?: boolean;
    isExistingModel?: boolean;
    isExistingModelProperty?: boolean;
    type?: string;
    uiUUID?: string;
};
export interface ModelNodeMetadata {
    label?: string;
    description?: string;
    tags?: string[];
    unit?: string;
}
export default class DataModelConvert {
    static convertDataToJsonObject(models: ModelIn[]): ModelIn[];
    static convertDataPresetToJsonObject(presets: PresetIn[]): PresetIn[];
    static convertJsonObjectToData(instanceOf: any, jsonObj: ModelObject): ModelOutDTO;
    static convertJsonObjectToDataPreset(jsonObj: PresetObject, name: string): PresetOutDTO;
    static getModelName(model: ModelObject): string;
    static getModelVersion(model: ModelObject): string;
    static getLastVersion(versions: string[]): string;
    static getSortedVersion(versions: string[]): string[];
    static formatTreeviewModel(model: PresetNode, isExistingModel?: boolean, isEditable?: boolean, parentNode?: any): TreeviewModelNode;
    static setObjectNodeField(item: any, model: any, treeviewModel: any): void;
    static deleteObjectNodeField(item: any): void;
    static formatCorvinaModel(treeviewModel: any): any;
    static formatCorvinaMapping(treeviewMapping: any): any;
    static presetExtraFields: Set<string>;
    static convertPresetsToModels(presets: PresetIn[]): ModelIn[];
    static versionLessThan(lhs: string, rhs: string): boolean;
}
export declare const isSubmodelEditable: (nodes: TreeviewModelNode[]) => boolean;
