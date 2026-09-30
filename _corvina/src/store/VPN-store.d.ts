import { UserAuthorizationDTO } from '../interfaces/userGroup';
import { ConnectionStatusDTO, VPNApplication, VPNDeviceEndpoint, VPNDeviceExtended, VpnExecuteActionOutDTO, VPNGatewayDTO, VPNProfile } from '../interfaces/VPNDevice';
import { DataOptions, DataPagination } from 'vuetify';
import { VuexModule } from 'vuex-module-decorators';
import VPNDevice, { VPNDeviceDTO, VPNJsonActionDTO } from "../interfaces/VPNDevice";
import VPNAppStore from './VPNApp-store';
export interface IVpnDeviceFilters {
    name?: string;
    names?: string[];
    groups?: string[];
}
export type VPNPagination = {
    page?: number;
    pageSize?: number;
    records?: number;
    totalElements?: number;
};
export interface VPNDataTablePagination extends DataPagination, DataOptions {
}
export type VPNStoreProfiles = {
    data: VPNProfile[];
    pagination: VPNPagination;
};
export type VPNStoreApplications = {
    data: VPNApplication[];
    pagination: VPNPagination;
};
export type VPNStoreDevices = {
    data: VPNDeviceExtended[];
    pagination: VPNPagination;
    dataTablePagination: VPNDataTablePagination;
    mapLastUpdate: number;
};
export type VPNStoreStatusFilter = {
    status: ConnectionStatusDTO;
} & IVpnDeviceFilters;
export default class VPNStore extends VuexModule {
    vpnLoadingSpinner: boolean;
    profiles: VPNStoreProfiles;
    applications: VPNStoreApplications;
    devices: VPNStoreDevices;
    device: VPNDeviceExtended;
    deviceUpdateRequired: {
        deviceName: string;
    };
    permissions: UserAuthorizationDTO;
    vpnFilter: VPNStoreStatusFilter;
    showApplicationPasswordDialog: boolean;
    applicationPassword: string;
    get vpnAppStore(): VPNAppStore;
    get getDevice(): VPNDeviceExtended;
    get getDevices(): VPNDeviceExtended[];
    get getPagination(): VPNPagination;
    get getDeviceStore(): VPNStoreDevices;
    get getDeviceMapLastUpdate(): number;
    get getProfiles(): VPNProfile[];
    get getProfilePagination(): VPNPagination;
    get getApplications(): VPNApplication[];
    get getApplicationPagination(): VPNPagination;
    get getGeneralPermissions(): UserAuthorizationDTO;
    get getVpnSpinnerLoading(): boolean;
    get getVpnStatusFilter(): ConnectionStatusDTO;
    get getVpnNameFilter(): string;
    SET_APPLICATION_PASSWORD(password: string): void;
    SET_SHOW_APPLICATION_PASSWORD_DIALOG(show: boolean): void;
    SET_DEVICES({ devices, rebuild }: {
        devices: any;
        rebuild: any;
    }): void;
    SET_DEVICE(device: any): void;
    ADD_PROFILE(profile: any): void;
    SET_PROFILES(profiles: any): void;
    EDIT_PROFILE(profile: any): void;
    SET_PROFILES_PAGINATION(pagination: any): void;
    DELETE_PROFILE(profile: any): void;
    STAR_PROFILE({ applicationProfile, starred }: {
        applicationProfile: VPNProfile;
        starred: boolean;
    }): void;
    SET_APPLICATIONS(applications: any): void;
    ADD_APPLICATION(application: any): void;
    REMOVE_APPLICATION(applicationID: any): void;
    PATCH_APPLICATION(application: any): void;
    PATCH_DEVICE(deviceToReset: any): void;
    SET_APPLICATION_PAGINATION(pagination: any): void;
    SET_DEVICE_PAGINATION(pagination: any): void;
    SET_DEVICE_TABLE_SORTBY(val: any): void;
    SET_DEVICE_TABLE_DESCENDING(val: any): void;
    SET_APPLICATION_PROFILE_FOR_ENDPOINT({ device, endpoint, applicationProfileName }: {
        device: any;
        endpoint: any;
        applicationProfileName: any;
    }): void;
    SET_GENERAL_PERMISSIONS(permissions: any): void;
    SET_GATEWAY_PERMISSIONS({ deviceId, permissions }: {
        deviceId: any;
        permissions: any;
    }): void;
    SET_GATEWAY_PERMISSIONS_DEVICE({ deviceId, permissions }: {
        deviceId: any;
        permissions: any;
    }): void;
    SET_ENDPOINTS_FOR_GATEWAY({ gatewayId, deviceLabel, endpoints, gateway_disable_virtual_ip, gateway_virtualnetwork_size, preferred_region, use_fallback_config }: {
        gatewayId: any;
        deviceLabel: any;
        endpoints: any;
        gateway_disable_virtual_ip: any;
        gateway_virtualnetwork_size: any;
        preferred_region: any;
        use_fallback_config: any;
    }): void;
    SET_ENDPOINTS_FOR_GATEWAY_DEVICE({ endpoints, gateway_disable_virtual_ip, gateway_virtualnetwork_size, preferred_region, use_fallback_config }: {
        endpoints: any;
        gateway_disable_virtual_ip: any;
        gateway_virtualnetwork_size: any;
        preferred_region: any;
        use_fallback_config: any;
    }): void;
    SET_ENDPOINT_FOR_GATEWAY({ deviceLabel, endpoint }: {
        deviceLabel: string;
        endpoint: VPNDeviceEndpoint;
    }): void;
    SET_ONLINE_STATUS_FOR_GATEWAY({ deviceLabel, online, gateway_disable_virtual_ip, gateway_virtualnetwork_size, preferred_region, use_fallback_config }: {
        deviceLabel: any;
        online: any;
        gateway_disable_virtual_ip: any;
        gateway_virtualnetwork_size: any;
        preferred_region: any;
        use_fallback_config: any;
    }): void;
    SET_ONLINE_STATUS_FOR_GATEWAY_DEVICE({ online, gateway_disable_virtual_ip, gateway_virtualnetwork_size, preferred_region, use_fallback_config }: {
        online: any;
        gateway_disable_virtual_ip: any;
        gateway_virtualnetwork_size: any;
        preferred_region: any;
        use_fallback_config: any;
    }): void;
    UPDATE_GATEWAY(data: {
        deviceLabel: string;
        newDevice: VPNDeviceExtended;
    }): void;
    FORCE_MAP_UPDATE(): void;
    postDeviceUpdateRequired(deviceName: string): void;
    REMOVE_ENDPOINT_FROM_GATEWAY({ deviceLabel, endpointName }: {
        deviceLabel: any;
        endpointName: any;
    }): void;
    SET_VPN_SPINNER_LOADING(val: any): void;
    SET_STATUS_FILTER(val: any): void;
    SET_FILTERS(val: IVpnDeviceFilters): void;
    setDeviceTableSortBy(val: any): void;
    setDeviceTableDescending(val: any): void;
    fetchDevices({ deviceName, singleDevice, rebuild, noCache, page, itemsPerPage }: {
        deviceName?: string;
        singleDevice: boolean;
        rebuild?: boolean;
        noCache?: boolean;
        page?: number;
        itemsPerPage?: number;
    }): Promise<void>;
    fetchDomainGateways(nameFilter?: string): Promise<{
        serverTimestamp: number;
        content: VPNDeviceDTO[];
    }>;
    fetchDeviceJsonActions(deviceId: any): Promise<VPNJsonActionDTO[]>;
    connectToGatewayEndpoint(data: {
        gatewayId: string;
        endpointId: string;
        otp: string;
    }): Promise<void>;
    disconnectFromGatewayEndpoint(data: {
        gatewayId: string;
        endpointId: string;
    }): Promise<void>;
    connectToAllGatewayEndpoints(data: {
        gatewayId: string;
        otp: string;
    }): Promise<void>;
    disconnectFromAllGatewayEndpoints(gatewayId: string): Promise<void>;
    resetVpnConnection(gatewayName: any): Promise<unknown>;
    fetchDevicesPermissions({ deviceIds, noCache }: {
        deviceIds: string[];
        noCache?: boolean;
    }): Promise<void>;
    fetchDevicePermissionsForDevice({ deviceId, noCache }: {
        deviceId: any;
        noCache: any;
    }): Promise<void>;
    fetchAllDevicesPermissions(): Promise<void>;
    private _fetchGateway;
    fetchGateway({ name, selectedDevice }: {
        name: string;
        selectedDevice?: boolean;
    }): Promise<VPNGatewayDTO>;
    updateGateway(data: any): Promise<unknown>;
    editOrCreateEndpoint({ gateway, endpoint }: {
        gateway: string;
        endpoint: Partial<VPNDeviceEndpoint>;
    }): Promise<void>;
    deleteEndpoint({ gateway, endpoint }: {
        gateway: string;
        endpoint: VPNDeviceEndpoint;
    }): Promise<void>;
    fetchEndpoints(): Promise<void>;
    activateDevice({ deviceId }: {
        deviceId: any;
    }): Promise<void>;
    setAutorenew({ deviceId, autorenew }: {
        deviceId: any;
        autorenew: any;
    }): Promise<void>;
    login(logoutFirst?: boolean): Promise<{
        name: string;
        domain: string;
        password: string;
        url: string;
        loginPath: string;
    }>;
    executeAction(action: {
        type: string;
        gateway: string;
        endpoint: string;
        application: string;
        endpointIp?: string;
        clientlessApplication?: boolean;
        openNewTab?: boolean;
        onlyConnect?: boolean;
        circuitBreaker?: {
            abortAction: boolean;
            canAbortAction: boolean;
        };
    }): Promise<void | VpnExecuteActionOutDTO>;
    setApplicationPassword(action: {
        type: string;
        password: string;
    }): Promise<void>;
    credentialRequest(): Promise<unknown>;
    getProfileById(id: any): Promise<string>;
    fetchApplicationProfiles({ page, pageSize, ignoreStore, search }: {
        page?: number;
        pageSize?: number;
        ignoreStore?: boolean;
        search?: string;
    }): Promise<VPNProfile[]>;
    fetchApplicationProfile({ page, pageSize, ignoreStore, name }: {
        page?: number;
        pageSize?: number;
        ignoreStore?: boolean;
        name?: string;
    }): Promise<VPNProfile>;
    createApplicationProfile({ applicationProfile }: {
        applicationProfile: any;
    }): Promise<any>;
    editApplicationProfiles({ applicationProfile }: {
        applicationProfile: any;
    }): Promise<unknown>;
    deleteApplicationProfile(applicationProfile: VPNProfile): Promise<any>;
    starApplicationProfile({ applicationProfile, starred }: {
        applicationProfile: VPNProfile;
        starred: boolean;
    }): Promise<void>;
    fetchApplicationsNames({ page, pageSize, nameFilter }: {
        page: number;
        pageSize: number;
        nameFilter?: string;
    }): Promise<VPNApplication[]>;
    fetchApplications({ page, pageSize, search }: {
        page: any;
        pageSize: any;
        search: any;
    }): Promise<import("../interfaces/VPNDevice").ActionDTO>;
    fetchApplicationDetails(applicationName: any): Promise<VPNApplication>;
    createApplication(application: VPNApplication): Promise<unknown>;
    editApplication(application: VPNApplication): Promise<import("../interfaces/VPNDevice").ActionFullDTO>;
    deleteApplication({ application }: {
        application: any;
    }): Promise<void>;
    fetchUserPreferences({ username }: {
        username: any;
    }): Promise<import("../interfaces/VPNDevice").UserPreferenceApplicationDTO>;
    addApplicationToUserPreferences({ username, gateway, endpoint, applicationProfile, application }: {
        username: any;
        gateway: any;
        endpoint: any;
        applicationProfile: any;
        application: any;
    }): Promise<any>;
    deleteApplicationFromUserPreferences({ vpnUserpreferenceId }: {
        vpnUserpreferenceId: any;
    }): Promise<any>;
    connectAppRedirect({ url, data }: {
        url: any;
        data: any;
    }): Promise<void>;
    fetchDeviceLogs(filter: {
        device: VPNDevice;
        fromTimestamp: number;
        toTimestamp: number;
        limit: number;
    }): Promise<any[]>;
    testMe(val: boolean): void;
    setVpnSpinnerLoading(val: boolean): void;
    setStatusFilter(val: any): void;
    setFilters(val: IVpnDeviceFilters): void;
    addStatusFilterValues(data: [{
        key: any;
        value: any;
    }]): void;
    requestResetConfirmation(device: VPNDevice): Promise<boolean>;
    checkOTP(args: {
        gatewayId: string;
        otp: string;
    }): Promise<boolean>;
    fetchRegions(): Promise<string[]>;
}
