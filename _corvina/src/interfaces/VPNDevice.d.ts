import { UserAuthorizationDTO } from './userGroup';
export type ConnectionStatusDTO = 'online' | 'offline' | 'connected' | 'in-use' | 'busy' | 'all';
export interface VPNConnectedUser {
    name: string;
    domain: string;
}
export interface VPNDeviceDTO extends ActivateDeviceLicenseInDTO {
    status: ConnectionStatusDTO;
    resetRequired?: boolean;
    connectedUsers?: VPNConnectedUser[];
    remark?: string;
    name: string;
    description?: string;
    domain: string;
    gatewayId: string;
    groups: string[];
    endpoints: Partial<VPNDeviceEndpoint>[];
    deviceId: string;
    gateway_disable_virtual_ip: boolean;
    gateway_virtualnetwork_size: string;
    bytesReceived?: number;
    bytesSent?: number;
    connectedFrom?: string;
    userPingQuality?: VPNDevicePingQuality;
    devicePingQuality?: VPNDevicePingQuality;
    alias: string;
    fromDateVpn: string;
    label: string;
    logicalId: string;
    notes: string;
    numOfSecondsAutoRenewVpn: number;
    orgResourceId: string;
    realm: string;
    serialNumber: string;
    toDateVpn: string;
    connectionId: string;
    otpRequired?: boolean;
    lastAttempt?: string;
    enabled?: boolean;
}
export interface VPNDevicePingQuality {
    latencyMs: number;
    jitterMs: number;
    packetLoss: number;
    lastCheck: string;
}
export default interface VPNDevice {
    deviceId?: string;
    logicalId?: string;
    connected?: boolean;
    label?: string;
    description?: string;
    serialNumber?: string;
    service_enabled?: boolean;
    autorenew?: boolean;
    resetRequired?: boolean;
    renew_date?: string;
    valid_until?: string;
    status?: ConnectionStatusDTO;
    domain?: string;
    gatewayId?: string;
    id?: string;
    groups?: string[];
    connectedUsers?: VPNConnectedUser[];
    endpoints?: Partial<VPNDeviceEndpoint>[];
    endpointsCount?: number;
    gateway_disable_virtual_ip?: boolean;
    gateway_virtualnetwork_size?: string;
    preferred_region?: string;
    use_fallback_config?: boolean;
    bytesReceived?: number;
    bytesSent?: number;
    connectedFrom?: string;
    userPingQuality?: VPNDevicePingQuality;
    devicePingQuality?: VPNDevicePingQuality;
    __endpointConnections__unstable__?: Partial<VPNDeviceEndpoint>[];
    otpRequired?: boolean;
    vpnReady?: boolean;
    policies?: string[];
    enabled?: boolean;
}
export interface VPNDeviceExtended extends VPNDevice {
    cc1Position?: [string, string];
    permissions?: UserAuthorizationDTO;
    resettingConnection?: boolean;
    connecting?: boolean;
    disconnecting?: boolean;
}
export interface VPNGatewayDTO {
    ID: string;
    domain: string;
    enabled: boolean;
    endpoints: VPNEndpointDTO[];
    name: string;
    online: boolean;
    latitude: string;
    longitude: string;
    gateway_disable_virtual_ip: boolean;
    gateway_virtualnetwork_size: string;
    preferred_region?: string;
    use_fallback_config?: boolean;
    policies?: string[];
}
export type VPNDeviceEndpointType = 'gateway' | 'device' | 'network';
export interface VPNEndpointDTO {
    actionProfile: string;
    domain: string;
    enabled: boolean;
    gateway: string;
    name: string;
    physicalIpAddress: string;
    snat: boolean;
    remark?: string;
    ID?: string;
    type?: VPNDeviceEndpointType;
}
export interface VPNDeviceEndpoint {
    id?: string;
    description?: string;
    ip?: string;
    applicationProfile?: string;
    enabled?: boolean;
    nat?: boolean;
    custom?: string;
    type?: VPNDeviceEndpointType;
    name: string;
    status: ConnectionStatusDTO;
    resetRequired?: boolean;
    connectedUsers?: VPNConnectedUser[];
    remark?: string;
    domain: string;
    gatewayId: string;
    deviceId: string;
    groups: string[];
}
export declare function isDeviceEndpoint(object: any): object is VPNDeviceEndpoint;
export declare enum VPNApplicationType {
    SSH = "SSH",
    RDP = "RDP",
    VNC = "VNC",
    TELNET = "Telnet",
    HTTP = "HTTP",
    HTTPS = "HTTPS",
    CUSTOM = "Custom"
}
export declare enum VPNApplicationProtocol {
    UDP = "UDP",
    TCP = "TCP",
    BOTH = "UDP & TCP"
}
export declare enum VPNApplicationColorSchemes {
    GRAY_BLACK = "Gray over black",
    BLACK_WHITE = "Black over white",
    GREEN_BLACK = "Green over black",
    WHITE_BLACK = "White over black"
}
export declare enum VPNApplicationVNCClipboardEncoding {
    ISO8859_1 = "ISO8859-1",
    UTF_8 = "UTF-8",
    UTF_16 = "UTF-16",
    CP1252 = "CP1252"
}
export interface VPNApplicationAdvancedConfiguration {
    type: string;
}
export interface VPNApplicationSSH extends VPNApplicationAdvancedConfiguration {
    type: 'ssh';
    username: string;
    password: string;
    passwordConfirm: string;
    privateKey: string;
    passphrase: string;
    passphraseConfirm: string;
    terminalColorScheme: string;
    font: string;
    fontSize: number;
}
export interface VPNApplicationTelnet extends VPNApplicationAdvancedConfiguration {
    type: 'telnet';
    username: string;
    password: string;
    passwordConfirm: string;
    usernameRegex: string;
    passwordRegex: string;
    terminalColorScheme: string;
    font: string;
    fontSize: number;
}
export interface VPNApplicationVNC extends VPNApplicationAdvancedConfiguration {
    type: 'vnc';
    password: string;
    passwordConfirm: string;
    alwaysRequestPassword: boolean;
    connectionRetries: number;
    colorDepth?: string;
    swapRedBlue: boolean;
    cursor?: string;
    readOnly: boolean;
    clipboardEncoding?: VPNApplicationVNCClipboardEncoding;
    chatEnabled: boolean;
    disableCopy: boolean;
    disablePaste: boolean;
}
export declare enum VPNApplicationRDPSecurity {
    ANY = "Any",
    RDP = "RDP",
    NLA = "NLA",
    TLS = "TLS"
}
export declare enum VPNApplicationRDPServerLayout {
    PT_BR = "pt-br-qwerty",
    EN_GB = "en-gb-qwerty",
    EN_US = "en-us-qwerty",
    DE_DE = "de-de-qwertz",
    DE_CH = "de-ch-qwertz",
    HU_HU = "hu-hu-qwertz",
    FR_FR = "fr-fr-azerty",
    FR_BE = "fr-be-azerty",
    FR_CH = "fr-ch-qwertz",
    IT_IT = "it-it-qwerty",
    JA_JP = "ja-jp-qwerty",
    NO_NO = "no-no-qwerty",
    ES_ES = "es-es-qwerty",
    ES_LATAM = "es-latam-qwerty",
    SV_SE = "sv-se-qwerty",
    TR_TR = "tr-tr-qwerty",
    FAILSAFE = "failsafe"
}
export declare enum VPNApplicationColorDepths {
    DEFAULT = "default",
    B_8 = "8 bit",
    B_16 = "16 bit",
    B_24 = "24 bit",
    B_32 = "32 bit"
}
export interface VPNApplicationRDP extends VPNApplicationAdvancedConfiguration {
    type: 'rdp';
    username: string;
    password: string;
    passwordConfirm: string;
    domain: string;
    security?: VPNApplicationRDPSecurity;
    ignoreCertificate: boolean;
    disableAuthentication: boolean;
    clientName: string;
    enableAdminConsole: boolean;
    initialProgram: string;
    serverLayout?: VPNApplicationRDPServerLayout;
    colorDepth?: VPNApplicationColorDepths;
    width: string;
    height: string;
    dpi: string;
    disableAudio: boolean;
    enableWallpaper: boolean;
    enableTheming: boolean;
    enableFontSmoothing: boolean;
    enableFullWindowDrag: boolean;
    enableDesktopComposition: boolean;
    enableMenuAnimations: boolean;
    remoteAppName: string;
    remoteAppWorkingDirectory: string;
    remoteAppArguments: string;
}
export interface VPNCustomData {
    id: number;
    key: string;
    value: string;
}
export interface VPNApplicationCustomConfiguration extends VPNApplicationAdvancedConfiguration {
    type: 'custom';
    customData?: VPNCustomData[];
}
export interface VPNApplication {
    id: string;
    label: string;
    description?: string;
    details?: string;
    applicationType?: VPNApplicationType;
    protocol?: VPNApplicationProtocol;
    port?: string;
    browserEnabled?: boolean;
    urlToOpen?: string;
    externalUrl?: boolean;
    winOpenExternalApp?: boolean;
    winEnabledIntegratedApplication?: boolean;
    winExternalAppPath?: string;
    winExternalAppArguments?: string;
    osxOpenExternalApp?: boolean;
    osxEnabledIntegratedApplication?: boolean;
    osxExternalAppPath?: string;
    osxExternalAppArguments?: string;
    linuxOpenExternalApp?: boolean;
    linuxEnabledIntegratedApplication?: boolean;
    linuxExternalAppPath?: string;
    linuxExternalAppArguments?: string;
    configuration?: VPNApplicationAdvancedConfiguration | VPNApplicationCustomConfiguration | VPNApplicationSSH | VPNApplicationRDP | VPNApplicationVNC | VPNApplicationTelnet;
    new?: boolean;
}
export interface VPNProfile {
    id: string;
    name: string;
    description: string;
    applications: VPNApplication[];
    defaultProfile?: boolean;
    new?: boolean;
    actions?: string[];
}
export interface ActionProfileRequestDTO {
    id?: string;
    name?: string;
    domain?: string;
    actionIds?: string[];
    description?: string;
    default?: boolean;
}
export interface ActionProfileDTO {
}
export interface ActionDTO {
    records: number;
    page: number;
    total: number;
    content: Action[];
}
export interface Action {
    id: string;
    name: string;
}
export interface ActionRequestDTO {
    browser_application?: boolean;
    command_args?: string;
    command_args_linux?: string;
    command_args_os_x?: string;
    command_path?: string;
    command_path_linux?: string;
    command_path_os_x?: string;
    custom_configuration?: string;
    domain?: string;
    enabled?: boolean;
    chat_enabled?: boolean;
    disable_copy?: boolean;
    disable_paste?: boolean;
    external_url?: string;
    linux_clientless_application?: boolean;
    linux_external_application?: boolean;
    name?: string;
    os_x_clientless_application?: boolean;
    os_x_external_application?: boolean;
    password?: string;
    port?: string;
    protocol?: string;
    rdp_client_name?: string;
    rdp_color_depth?: string;
    rdp_console?: boolean;
    rdp_console_audio?: string;
    rdp_disable_audio?: boolean;
    rdp_disable_auth?: boolean;
    rdp_domain?: string;
    rdp_dpi?: string;
    rdp_enable_desktop_composition?: boolean;
    rdp_enable_font_smoothing?: boolean;
    rdp_enable_full_window_drag?: boolean;
    rdp_enable_menu_animations?: boolean;
    rdp_enable_theming?: boolean;
    rdp_enable_wallpaper?: boolean;
    rdp_height?: string;
    rdp_ignore_cert?: boolean;
    rdp_initial_program?: string;
    rdp_remote_app?: string;
    rdp_remote_app_args?: string;
    rdp_remote_app_dir?: string;
    rdp_security?: string;
    rdp_server_layout?: string;
    rdp_width?: string;
    remark?: string;
    ssh_color_scheme?: string;
    ssh_font_name?: string;
    ssh_font_size?: string;
    ssh_passphrase?: string;
    ssh_passphrase_verify?: string;
    ssh_private_key?: string;
    telnet_color_scheme?: string;
    telnet_font_name?: string;
    telnet_font_size?: string;
    telnet_password_regex?: string;
    telnet_username_regex?: string;
    type?: string;
    url?: string;
    username?: string;
    verify?: string;
    vnc_always_req_password?: boolean;
    vnc_autoretry?: string;
    vnc_clipboard_encoding?: string;
    vnc_color_depth?: string;
    vnc_cursor?: string;
    vnc_read_only?: boolean;
    vnc_swap_red_blue?: boolean;
    windows_clientless_application?: boolean;
    windows_external_application?: boolean;
}
export interface ActionSimpleDTO {
    id?: string;
    name?: string;
    type?: string;
    remark?: string;
    details?: string;
}
export interface ActionFullDTO extends ActionSimpleDTO {
    ID?: string;
    protocol?: string;
    port?: string;
    domain?: string;
    enabled?: boolean;
    chat_enabled?: boolean;
    disable_copy?: boolean;
    disable_paste?: boolean;
    url?: any;
    external_url?: any;
    username?: any;
    password?: any;
    verify?: any;
    browser_application?: any;
    custom_configuration?: any;
    os_x_external_application?: any;
    os_x_clientless_application?: any;
    linux_external_application?: any;
    linux_clientless_application?: any;
    windows_external_application?: any;
    windows_clientless_application?: any;
    command_path?: string;
    command_args?: any;
    command_path_os_x?: string;
    command_args_os_x?: any;
    command_path_linux?: any;
    command_args_linux?: any;
    remark?: string;
    unescaped_name?: string;
    vnc_always_req_password?: any;
    vnc_cursor?: any;
    vnc_clipboard_encoding?: any;
    vnc_color_depth?: any;
    vnc_swap_red_blue?: any;
    vnc_autoretry?: any;
    vnc_read_only?: any;
    rdp_initial_program?: any;
    rdp_server_layout?: any;
    rdp_console_audio?: any;
    rdp_disable_audio?: any;
    rdp_enable_full_window_drag?: any;
    rdp_width?: any;
    rdp_height?: any;
    rdp_enable_desktop_composition?: any;
    rdp_enable_wallpaper?: any;
    rdp_client_name?: any;
    rdp_security?: string;
    rdp_enable_font_smoothing?: any;
    rdp_console?: any;
    rdp_domain?: any;
    rdp_remote_app_dir?: any;
    rdp_enable_menu_animations?: any;
    rdp_remote_app_args?: any;
    rdp_enable_theming?: any;
    rdp_dpi?: any;
    rdp_disable_auth?: any;
    rdp_ignore_cert?: any;
    rdp_color_depth?: any;
    rdp_remote_app?: any;
    ssh_font_name?: any;
    ssh_font_size?: any;
    ssh_color_scheme?: any;
    ssh_private_key?: any;
    ssh_passphrase?: any;
    ssh_passphrase_verify?: any;
    telnet_color_scheme?: any;
    telnet_font_name?: any;
    telnet_username_regex?: any;
    telnet_password_regex?: any;
    telnet_font_size?: any;
}
import { PageableFullDTO } from '../communication/axios/model/generic';
import { ActivateDeviceLicenseInDTO } from './devicelicence';
export interface UserPreferenceVpnApplicationMain {
    gateway: string;
    endpoint: string;
    applicationProfile: string;
    application: string;
}
export interface UserPreferenceVpnApplicationFull extends UserPreferenceVpnApplicationMain {
    id: number;
    username: string;
    orgResourceId: string;
}
export interface UserPreferenceApplicationDTO extends PageableFullDTO {
    content: UserPreferenceVpnApplicationFull[];
}
export interface DeviceLogsDTO {
    action: string;
    applicationName: string;
    deviceName: string;
    domain: string;
    name: string;
    timestamp: string;
    user: string;
}
export interface VPNDeviceLog {
    action: string;
    applicationName: string;
    deviceName: string;
    domain: string;
    name: string;
    timestamp: Date;
    humanReadableTimestamp: string;
    user: string;
}
export interface VPNJsonActionActionDTO {
    unescaped_name: string;
    passwordRequired: boolean;
    protocol: string;
    ID: string;
    remark: string;
    name: string;
    url: string;
    port: number;
    clientlessApplication: boolean;
    externalApplication: boolean;
    actived: boolean;
    unavailableApplication: boolean;
    type?: VPNDeviceEndpointType;
}
export interface ConnectedUser {
    name: string;
    domain: string;
}
export interface VPNJsonActionDTO {
    actions: VPNJsonActionActionDTO[];
    ipAddress: string;
    virtualAddress: string;
    gatewayDevices: any[] | any;
    gatewayDevicesNameList: string[];
    name: string;
    deviceNumber: number;
    domain: string;
    type?: VPNDeviceEndpointType;
    status: string;
    isOnline: boolean;
    resetRequired: boolean;
    remark: string;
    connected: boolean;
    available: boolean;
    vpnAddress: string;
}
export type VPNEndpointJsonActions = {
    [deviceLabel: string]: VPNJsonActionDTO;
};
export interface VpnApplicationUserPreferenceMain {
    gateway: string;
    endpoint: string;
    applicationProfile: string;
    application: string;
}
export interface VpnExecuteActionOutDTO {
    clientlessApplication?: boolean;
    commandArgs?: string;
    commandPath?: string;
    connections?: {
        domain: string;
        endpoint: string;
        gateway: string;
        ip: string;
    }[];
    deviceId?: string;
    endpointName?: string;
    externalApplication?: boolean;
    gatewayId?: string;
    id?: string;
    passwordRequired?: boolean;
    port?: string;
    protocol?: string;
    type?: string;
    unavailableApplication?: boolean;
    url?: string;
    remark?: string;
}
export interface VPNRegionsDTO {
    regions: string[];
}
