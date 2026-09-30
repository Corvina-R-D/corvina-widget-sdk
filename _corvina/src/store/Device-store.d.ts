declare const _default: {
    namespaced: boolean;
    state: {
        corvinaDevices: any[];
        devices: any[];
        deviceListPagination: {};
        device: {};
        tags: any[];
        deviceGroups: {
            data: any[];
            pagination: {};
            listIdentifier: number;
        };
        deviceDetailsModalOpen: boolean;
        deviceDetailsModalBusy: boolean;
        wsError: boolean;
        devicesGeoBounds: {};
    };
    mutations: {
        SAVE_DEVICES(state: any, devices: any): void;
        SAVE_DEVICE_ALARMS(state: any, { deviceId, alarms }: {
            deviceId: any;
            alarms: any;
        }): void;
        SAVE_APPEND_DEVICES(state: any, devices: any): void;
        SAVE_DEVICE_LIST_PAGINATION(state: any, devicesPagination: any): void;
        RESET_DEVICE_LIST_PAGINATION(state: any): void;
        RESET_DEVICE(state: any): void;
        DELETE_DEVICE(state: any, deviceId: any): void;
        UPDATE_DEVICE(state: any, newDevice: any): void;
        SET_DEVICE(state: any, device: any): void;
        SET_CORVINA_DEVICES(state: any, devices: any): void;
        SET_DEVICES_GEO_BOUNDS(state: any, newBounds: any): void;
        SAVE_TAGS(state: any, tags: any): void;
        SAVE_DEVICE_GROUPS_DATA_TABLE(state: any, deviceGroups: any): void;
        SAVE_APPEND_DEVICE_GROUPS_DATA_TABLE(state: any, deviceGroups: any): void;
        SAVE_DEVICE_GROUPS_PAGINATION(state: any, pagination: any): void;
        SET_DEVICE_GROUPS_TABLE_PAGE(state: any, page: any): void;
        RESET_DEVICE_GROUP_LIST(state: any): void;
        RESET_DEVICE_GROUPS(state: any): void;
        LOCAL_ADD_DEVICE_TO_GROUP(state: any, { deviceId, groupName }: {
            deviceId: any;
            groupName: any;
        }): void;
        LOCAL_REMOVE_DEVICE_FROM_GROUP(state: any, { deviceId, groupName }: {
            deviceId: any;
            groupName: any;
        }): void;
        LOCAL_REMOVE_GROUP(state: any, { groupName }: {
            groupName: any;
        }): void;
        LOCAL_RENAME_GROUP(state: any, { oldGroupName, newGroupName }: {
            oldGroupName: any;
            newGroupName: any;
        }): void;
        OPEN_EDIT_MODAL(state: any): void;
        CLOSE_EDIT_MODAL(state: any): void;
        SET_MODAL_BUSY(state: any, value: any): void;
        UPDATE_CONNECTED(state: any, deviceData: any): void;
        UPDATE_CONFIGURATION(state: any, newConfiguration: any): void;
        SET_WS_ERROR_STATE(state: any, error: any): void;
    };
    actions: {
        setModalBusy(context: any, value: boolean): void;
        openModal(context: any): void;
        closeModal(context: any): void;
        resetPagination(context: any): void;
        resetDevices(context: any): void;
        checkDeviceExists(context: any, name: string): Promise<boolean>;
        getDevice(context: any, deviceId: string): Promise<{
            value: import("../interfaces/device").DeviceIn;
        } | import("../interfaces/device").DeviceIn>;
        getDeviceByLabel(context: any, deviceLabel: string): Promise<import("../interfaces/device").DeviceOutDTO>;
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
        fetchDevices(context: any, filter?: import("./Device-store-actions").VuexFilterFetchModels): Promise<any>;
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
        }): Promise<import("../interfaces/device").DeviceSearchInDTO>;
        fetchAllDevicesViewport(context: any): Promise<import("../interfaces/device").GeoBounds | null>;
        setEmptyPagination(context: any): void;
        fetchDeviceById(context: any, filter?: {
            deviceId: string;
        }): Promise<import("../interfaces/device").DeviceIn>;
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
        createDeviceGroup(context: any, securityPolicyData: import("../interfaces/securitypolicy").SecurityPolicyOutDTO): Promise<import("../interfaces/securitypolicy").SecurityPolicyInDTO>;
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
        }): Promise<import("../interfaces/device").DeviceRepositoryDTO[]>;
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
        fetchCorvinaDevices(context: any, filter: any): Promise<import("../interfaces/device").DeviceRepositoryDTO[]>;
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
    getters: {
        getDevices(state: any): Array<import("../interfaces/device").DeviceIn>;
        getCorvinaDevices(state: any): any;
        getDeviceById(state: any): (deviceId: string) => import("../interfaces/device").DeviceIn;
        getDeviceByLabel(state: any): (deviceLabel: string) => import("../interfaces/device").DeviceIn;
        getDeviceListPagination(state: any): any;
        getDevice(state: any): import("../interfaces/device").DeviceIn;
        getDevicesGeoBounds(state: any): import("../interfaces/device").GeoBounds;
        getTags(state: any): any;
        getDeviceGroups(state: any): any;
        getDeviceDetailsModalOpen(state: any): any;
        getDeviceDetailsModalBusy(state: any): any;
        getWSError(state: any): any;
    };
};
export default _default;
