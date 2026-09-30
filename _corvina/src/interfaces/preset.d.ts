import { TypedObject } from './utils';
import { ModelBasic, ModelObject, ModelArray, ModelStruct } from '../interfaces/model';
export type PresetModeType = 'R' | 'RW';
export type PresetInterfaceCreatable = PresetObject | PresetStruct;
export type PresetNode = PresetBasic | PresetArray | PresetInterfaceCreatable;
export type PresetTagType = 'tag' | 'formula';
export type PresetAggregationMode = 'SCALAR' | 'MOVING' | 'DISABLED';
export type PresetMissingValuesFillPolicy = 'LINEAR_INTERPOLATION' | 'EXTEND_LAST_VALUE' | 'NEXT_VALUE' | 'CURRENT_VALUE';
export type PresetMissingValuesPaddingPolicy = 'SEARCH' | 'NULL' | 'ZERO';
export interface PresetSourceItem {
    deviceId: string;
    modelPath: string;
    tagName?: string;
}
export interface PresetModelPath {
    modelName: string;
    modelVersion: string;
}
export interface PresetHistoryPolicy {
    enabled: boolean;
    limit?: string;
    compressionStrategy?: string;
}
export interface PresetAdditionalInfo {
    UUID?: string;
    mode?: PresetModeType;
    historyPolicy?: PresetHistoryPolicy;
    sendPolicy?: PresetSendPolicy;
    datalink?: PresetDatalink;
}
export interface PresetFormulaFunction {
    map: string;
    reduce?: {
        operator: string;
        param?: any;
    };
}
export interface PlatformQueryDataInDTO {
    alignment: {
        source?: string;
        sampling: {
            size: number;
            unit: string;
            extent: number;
        };
        aggregation: string;
        missingValues: {
            fillPolicy: PresetMissingValuesFillPolicy;
            paddingPolicy: PresetMissingValuesPaddingPolicy;
        };
    };
    aggregation: {
        mode?: PresetAggregationMode;
        size?: number;
        unit?: string;
        extent?: number;
    };
    functions?: {
        formula: PresetFormulaFunction;
    };
}
export interface PresetSendPolicy extends TypedObject<any> {
}
export interface PresetDatalink {
    source: string | PlatformQueryDataInDTO;
    type: PresetTagType;
}
export interface PresetObject extends ModelObject, PresetAdditionalInfo {
    properties: TypedObject<PresetNode>;
    deprecated?: boolean;
}
export interface PresetArray extends ModelArray, PresetAdditionalInfo {
    item: PresetObject;
    deprecated?: boolean;
}
export interface PresetBasic extends ModelBasic, PresetAdditionalInfo {
    deprecated?: boolean;
}
export interface PresetStruct extends ModelStruct, PresetAdditionalInfo {
    properties: TypedObject<PresetBasic>;
    deprecated?: boolean;
}
export interface PresetOutDTO {
    name: string;
    data: PresetObject | PresetStruct;
}
export interface PresetIn {
    id: string;
    name: string;
    orgResourceId?: string;
    json: PresetObject | PresetStruct;
}
export interface PresetsInDTO extends PresetsPagination {
    data: PresetIn[];
}
export interface PresetInDTO {
    value: PresetIn;
}
export interface PresetsPagination {
    last: Boolean;
    number: String;
    totalElements: Number;
    totalPages: Number;
}
export interface DraftPresetObject {
    [key: string]: PresetObject;
}
export interface EditedPreset {
    preset: PresetObject;
    name: string;
}
/** Mappings */
export interface PresetMappingData {
    device_endpoint: string;
}
export interface PresetMappingObject extends PresetObject {
    mapping?: PresetMappingData;
}
export interface PresetMappingStruct extends PresetStruct {
    mapping?: PresetMappingData;
}
export interface PresetMappingBasic extends PresetBasic {
    mapping?: PresetMappingData;
}
export interface PresetMappingArray extends PresetArray {
    mapping?: PresetMappingData;
}
export type PresetMappingNode = PresetMappingBasic | PresetMappingArray | PresetMappingObject | PresetMappingStruct;
export interface DeviceConfig {
    type: 'datamodel';
    properties: TypedObject<PresetMappingNode>;
}
export interface ModelMarker {
    startLineNumber: Number;
    startColumn: Number;
    endLineNumber: Number;
    endColumn: Number;
    message: String;
    severity?: any;
}
export declare function PresetSourceItem(source: string): PresetSourceItem;
export declare function PresetModelPath(model: string): PresetModelPath;
export declare function buildPresetModelPath(deviceId: string, modelName: string, modelVersion: string, tagName: string, decorators?: boolean): string;
export interface ITagInterface {
    name: string;
    type: string;
    originalName?: string;
}
