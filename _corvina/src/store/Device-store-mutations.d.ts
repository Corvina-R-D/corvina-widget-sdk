declare const _default: {
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
export default _default;
