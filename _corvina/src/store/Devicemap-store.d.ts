declare const _default: {
    namespaced: boolean;
    state: {
        deviceId: string;
        presetId: string;
        isDragging: boolean;
    };
    mutations: {
        SET_DRAGGING(state: any, value: any): void;
        SET_DEVICE_ID(state: any, value: any): void;
        SET_PRESET_ID(state: any, value: any): void;
    };
    actions: {
        setDragging(context: any, value: any): void;
        setDeviceId(context: any, value: any): void;
        setPresetId(context: any, value: any): void;
        applyDeviceConfiguration(context: any, { deviceId, presetId }: {
            deviceId: any;
            presetId: any;
        }): Promise<void>;
        applyDeviceEmptyConfiguration(context: any, deviceId: any): Promise<import("axios").AxiosResponse<string, any, {}, any>>;
    };
    getters: {
        getDeviceId(state: any): any;
        getPresetId(state: any): any;
        getDragBoolean(state: any): any;
    };
};
export default _default;
