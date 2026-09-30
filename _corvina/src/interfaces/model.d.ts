import { TypedObject } from './utils';
import { PresetBasic, PresetNode } from './preset';
export type ModelInterfaceCreatable = ModelRoot;
export type ModelNode = ModelBasic | ModelArray | ModelInterfaceCreatable;
export type ModelBasicType = 'integer' | 'boolean' | 'double' | 'string' | 'bytestring' | 'binaryblob' | 'integerarray' | 'doublearray' | 'booleanarray';
export type ModelObjectType = 'object';
export type ModelArrayType = 'array';
export type ModelStructType = 'struct';
export type ModelType = ModelBasicType | ModelObjectType | ModelArrayType | ModelStructType;
export declare function isComplexType<O extends (ModelNode | PresetNode)>(model: ModelNode | PresetNode, value: string): model is O;
export declare function isModelBasicType(model: ModelNode): model is ModelBasic;
export declare function isPresetBasicType(model: PresetNode): model is PresetBasic;
export interface ModelCommonMetadata {
    version?: string;
    label?: string;
    description?: string;
    unit?: string;
    tags?: string[];
    path?: string;
    model?: string;
}
export interface ModelObject extends ModelCommonMetadata {
    type: ModelObjectType;
    instanceOf: string;
    properties: TypedObject<ModelNode>;
    UUID?: string;
}
export interface ModelArray extends ModelCommonMetadata {
    type: ModelArrayType;
    length: number;
    item: ModelObject;
}
export interface ModelBasic extends ModelCommonMetadata {
    type: ModelBasicType;
}
export interface ModelStruct extends ModelCommonMetadata {
    type: ModelStructType;
    instanceOf: string;
    properties: TypedObject<ModelBasic>;
}
export interface ModelOutDTO {
    name: string;
    data: ModelRoot;
}
export interface ValidateModelOutDTO {
    modelId: string;
    data: ModelRoot;
}
export interface ModelIn {
    id: string;
    name: string;
    orgResourceId?: string;
    version?: string;
    json: ModelRoot;
    subOrgsEnabledToView?: boolean;
}
export interface ISearchModelResult extends ModelsPagination {
    data: ModelObject[];
}
export interface ModelsPagination {
    last: Boolean;
    number: String;
    totalElements: Number;
    totalPages: Number;
}
export interface ModelInDTO extends ModelsPagination {
    data: ModelIn[];
}
export interface DraftModelObject {
    [key: string]: ModelObject;
}
export interface ModelVersion {
    [key: string]: string;
}
export type ModelRoot = ModelObject | ModelStruct;
export declare const iconForType: {
    device: string;
    boolean: string;
    double: string;
    integer: string;
    string: string;
    object: string;
    struct: string;
    booleanarray: string;
    doublearray: string;
    integerarray: string;
    binaryblob: string;
    Slot: string;
};
interface DeviceMetadataPropertiesObject {
    [key: string]: {
        type: string;
        fnMap?: (d: any) => any;
        defaultValue?: any;
        properties?: any;
        label?: string;
    };
}
export declare const metadataPathElement = "$device";
export declare const deviceSlotMetadataProperties: DeviceMetadataPropertiesObject;
export {};
