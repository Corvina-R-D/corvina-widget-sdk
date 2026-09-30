import { ActivateDeviceLicenseOutDTO, ActivateDeviceLicenseInDTO } from "@/interfaces/devicelicence";
export default interface ILicenseManagerAxiosInstance {
    activateDevice(data: ActivateDeviceLicenseOutDTO): Promise<ActivateDeviceLicenseInDTO>;
}
