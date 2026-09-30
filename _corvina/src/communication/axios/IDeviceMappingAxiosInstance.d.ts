import { PresetOutDTO, PresetInDTO, PresetsInDTO } from '@/interfaces/preset';
import { ModelOutDTO, ModelInDTO, ModelIn, ValidateModelOutDTO } from '@/interfaces/model';
import { DeviceIn, DeviceInDTO } from '@/interfaces/device';
import { ISearchModelResult } from '@/interfaces/model';
export default interface IDeviceMappingAxiosInstance {
    createPreset(data: PresetOutDTO, params?: any): Promise<void>;
    fetchPresets(params?: any): Promise<PresetsInDTO>;
    fetchPreset(presetId: String, params?: any): Promise<PresetInDTO>;
    createModel(data: ModelOutDTO, params?: any): Promise<ModelIn>;
    fetchModels(params?: any): Promise<ModelInDTO>;
    setDeviceConfiguration(deviceId: String, presetId: String): Promise<void>;
    getDevices(params?: any): Promise<DeviceInDTO>;
    getDevice(deviceId: String, params?: any): Promise<{
        value: DeviceIn;
    }>;
    patchDeviceAttributes(deviceId: String, fieldValue: {
        [s: string]: any;
    }): Promise<void>;
    deleteDevice(deviceId: String, params?: any): Promise<any>;
    getModelVersions(modelName: String, params?: any): Promise<any>;
    getModelById(modelId: String, params?: any): Promise<any>;
    deleteModelById(modelId: String, params?: any): Promise<void>;
    deletePresetById(presetId: String, params?: any): Promise<void>;
    fetchModelsByName(params?: any): Promise<ModelInDTO>;
    updateModel(modelId: String, model: any, params?: any): Promise<any>;
    validateModel(model: ValidateModelOutDTO, params?: any): Promise<any>;
    searchModelsPaths(params: {
        page: number;
        pageSize: number;
        data?: string;
    }, config?: any): Promise<ISearchModelResult>;
}
