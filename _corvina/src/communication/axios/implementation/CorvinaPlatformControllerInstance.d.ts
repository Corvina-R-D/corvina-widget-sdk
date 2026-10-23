import AbstractAxiosInstance from "./AbstractAxiosInstance";
import ICorvinaPlatformController from "../ICorvinaPlatformControllerInstance";
import { PlatformTagsDTO, PlatformTagsResponseItem, PlatformDeviceStatusDTO, DeviceTagsParams, GeneralParams, DeviceWriteTagsParams, DeviceConfigurationDTO, DeviceTagInfoDTO, DeviceStatusDTO, PlatformQueryDataDTO, FormulaValidationRequestDTO, FormulaValidationResultDTO } from "@/interfaces/IPlatformController";
import { DeviceDetails } from "@/interfaces/devicedetails";
declare class CorvinaPlatformControllerInstance extends AbstractAxiosInstance implements ICorvinaPlatformController {
    constructor();
    updateBaseUrl(): void;
    getAvailableTags(organizationId: string, deviceId: string): Promise<Array<DeviceTagInfoDTO>>;
    setTagsByDeviceId(organizationId: string, deviceId: string, data: DeviceWriteTagsParams): Promise<any>;
    getTagsByDeviceId(organizationId: string, deviceId: string, params: DeviceTagsParams): Promise<Array<PlatformTagsResponseItem>>;
    fetchTagsByDeviceId(organizationId: string, deviceId: string, params: DeviceTagsParams): Promise<Response>;
    queryTags(organizationId: string, params: PlatformQueryDataDTO): Promise<Array<PlatformTagsDTO>>;
    queryTagsDefinition(organizationId: string, params: PlatformQueryDataDTO): {
        method: string;
        url: string;
        data: PlatformQueryDataDTO;
    };
    getTagsByDeviceName(organizationId: string, deviceName: string, params: DeviceTagsParams): Promise<Array<PlatformTagsResponseItem>>;
    getTagsByDeviceGroup(organizationId: string, deviceGroup: string, params: DeviceTagsParams): Promise<Array<PlatformTagsResponseItem>>;
    getDeviceStatus(organizationId: string, deviceId: string, params: GeneralParams): Promise<Array<PlatformDeviceStatusDTO>>;
    getDeviceConfiguration(organizationId: string, deviceId: string): Promise<DeviceConfigurationDTO>;
    getDevicesDetails(organizationId: string): Promise<Array<DeviceDetails>>;
    getDevicesByAlias(organizationId: string, deviceAlias: string): Promise<DeviceStatusDTO>;
    resyncDeviceStatus(organizationId: string, deviceId: string): Promise<unknown>;
    getDeviceConnectionDetails(organizationId: string, deviceLogicalId: string, since?: number, to?: number, limit?: number): Promise<unknown>;
    fetchDeviceConnectionDetails(organizationId: string, deviceId: string, params: GeneralParams): Promise<Response>;
    /** Compiles a formula evaluated by platform-api as it will run, without running it */
    validateFormula(data: FormulaValidationRequestDTO): Promise<FormulaValidationResultDTO>;
}
declare const _default: CorvinaPlatformControllerInstance;
export default _default;
