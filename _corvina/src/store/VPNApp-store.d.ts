import { UserAuthorizationDTO } from '../interfaces/userGroup';
import { VPNAppConnectionStatus } from '../communication/axios/implementation/VPNAppAxiosInstance';
export type { VPNAppConnectionStatus } from '../communication/axios/implementation/VPNAppAxiosInstance';
import { VuexModule } from 'vuex-module-decorators';
import VPNStore from './VPN-store';
export interface DevicePermissionsCache {
    timestamp: number;
    permissions: UserAuthorizationDTO;
}
export interface CompanionAppInfoDTO {
    requiredProductVersion: string;
    requiredProtocol: string;
    appName: string;
    appInstallBinaryName: string;
    appInstallUrl: string;
}
export type CompanionAppInfoByOSDTO = {
    os: 'win' | 'mac' | 'linux';
    info: CompanionAppInfoDTO;
}[];
export declare enum VPNAppStatus {
    UNKNOWN = 0,
    NOT_DETECTED = 1,
    DETECTED = 2,
    RUNNING = 4,
    DETECTED_AND_RUNNING = 6,
    UPDATE_AVAILABLE = 8,// patch version
    UPDATE_REQUIRED = 16
}
export declare enum VPNAppState {
    INVALID_STATE = -1,
    IDLE = 0,
    ERROR = 1,
    SETTING_UP = 2,
    CONNECTING = 3,
    CONNECTED = 4,
    DISCONNECTING = 5
}
export declare enum VPNAppStateErrorCode {
    NULL_ERROR = -1,
    NO_ERROR = 0,
    GENERIC_ERROR = 1,
    SYSTEM_ERROR = 2,
    NOT_CONFIGURED = 3,
    BAD_CREDENTIAL = 10,
    CODE_REQUEST_TIMEOUT = 20,
    INVALID_ACTIVATION_CODE = 50,
    ACTIVATION_CODE_NOT_REGISTERED = 51,
    SERVICE_COULD_NOT_BE_REACHED = 100,
    SERVER_COULD_NOT_BE_REACHED = 200,
    SERVER_VERIFICATION_FAILED = 201,
    SERVER_INTERNAL_ERROR = 202,
    SERVER_REPORTED_INVALID_LICENSE = 203,
    SERVER_REPORTED_CONTENT_NOT_FOUND = 204,
    AUTHENTICATION_FAILED = 300,
    USER_ALREADY_CONNECTED = 310,
    ORGANIZATION_REQUIRED = 320,
    PROXY_AUTHENTICATION_FAILED = 400,
    CONFIGURATION_DOWNLOAD_FAILURE = 450,
    BAD_CONFIGURATION_DOWNLOADED = 451,
    VPN_CLIENT_FAILURE = 500,
    VPN_CLIENT_TIMEOUT = 501,
    BAD_VPN_CLIENT_CONFIGURATION = 502,
    VPN_CLIENT_PING_EXIT = 503
}
export type SET_VPNAPP_UPDATE_FLAGS_Payload = {
    updateAvailable: boolean;
    updateRequired: boolean;
};
export default class VPNAppStore extends VuexModule {
    fakeAppStatus: VPNAppStatus;
    appStatus: VPNAppStatus;
    connectionStatus: VPNAppConnectionStatus;
    port: number;
    companionAppInfo: CompanionAppInfoDTO;
    MAX_RETRIES: number;
    retryCounter: number;
    _vpnBusy: boolean;
    lastVpnState: VPNAppState;
    canceling: boolean;
    get appPollTimeout(): 10000 | 3000;
    get vpnStore(): VPNStore;
    get vpnCanceling(): boolean;
    get vpnBusy(): boolean;
    get status(): VPNAppStatus;
    get isCompanionAppConnected(): number;
    get isUserLoggedAndAppOnline(): boolean;
    get vpnConnected(): boolean;
    get vpnAppState(): VPNAppState;
    get vpnConnectionStatus(): VPNAppConnectionStatus;
    get vpnAppStateText(): string;
    get vpnAppStateErrorCodeText(): string;
    get loggedUser(): {
        username: string;
        orgId: number;
    };
    get vpnAppInvalidUser(): boolean;
    SET_VPNAPP_PORT(port: number): void;
    SET_VPNAPP_UPDATE_FLAGS(data: SET_VPNAPP_UPDATE_FLAGS_Payload): void;
    SET_VPNAPP_CONNECTION_STATUS(connectionStatus: VPNAppConnectionStatus): void;
    SET_VPN_BUSY(busy: boolean): void;
    SET_CANCELING(canceling: boolean): void;
    RESET_RETRY_COUNTER(): void;
    DECR_RETRY_COUNTER(): void;
    SAVE_LAST_VPN_STATE(): void;
    SET_COMPANION_APP_INFO(info: any): void;
    fetchCompanionAppInfo(): Promise<CompanionAppInfoDTO>;
    startVpnAppMonitoring(): Promise<void>;
    stopVpnAppMonitoring(): Promise<void>;
    startApp(minimized: boolean): Promise<void>;
    detectApp(c: any): Promise<void>;
    getConnectionStatus(): Promise<VPNAppConnectionStatus>;
    login({ forceLogin }: {
        forceLogin: boolean;
    }): Promise<any>;
    logout(): Promise<any>;
    setFakeAppStatus(vpnAppStatus: VPNAppStatus): void;
    clearFakeAppStatus(vpnAppStatus: VPNAppStatus): void;
}
