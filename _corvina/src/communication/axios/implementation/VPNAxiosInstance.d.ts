import AbstractAxiosInstance from './AbstractAxiosInstance';
import { DeviceLogsDTO, UserPreferenceApplicationDTO, VPNDeviceDTO, VPNDeviceEndpoint, VPNJsonActionDTO, VpnExecuteActionOutDTO, VPNRegionsDTO } from '@/interfaces/VPNDevice';
import { ActionProfileRequestDTO, ActionDTO, ActionFullDTO, VPNEndpointDTO, VPNGatewayDTO } from "@/interfaces/VPNDevice";
import { ClientOs } from '../../../utils/Features';
declare class VPNAxiosInstance extends AbstractAxiosInstance {
    constructor();
    static aliveTimer: any;
    private formatClientOS;
    fetchEndpoints(orgResId: string, data: any): Promise<void>;
    fetchDomainGateways(orgResourceId: any, filter: any): Promise<{
        serverTimestamp: number;
        content: VPNDeviceDTO[];
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
    downloadEdgeConfigFile(gateway: string, domain: string, activationKey: string): Promise<{
        blob: Blob;
        fileName: any;
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
    fetchUserPreferences(username: string): Promise<UserPreferenceApplicationDTO>;
    addApplicationToUserPreferences(username: string, gatewayName: string, endpointName: string, applicationProfile: string, applicationName: string): Promise<any>;
    deleteApplicationFromUserPreferences(vpnUserpreferenceId: number): Promise<any>;
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
