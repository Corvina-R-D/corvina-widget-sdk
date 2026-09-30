import { SecurityPolicyOutDTO } from '../interfaces/securitypolicy';
import { DeviceRepositoryDTO, DeviceSearchInDTO, GeoBounds } from "@/interfaces/device";
export interface VuexFilterFetchModels {
    search?: string;
    page?: number;
    pageSize?: number;
    append?: boolean;
    searchField?: string;
    searchValue?: string;
    searchFields?: string[];
    searchValues?: string[];
    orderBy?: string;
    orderDir?: 'ASC' | 'DESC' | 'asc' | 'desc';
    nosave: boolean;
}
declare const _default: {
    setModalBusy(context: any, value: boolean): void;
    openModal(context: any): void;
    closeModal(context: any): void;
    resetPagination(context: any): void;
    resetDevices(context: any): void;
    checkDeviceExists(context: any, name: string): Promise<boolean>;
    getDevice(context: any, deviceId: string): Promise<{
        value: import("@/interfaces/device").DeviceIn;
    } | import("@/interfaces/device").DeviceIn>;
    getDeviceByLabel(context: any, deviceLabel: string): Promise<import("@/interfaces/device").DeviceOutDTO>;
    getUnknownDevicesByLabelAndSave(context: any, unknowDevicesLabel: any): Promise<any[]>;
    getUnkowDevicesByIDAndSave(context: any, unknowDevicesId: any): Promise<void>;
    checkOrganizationDeviceExists(context: any, name: string): Promise<boolean>;
    processDevices(context: any, params: {
        devices: any;
        append: any;
        nosave: any;
    }): Promise<any>;
    updateDeviceAlarms(context: any, { deviceId, alarms }: {
        deviceId: any;
        alarms: any;
    }): Promise<void>;
    fetchDevices(context: any, filter?: VuexFilterFetchModels): Promise<any>;
    hasDeviceWithModelMapping(context: any, { modelId, presetName }: {
        modelId: string;
        presetName?: string;
    }): Promise<boolean>;
    searchDevices(context: any, filter: {
        geoCenter: {
            lat: number;
            lon: number;
        };
        geoRect: {
            topLeft: {
                lat: number;
                lon: number;
            };
            bottomRight: {
                lat: number;
                lon: number;
            };
        };
        data: string;
        page: number;
        pageSize: number;
        zoomLevel: number;
        vpn: boolean;
        withAlarms: boolean;
    }): Promise<DeviceSearchInDTO>;
    fetchAllDevicesViewport(context: any): Promise<GeoBounds | null>;
    setEmptyPagination(context: any): void;
    fetchDeviceById(context: any, filter?: {
        deviceId: string;
    }): Promise<import("@/interfaces/device").DeviceIn>;
    setDevice(context: any, device: any): void;
    resetDevice(context: any): void;
    fetchTagsFromDevice(context: any, deviceId: any): Promise<import("../interfaces/IPlatformController").DeviceTagInfoDTO[]>;
    saveTags(context: any, tags: any): void;
    fetchDeviceGroups(context: any, filter?: {
        page: number;
        pageSize: number;
    }): Promise<any>;
    fetchDeviceGroupsDataTable(context: any, filter?: {
        page: number;
        pageSize: number;
        append: boolean;
    }): Promise<any>;
    searchGroupsDataTable(context: any, filter?: {
        page: number;
        pageSize: number;
        append: boolean;
    }): Promise<any>;
    resetDeviceGroup(context: any): Promise<void>;
    deleteDevice(context: any, deviceId: any): Promise<void>;
    licenseDeleteDevice(context: any, { deviceLicenseId, deviceId }: {
        deviceLicenseId: any;
        deviceId: any;
    }): Promise<void>;
    fetchDeviceLicense(context: any, deviceId: any): Promise<any>;
    createDeviceGroup(context: any, securityPolicyData: SecurityPolicyOutDTO): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    fetchDeviceGroup(context: any, securityPolicyGroupId: any): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    updateDeviceGroup(context: any, { securityPolicyGroupId, securityPolicyGroupData }: {
        securityPolicyGroupId: any;
        securityPolicyGroupData: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    deleteDeviceGroup(context: any, securityPolicyGroupId: any): Promise<any>;
    addDeviceToDeviceGroup(context: any, { securityPolicyGroupId, deviceId }: {
        securityPolicyGroupId: any;
        deviceId: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    removeDeviceFromDeviceGroup(context: any, { securityPolicyGroupId, deviceId }: {
        securityPolicyGroupId: any;
        deviceId: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
    fetchDeviceGroupsByParentId(context: any, { deviceGroupId, filter }: {
        deviceGroupId: any;
        filter: any;
    }): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO[]>;
    fetchDeviceByGroupsParentId(context: any, { deviceGroupId, filter }: {
        deviceGroupId: any;
        filter: any;
    }): Promise<DeviceRepositoryDTO[]>;
    localAddDeviceToGroup(context: any, { deviceId, groupName }: {
        deviceId: any;
        groupName: any;
    }): void;
    localRemoveDeviceFromGroup(context: any, { deviceId, groupName }: {
        deviceId: any;
        groupName: any;
    }): void;
    localRemoveGroup(context: any, { groupName }: {
        groupName: any;
    }): void;
    localRenameGroup(context: any, { oldGroupName, newGroupName }: {
        oldGroupName: any;
        newGroupName: any;
    }): void;
    fetchCorvinaDevices(context: any, filter: any): Promise<DeviceRepositoryDTO[]>;
    setDeviceGroupsTablePage(context: any, page: any): void;
    resetDeviceGroupList(context: any): void;
    updateDevice(context: any, newDevice: any): void;
    startWebsocket(context: any, { callback }: {
        callback: any;
    }): Promise<void>;
    closeWebsocket(context: any, { callback }: {
        callback: any;
    }): void;
    updateWebsocketOrganization(context: any): void;
    setDeviceConnected(context: any, d: {
        deviceId: any;
        connected: any;
    }): void;
    updateConfiguration(context: any, newConfiguration: any): void;
    resyncDeviceStatus(context: any, deviceId: any): Promise<void>;
    getDeviceConnectionDetails(context: any, filter: {
        deviceLogicalId: string;
        since: number;
        to: number;
        limit: number;
    }): Promise<unknown>;
};
export default _default;
