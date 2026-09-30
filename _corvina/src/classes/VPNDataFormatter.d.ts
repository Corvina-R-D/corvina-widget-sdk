import VPNDevice, { ActionFullDTO, ActionProfileRequestDTO, ActionRequestDTO, VPNApplication, VPNApplicationType, VPNDeviceEndpoint, VPNEndpointDTO, VPNProfile, VPNApplicationVNCClipboardEncoding, VPNDeviceLog, DeviceLogsDTO, VPNDeviceExtended, VPNDeviceDTO, ActionSimpleDTO } from "../interfaces/VPNDevice";
export default class VPNDataFormatter {
    static formatContentArrayToVPNDevice(vpnDevices: VPNDeviceDTO[], serverTimestamp?: number): VPNDeviceExtended[];
    static formatEndpointToVPNEndpoint(dtoEndpoint: VPNEndpointDTO): Partial<VPNDeviceEndpoint>;
    static formatDeviceToVPNDevice(device: VPNDeviceDTO, serverTimestamp?: number): VPNDevice;
    static formatVPNEndpointTODTO(endpoint: Partial<VPNDeviceEndpoint>, domain: string, gateway: string): VPNEndpointDTO;
    static formatContentArrayToVPNProfiles(profilesDTO: any): VPNProfile[];
    static formatProfileToVPNDevice(profile: any): VPNProfile;
    static formatApplicationProfileToDTO(applicationProfile: VPNProfile, domain: string): ActionProfileRequestDTO;
    static formatVPNApplicationToFullDTO(application: VPNApplication, domain: string): ActionFullDTO;
    static formatVPNApplicationToRequestDTO(application: VPNApplication, domain: string): ActionRequestDTO;
    static dtoTypeToApplicationType(dtoType: string): VPNApplicationType;
    static formatVPNApplicationDetails(protocol: string, ports: string): string;
    static formatSimpleDTOToVPNApplication(dto: ActionSimpleDTO): VPNApplication;
    static formatDTOToVPNApplication(dto: ActionFullDTO): VPNApplication;
    static parseClipboardEncoding(vnc_clipboard_encoding: string): VPNApplicationVNCClipboardEncoding;
    private static parseTerminalColorScheme;
    private static parseColorDepth;
    static applicationTypeToConfigurationType(applicationType: VPNApplicationType): string;
    static formatContentArrayToVPNApplications(profiles: any): VPNApplication[];
    static formatLogDTO(dto: DeviceLogsDTO): VPNDeviceLog;
}
