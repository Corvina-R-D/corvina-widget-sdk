import { PlatformTagsResponseItem, DeviceTagsParams, PlatformDeviceStatusDTO, GeneralParams, DeviceWriteTagsParams, DeviceConfigurationDTO, DeviceTagInfoDTO, FormulaValidationRequestDTO, FormulaValidationResultDTO } from "@/interfaces/IPlatformController";
export default interface IPlatformApiAxiosInstance {
    getTagsByDeviceId(organizationId: string, deviceId: string, params: DeviceTagsParams): Promise<Array<PlatformTagsResponseItem>>;
    fetchTagsByDeviceId(organizationId: string, deviceId: string, params: DeviceTagsParams): Promise<Response>;
    getTagsByDeviceName(organizationId: string, deviceName: string, params: DeviceTagsParams): Promise<Array<PlatformTagsResponseItem>>;
    getTagsByDeviceGroup(organizationId: string, deviceGroup: string, params: DeviceTagsParams): Promise<Array<PlatformTagsResponseItem>>;
    getDeviceStatus(organizationId: string, deviceId: string, params: GeneralParams): Promise<Array<PlatformDeviceStatusDTO>>;
    setTagsByDeviceId(organizationId: string, deviceId: string, data: DeviceWriteTagsParams): Promise<any>;
    getDeviceConfiguration(organizationId: string, deviceId: string): Promise<DeviceConfigurationDTO>;
    getAvailableTags(organizationId: string, deviceId: string): Promise<Array<DeviceTagInfoDTO>>;
    fetchDeviceConnectionDetails(organizationId: string, deviceId: string, params: GeneralParams): Promise<Response>;
    validateFormula(data: FormulaValidationRequestDTO): Promise<FormulaValidationResultDTO>;
}
