import { PlatformTagsDTO, DeviceTagsParams, PlatformDeviceStatusDTO, GeneralParams, DeviceWriteTagsParams, DeviceConfigurationDTO, DeviceTagInfoDTO } from "@/interfaces/IPlatformController";
import { ModelMarker } from "@/interfaces/preset";
export default interface IPlatformApiAxiosInstance {
    getTagsByDeviceId(organizationId: string, deviceId: string, params: DeviceTagsParams): Promise<Array<PlatformTagsDTO>>;
    fetchTagsByDeviceId(organizationId: string, deviceId: string, params: DeviceTagsParams): Promise<Response>;
    getTagsByDeviceName(organizationId: string, deviceName: string, params: DeviceTagsParams): Promise<Array<PlatformTagsDTO>>;
    getTagsByDeviceGroup(organizationId: string, deviceGroup: string, params: DeviceTagsParams): Promise<Array<PlatformTagsDTO>>;
    getDeviceStatus(organizationId: string, deviceId: string, params: GeneralParams): Promise<Array<PlatformDeviceStatusDTO>>;
    setTagsByDeviceId(organizationId: string, deviceId: string, data: DeviceWriteTagsParams): Promise<any>;
    getDeviceConfiguration(organizationId: string, deviceId: string): Promise<DeviceConfigurationDTO>;
    getAvailableTags(organizationId: string, deviceId: string): Promise<Array<DeviceTagInfoDTO>>;
    fetchDeviceConnectionDetails(organizationId: string, deviceId: string, params: GeneralParams): Promise<Response>;
    validatePresetFormula(formula: any /** FIXME: fix this any */): Promise<Array<ModelMarker>>;
}
