import { ActivateDeviceLicenseOutDTO, ActivateDeviceLicenseInDTO, UpdateDevicePasswordInDTO } from "@/interfaces/devicelicence";
export default interface ILicenseManagerAxiosInstance {
    activateDevice(data: ActivateDeviceLicenseOutDTO): Promise<ActivateDeviceLicenseInDTO>;
    updateDevicePassword(logicalId: string, data: UpdateDevicePasswordInDTO): Promise<any>;
}
