import { VuexModule } from 'vuex-module-decorators';
import { RawTag, SanitizedTag } from '@/utils/ModelPresetUtils';
import { TreeviewModelNode, ModelNodeMetadata } from '../classes/DataModelConvert';
import { ModelIn, ModelObject, ModelStruct, ModelArray, ModelOutDTO, ModelInDTO, ModelsPagination, ModelRoot, ValidateModelOutDTO } from '../interfaces/model';
import { PresetIn } from '../interfaces/preset';
export interface VuexInputNode {
    value: string | ModelObject;
    object: ModelRoot | ModelArray;
    type: string;
    number: number;
    tags?: string[];
}
export interface VuexInstanceOf {
    instanceOf: string;
    version: string;
}
export interface VuexFilterFetchModels {
    search?: string;
    page?: number;
    pageSize?: number;
    append?: boolean;
    name?: string;
    version?: string;
    orderBy?: string;
    orderDir?: 'ASC' | 'DESC' | 'asc' | 'desc';
    paginate?: boolean;
    omitContent?: boolean;
}
export default class ModelStore extends VuexModule {
    model: (ModelObject | ModelStruct);
    newModelName: string;
    models: ModelIn[];
    modelsByNameCurrentVersion: ModelIn[];
    modelsPagination: ModelsPagination;
    modelUnits: string[];
    modelTags: string[];
    draftModels: {};
    cacheModelVersionMap: {};
    cloneModelList: {
        data: ModelIn[];
        pagination: any;
    };
    inlineCreatedModels: string[];
    treeviewModel: TreeviewModelNode;
    properties: ModelNodeMetadata;
    selectedNodes: TreeviewModelNode[];
    isEditable: boolean;
    modelVersionDiffVisible: boolean;
    modelVersionDiffName: string;
    get presetStore(): any;
    get getModel(): ModelObject | ModelStruct;
    get getModels(): ModelIn[];
    get getAllModelsVersions(): ModelIn[];
    get getCloneModelList(): {
        data: ModelIn[];
        pagination: any;
    };
    get getNewModelName(): string;
    get getDraftModels(): {};
    get getModelsPagination(): ModelsPagination;
    get getCachedModelsVersions(): {};
    get getInlineCreatedModels(): string[];
    get getTreeviewModel(): TreeviewModelNode;
    get getSelectedNodes(): TreeviewModelNode[];
    get getProperties(): ModelNodeMetadata;
    get getAllModelUnits(): string[];
    get getAllModelTags(): string[];
    get getModelVersionDiffName(): string;
    get getModelVersionDiffVisible(): boolean;
    INIT_STATE(): void;
    INSERT_NODE({ path, value, content }: {
        path: any;
        value: any;
        content: any;
    }): void;
    DELETE_NODE({ path, key }: {
        path: any;
        key: any;
    }): void;
    HIDDEN_NODE({ path, value }: {
        path: any;
        value: any;
    }): void;
    SET_INSTANCE_OF(instanceOf: any): void;
    SAVE_MODELS(models: any): void;
    SAVE_CLONE_MODEL_LIST(models: any): void;
    SAVE_CLONE_MODEL_LIST_PAGINATION(pagination: any): void;
    SAVE_PREPEND_MODELS(newModel: any): void;
    SAVE_APPEND_MODELS(models: any): void;
    RESET_MODELS(this: any): void;
    SAVE_APPEND_CLONE_MODEL_LIST(models: ModelIn[]): void;
    SET_MODEL(model: any): void;
    SET_NEW_MODEL_NAME(name: any): void;
    RESET_NEW_MODEL_NAME(): void;
    RESET_MODEL(): void;
    REMOVE_MODEL(modelId: any): void;
    SAVE_DRAFT_MODELS(models: any): void;
    SAVE_MODELS_PAGINATION(modelsPagination: any): void;
    SAVE_CACHED_MODELS_VERSIONS(models: any): void;
    MODIFY_FIELD_NAME({ path, oldFieldName, newFieldName, parentNode }: {
        path: any;
        oldFieldName: any;
        newFieldName: any;
        parentNode: any;
    }): void;
    MODIFY_INSTANCE_OF({ newModel, element }: {
        newModel: any;
        element: any;
    }): void;
    MODIFY_ARRAY_LENGTH({ path, oldFieldName, nElement }: {
        path: any;
        oldFieldName: any;
        nElement: any;
    }): void;
    SET_MODELS_VERSION({ key, value }: {
        key: any;
        value: any;
    }): void;
    SET_MODEL_CURRENT_VERSION({ model, version }: {
        model: any;
        version: any;
    }): void;
    REMOVE_CACHED_MODEL_VERSION({ model, modelVersion }: {
        model: any;
        modelVersion: any;
    }): void;
    RESET_CACHE_MODELS_VERSION(): void;
    ADD_MODEL_TO_INLINE_CREATED_MODELS(model: string): void;
    REMOVE_MODEL_FROM_INLINE_CREATED_MODELS({ model, index }: {
        model: any;
        index: any;
    }): void;
    RESET_INLINE_CREATED_MODELS(): void;
    SAVE_TREEVIEW_MODEL(model: any): void;
    RESET_SELECTED_NODES(): void;
    ADD_NODE_TO_SELECTED_NODES(node: TreeviewModelNode): void;
    SAVE_SELECTED_NODES(nodes: any): void;
    RESET_PROPERTIES(): void;
    LOAD_PROPERTIES(properties: any): void;
    UPDATE_MODEL_SHARE_STATUS({ model, data }: {
        model: any;
        data: any;
    }): void;
    SAVE_MODEL_PROPERTIES({ path, key, value }: {
        path: any;
        key: any;
        value: any;
    }): void;
    SHOW_MODEL_DIFF(modelName: string): void;
    CLEAR_MODEL_DIFF(): void;
    insertNode({ value, object, type, number, tags }: VuexInputNode): any;
    deleteNode({ object, key }: {
        object: any;
        key: any;
    }): void;
    hiddenNode({ object, value }: {
        object: any;
        value: any;
    }): void;
    deleteModel({ model, modelVersion, modelId }: {
        model: any;
        modelVersion: any;
        modelId: any;
    }): Promise<{}>;
    initState(): void;
    setInstanceOf({ instanceOf }: VuexInstanceOf): void;
    saveModel(model: ModelOutDTO): Promise<ModelIn | {}>;
    saveLocalModel(model: ModelOutDTO): Promise<ModelIn | {}>;
    validateAndUpdateModel({ modelId, model, isShared }: {
        modelId: string;
        model: ModelOutDTO;
        isShared: boolean;
    }): Promise<ModelIn>;
    updateModel({ modelId, model, isShared }: {
        modelId: string;
        model: ModelOutDTO;
        isShared: boolean;
    }): Promise<ModelIn>;
    fetchModelById(modeId: string): Promise<any>;
    fetchMappingById(mappingId: string): Promise<PresetIn>;
    fetchDeviceConfiguration(mappingId: string): Promise<import("../interfaces/IPlatformController").DeviceConfigurationJsonDTO>;
    fetchModels(filter?: VuexFilterFetchModels): Promise<ModelInDTO>;
    fetchModelsList(filter?: VuexFilterFetchModels): Promise<ModelIn[]>;
    fetchCloneModelList(filter?: VuexFilterFetchModels): Promise<ModelIn[]>;
    fetchModelsByName(filter?: {
        search: string;
        page: number;
        pageSize: number;
    }): Promise<any[]>;
    getOrFetchModelByName(name: string): Promise<ModelIn[]>;
    setCachedModelVersionIfNeeded(model: ModelIn): Promise<string>;
    setCachedModelCurrentVersionIfNeeded({ model, version }: {
        model: any;
        version: any;
    }): Promise<string>;
    resetCacheModelVersion(model: any): void;
    resetCacheModelsVersion(): void;
    setCachedModelsVersions(models: any): Promise<void>;
    setModel(model: ModelRoot): void;
    setNewModelName(name: string): void;
    resetNewModelName(): void;
    resetModel(): void;
    fetchDraftModels(): void;
    getModelVersions({ modelName, fullHistory }: {
        modelName: string;
        fullHistory?: boolean;
    }): Promise<string[]>;
    insertNewFieldName(data: any): Promise<void>;
    setLengthOfArrayNode(data: any): void;
    insertNewInstanceOf(data: any): void;
    validateModel(model: ValidateModelOutDTO): Promise<any>;
    updateMappingsSuborgVisibility(params: any): Promise<unknown>;
    updateModelsSuborgVisibility(params: any): Promise<unknown>;
    setModelCurrentVersion({ model, version }: {
        model: any;
        version: any;
    }): void;
    addModelToInlineCreatedModels(model: any): void;
    removeModelFromInlineCreatedModels(model: any): void;
    resetInlineCreatedModels(): void;
    saveTreeviewModel(model: any): void;
    resetCachedModels(): void;
    saveAppendModel(model: any): void;
    exportModel(modelId: any): Promise<{
        id: any;
        name: any;
        version: any;
        json: any;
    }>;
    importModels(modelContent: ModelObject[]): Promise<[{
        [key: string]: string;
    }, {
        [key: string]: string;
    }, string[]] | undefined>;
    exportMapping(mappingId: any): Promise<{
        name: string;
        json: import("../interfaces/preset").PresetObject | import("../interfaces/preset").PresetStruct;
    }>;
    importMappings(mappingContent: PresetIn[]): Promise<{
        isModel: boolean;
        setModelIds: Set<unknown>;
    }>;
    importModelMappings(modelMappingContent: any): Promise<{
        isModel: boolean;
        setModelIds: Set<unknown>;
    }>;
    resetSelectedNodes(): void;
    addNodeToSelectedNodes(node: any): void;
    saveSelectedNodes(nodes: any): void;
    loadProperties(properties: any): void;
    resetProperties(): void;
    loadPropertiesForMultiedit(nodes: any): void;
    saveMultieditProperties(): void;
    fetchAllModelUnits(): Promise<void>;
    showModelDiff(modelName: string): Promise<void>;
    clearModelDiff(): Promise<void>;
    filterTags({ tags, treeviewModel, searchTags }: {
        tags: RawTag[];
        treeviewModel: TreeviewModelNode;
        searchTags: string;
    }): RawTag[];
    searchTags({ tags, searchTags }: {
        tags: RawTag[];
        searchTags: string;
    }): RawTag[];
    importTags({ tags, treeviewModel, separator }: {
        tags: RawTag[] | SanitizedTag[];
        treeviewModel: TreeviewModelNode;
        separator?: string;
    }): Promise<void>;
}
