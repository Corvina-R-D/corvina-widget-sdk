declare const _default: {
    setDragging(context: any, value: any): void;
    setDeviceId(context: any, value: any): void;
    setPresetId(context: any, value: any): void;
    applyDeviceConfiguration(context: any, { deviceId, presetId }: {
        deviceId: any;
        presetId: any;
    }): Promise<void>;
    applyDeviceEmptyConfiguration(context: any, deviceId: any): Promise<import("axios").AxiosResponse<string, any, {}, any>>;
};
export default _default;
