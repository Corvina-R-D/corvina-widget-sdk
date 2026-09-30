import { VuexModule } from 'vuex-module-decorators';
import { DeviceIn } from '@/interfaces/device';
import { TreeviewModelNode } from '@/classes/DataModelConvert';
import { PlatformQueryDataInDTO, PresetTagType, PresetIn, PresetOutDTO, ModelMarker, PresetAdditionalInfo, PresetObject } from '@/interfaces/preset';
import { RawTag, SanitizedTag } from '@/utils/ModelPresetUtils';
export interface PresetSearchFilter {
    search?: string;
    page?: number;
    pageSize?: number;
    append?: boolean;
    modelId?: string;
}
export default class PresetStore extends VuexModule {
    newPreset: {
        type: string;
        instanceOf: string;
        properties: {};
    };
    newPresetName: string;
    properties: any;
    tagPropertiesDragAndDrop: {
        tag: {
            name: string;
            type: string;
        };
        droppedTags: {};
    };
    selectedNodes: TreeviewModelNode[];
    selectedNode: TreeviewModelNode;
    presets: any[];
    presetsPagination: {};
    draftPresets: {};
    clonePresetList: {
        data: any[];
        pagination: {};
    };
    isLoadingProperties: boolean;
    selectedDevice: DeviceIn;
    treeviewPreset: PresetObject;
    tagType: PresetTagType;
    formula: PlatformQueryDataInDTO;
    multiEditedPropertiesList: Set<string>;
    get getPreset(): {
        type: string;
        instanceOf: string;
        properties: {};
    };
    get getPresets(): any[];
    get getClonePresetList(): {
        data: any[];
        pagination: {};
    };
    get getProperties(): TreeviewModelNode;
    get getNewPresetName(): string;
    get getDraftPresets(): {};
    get getPresetsPagination(): {};
    get getTagPropertiesDragAndDrop(): {
        tag: {
            name: string;
            type: string;
        };
        droppedTags: {};
    };
    get getSelectedNodes(): TreeviewModelNode[];
    get getSelectedNode(): TreeviewModelNode;
    get getIsLoadingProperties(): boolean;
    get getSelectedDevice(): DeviceIn;
    get getTreeviewPreset(): PresetObject;
    get getTagType(): PresetTagType;
    get getMultiEditedPropertiesList(): Set<string>;
    SAVE_PRESETS(presets: any): void;
    SAVE_APPEND_PRESETS(presets: PresetIn[]): void;
    SAVE_CLONE_PRESET_LIST(presets: any): void;
    SAVE_APPEND_CLONE_PRESET_LIST(presets: PresetIn[]): void;
    LOAD_PROPERTIES(properties: any): void;
    RESET_PROPERTIES(): void;
    SAVE_PRESET(preset: any): void;
    SAVE_PRESET_PROPERTIES({ path, key, value }: {
        path: any;
        key: any;
        value: any;
    }): void;
    SAVE_PRESET_TAG({ path, key, value }: {
        path: any;
        key: any;
        value: any;
    }): void;
    SET_NEW_PRESET_NAME(name: string): void;
    RESET_PRESET(): void;
    SAVE_DRAFT_PRESETS(presets: any): void;
    SAVE_PRESETS_PAGINATION(presetsPagination: any): void;
    SET_TAG_IN_DRAG_AND_DROP(tag: any): void;
    SET_DROPPED_TAG(tag: string): void;
    RESET_DROPPED_TAG(): void;
    ADD_NODE_TO_SELECTED_NODES(node: TreeviewModelNode): void;
    REMOVE_NODE_FROM_SELECTED_NODES({ node, nodeIndex }: {
        node: any;
        nodeIndex: any;
    }): void;
    RESET_SELECTED_NODES(): void;
    SAVE_CLONE_PRESET_LIST_PAGINATION(presetsPagination: any): void;
    SET_SELECTED_NODE(node: any): void;
    SET_SELECTED_NODES(nodes: []): void;
    SET_IS_LOADING_PROPERTIES(value: any): void;
    SET_SELECTED_DEVICE(device: any): void;
    SAVE_TREEVIEW_PRESET(preset: PresetObject): void;
    SAVE_SELECTED_NODES(nodes: any): void;
    SET_TAG_TYPE(tagType: PresetTagType): void;
    ADD_MULTI_EDITED_PROP(name: string): void;
    REMOVE_MULTI_EDITED_PROP(name: string): void;
    CLEAR_MULTI_EDITED_PROPS(): void;
    fetchPresets(filter?: PresetSearchFilter): Promise<import("@/interfaces/preset").PresetsInDTO>;
    fetchPreset(filter?: {
        presetId: string;
    }): Promise<import("@/interfaces/preset").PresetInDTO>;
    fetchPresetsList(filter?: PresetSearchFilter): Promise<PresetIn[]>;
    appendPreset(preset: any): void;
    fetchDuplicatedPreset(filter?: {
        modelId: string;
        presetName: string;
    }): Promise<boolean>;
    fetchClonePresetList(filter?: PresetSearchFilter): Promise<PresetIn[]>;
    savePresets(presets: any): void;
    loadProperties(properties: any): void;
    loadDatalinkProperty(properties: any): void;
    resetProperties(): void;
    savePreset(preset: any): void;
    savePresetProperties({ path, key, value }: {
        path: PresetAdditionalInfo;
        key: string;
        value: any;
    }): void;
    savePresetTag({ path, key, value }: {
        path: PresetAdditionalInfo | TreeviewModelNode;
        key: string;
        value: any;
    }): void;
    savePresetToFetch(preset: PresetOutDTO): Promise<void>;
    savePresetToFetchAsync(preset: PresetOutDTO): Promise<void>;
    getPresetProgress(jobid: string): Promise<import("@/interfaces/preset").PresetsInDTO>;
    setNewPresetName(name: any): void;
    resetPreset(): void;
    fetchDraftPresets(): void;
    insertSendPolicy(sendPolicyValues: any): Promise<void>;
    formatSendPolicyOnChange(sendPolicyValues: any): Promise<{
        type: any;
        level: number;
        levelString: any;
        mode: any;
        minIntervalMs: number;
        skipFirstNChanges: number;
        tagName: any;
        changeMask: string;
        deadband: number;
        deadbandPercent: number;
    }[]>;
    formatSendPolicyOnFieldChange(sendPolicyValues: any): Promise<{
        type: any;
        level: number;
        levelString: any;
        mode: any;
        minIntervalMs: number;
        skipFirstNChanges: number;
        fieldName: any;
        changeMask: string;
        deadband: number;
        deadbandPercent: number;
    }[]>;
    formatSendPolicyTimer(sendPolicyValues: any): Promise<{
        type: any;
        intervalMs: number;
    }[]>;
    formatSendPolicy(sendPolicyValues: any): Promise<{
        type: any;
        level: number;
        levelString: any;
        mode: any;
        minIntervalMs: number;
        skipFirstNChanges: number;
        tagName: any;
        changeMask: string;
        deadband: number;
        deadbandPercent: number;
    }[] | {
        type: any;
        level: number;
        levelString: any;
        mode: any;
        minIntervalMs: number;
        skipFirstNChanges: number;
        fieldName: any;
        changeMask: string;
        deadband: number;
        deadbandPercent: number;
    }[] | {
        type: any;
        intervalMs: number;
    }[]>;
    formatChangeMaskProperty(changeMaskProp: any): Promise<string>;
    deletePreset(presetId: any): Promise<void>;
    setTagInTagPropertiesDragAndDrop(tag: any): void;
    setDroppedTag(tag: any): void;
    resetDroppedTag(): void;
    addNodeToSelectedNodes(node: any): void;
    saveSelectedNodes(nodes: any): void;
    removeNodeFromSelectedNodes(node: any): void;
    resetSelectedNodes(): void;
    loadPropertiesForMultiedit(nodes: any): void;
    saveMultieditProperties(): void;
    setSelectedNode(node: any): void;
    setSelectedNodes(nodes: any): void;
    setIsLoadingProperties(value: any): void;
    setSelectedDevice(device: DeviceIn): void;
    saveTreeviewPreset(preset: PresetObject): void;
    setTagType(tagType: PresetTagType): void;
    validateFormula(validation: {
        formula: {
            functions: {
                formula: {
                    map: String;
                };
            };
        };
    }): Promise<ModelMarker[]>;
    filterTags({ tags, treeviewMapping, searchTags }: {
        tags: RawTag[];
        treeviewMapping: TreeviewModelNode;
        searchTags: string;
    }): RawTag[];
    searchTags({ tags, searchTags }: {
        tags: RawTag[];
        searchTags: string;
    }): RawTag[];
    importTags({ tags, treeviewMapping }: {
        tags: RawTag[] | SanitizedTag[];
        treeviewMapping: TreeviewModelNode;
    }): void;
}
