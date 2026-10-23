import AbstractAxiosInstance from './AbstractAxiosInstance';
import { DeviceLogsDTO, VPNDeviceDTO, VPNDeviceEndpoint, VPNJsonActionDTO, VpnExecuteActionOutDTO, VPNRegionsDTO, VPNRenewalsDTO, OpenVpnConfigBrand } from '@/interfaces/VPNDevice';
import { ActionProfileRequestDTO, ActionDTO, ActionFullDTO, VPNEndpointDTO, VPNGatewayDTO } from "@/interfaces/VPNDevice";
import { ClientOs } from '../../../utils/Features';
declare class VPNAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    static aliveTimer: any;
    private formatClientOS;
    fetchEndpoints(orgResId: string, data: any): Promise<void>;
    fetchDomainGateways(orgResourceId: any, filter: any): Promise<{
        serverTimestamp: number;
        content: VPNDeviceDTO[];
    }>;
    deviceStats({ orgResourceId, orderBy, orderDir, page, pageSize, organizationFilter, organizations, deviceIds, fromDateVpn, toDateVpn, includeSubOrgs }: {
        orgResourceId: string;
        orderBy?: string;
        orderDir?: string;
        page?: number;
        pageSize?: number;
        organizationFilter?: string;
        organizations?: string[];
        deviceIds?: string[];
        fromDateVpn?: string;
        toDateVpn?: string;
        includeSubOrgs?: boolean;
    }): Promise<{
        content: VPNRenewalsDTO[];
        size: number;
        last: boolean;
        number: number;
        totalElements: number;
        totalPages: number;
    }>;
    fetchGateway(orgResourceId: any, deviceLabel: string): Promise<VPNGatewayDTO>;
    postEndpoint(newEndpoint: VPNEndpointDTO): Promise<unknown>;
    postGatewayPosition(gateway: string, domain: string, latitude: string, longitude: string): Promise<unknown>;
    patchGateway(gateway: string, domain: string, data: {
        gateway_disable_virtual_ip: any;
        gateway_virtualnetwork_size: any;
        policies: any;
    }): Promise<unknown>;
    cloneGateway(gateway: string, domain: string, originDeviceId: number): Promise<unknown>;
    private postForFile;
    private parseContentDispositionFileName;
    downloadEdgeConfigFile(gateway: string, domain: string, activationKey: string): Promise<{
        blob: Blob;
        fileName: string;
    }>;
    downloadOpenVpnConfigFile(gateway: string, domain: string, brand: OpenVpnConfigBrand, activationKey: string): Promise<{
        blob: Blob;
        fileName: string;
    }>;
    deleteEndpoint({ gateway, domain, endpoint }: {
        gateway: string;
        domain: string;
        endpoint: VPNDeviceEndpoint;
    }): Promise<any>;
    credentialsRequest(data: {
        name: any;
        domain: any;
    }): Promise<unknown>;
    fetchApplicationProfiles(orgResourceId: any, filter: any, name?: string | null): Promise<any>;
    fetchApplicationProfileDetails(orgResourceId: any, applicationProfile: any): Promise<any>;
    logout(data: {
        originalUrl: string;
    }): Promise<void>;
    login(data: {
        url: string;
        loginPath: string;
        name: string;
        password: string;
        domain: string;
        originalUrl: string;
        originalLoginPath: string;
    }): Promise<void>;
    createApplicationProfile(orgResourceId: string, applicationProfile: ActionProfileRequestDTO): Promise<unknown>;
    editApplicationProfile(orgResourceId: any, applicationProfile: ActionProfileRequestDTO): Promise<unknown>;
    deleteApplicationProfile(orgResourceId: any, applicationProfile: any): Promise<any>;
    fetchApplications(orgResourceId: any, filter: any): Promise<ActionDTO>;
    fetchApplicationDetails(orgResourceId: any, appName: string): Promise<ActionFullDTO>;
    createApplication(orgResourceId: any, data: any): Promise<unknown>;
    editApplication(orgResourceId: any, data: ActionFullDTO): Promise<ActionFullDTO>;
    deleteApplication(orgResourceId: any, actionName: string): Promise<any>;
    executeAction(gatewayName: string, endpointName: string, actionName: string, clientOs: ClientOs): Promise<VpnExecuteActionOutDTO>;
    executeActionOnDomain(orgResourceId: string, gatewayName: string, endpointName: string, actionName: string, clientOs: ClientOs): Promise<VpnExecuteActionOutDTO>;
    setApplicationPassword(value: {
        type: string;
        password: string;
    }): Promise<any>;
    connectAppRedirect(url: any, data: any): Promise<unknown>;
    fetchDeviceLogs(gatewayName: string, orgResourceId: string, fromTimestamp: number, toTimestamp: number, limit?: number): Promise<DeviceLogsDTO[]>;
    fetchDeviceJsonActions(deviceId: string, clientOs: ClientOs): Promise<VPNJsonActionDTO[]>;
    connectToAllGatewayEndpoints(gatewayId: string, clientOs: ClientOs, otp: string): Promise<unknown>;
    connectToGatewayEndpoint(gatewayId: string, endpointId: string, clientOs: ClientOs, otp: string): Promise<unknown>;
    disconnectFromAllGatewayEndpoints(gatewayId: string): Promise<unknown>;
    disconnectFromGatewayEndpoint(gatewayId: string, endpointId: string): Promise<unknown>;
    resetVpnConnection(gatewayName: string): Promise<unknown>;
    getCompanionAppInfo(): Promise<unknown>;
    checkOTPPassword(gatewayId: string, otp: string): Promise<unknown>;
    fetchRegions(): Promise<VPNRegionsDTO>;
}
declare const _default: VPNAxiosInstance;
export default _default;
