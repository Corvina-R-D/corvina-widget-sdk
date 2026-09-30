import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { PresetOutDTO, PresetInDTO, PresetsInDTO } from "@/interfaces/preset";
import { ModelOutDTO, ModelInDTO, ModelIn, ValidateModelOutDTO } from "@/interfaces/model";
import { DeviceInDTO, DeviceSearchParamsDTO, DeviceSearchInDTO, DeviceIn } from "@/interfaces/device";
import IDeviceMappingAxiosInstance from "../IDeviceMappingAxiosInstance";
import { DeviceConfigurationJsonDTO } from "@/interfaces/IPlatformController";
import { ISearchModelResult } from '@/interfaces/model';
declare class DeviceMappingAxiosInstance extends AbstractAxiosInstance implements IDeviceMappingAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    createPreset(data: PresetOutDTO, params?: any): Promise<void>;
    createPresetAsync(data: PresetOutDTO, params?: any): Promise<void>;
    fetchPresets(params?: any): Promise<PresetsInDTO>;
    getPresetProgress(jobID: string, params?: any): Promise<PresetsInDTO>;
    fetchPreset(presetId: String, params?: any): Promise<PresetInDTO>;
    fetchDeviceConfig(presetId: String, params?: any): Promise<DeviceConfigurationJsonDTO>;
    createModel(data: ModelOutDTO, params?: any): Promise<ModelIn>;
    fetchModels(params?: any): Promise<ModelInDTO>;
    fetchModelsByName(params?: any): Promise<ModelInDTO>;
    setDeviceConfiguration(deviceId: String, presetId: String): Promise<void>;
    getDevices(params?: any): Promise<DeviceInDTO>;
    searchDevices(params?: DeviceSearchParamsDTO): Promise<DeviceSearchInDTO>;
    getDevice(deviceId: String, params?: any): Promise<{
        value: DeviceIn;
    }>;
    deleteDevice(deviceId: String, params?: any): Promise<any>;
    patchDeviceAttributes(deviceId: String, fieldValue: {
        [s: string]: any;
    }): Promise<void>;
    getModelVersions(modelName: String, params?: any): Promise<{
        data: string[];
    }>;
    getModelById(modelId: String, params?: any): Promise<any>;
    deleteModelById(modelId: String, params?: any): Promise<void>;
    updateModel(modelId: String, model: ModelOutDTO, params?: any): Promise<any>;
    deletePresetById(presetId: String, params?: any): Promise<void>;
    validateModel(model: ValidateModelOutDTO, params?: any): Promise<any>;
    updateMappingsSuborgVisibility(params: any): Promise<unknown>;
    updateModelsSuborgVisibility(params: any): Promise<unknown>;
    searchModelsPaths(params?: {
        page: number;
        pageSize: number;
        data?: string;
    }, config?: any): Promise<ISearchModelResult>;
}
declare const _default: DeviceMappingAxiosInstance;
export default _default;
