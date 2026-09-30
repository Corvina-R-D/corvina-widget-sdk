declare const _default: {
    namespaced: boolean;
    state: {
        deviceData: {
            deviceCode: string;
            deviceAlias: string;
            position: number[];
            description: string;
        };
        onboardingStep: number;
        model: {};
        preset: {};
        device: {};
        areTagsAvailable: boolean;
    };
    mutations: {
        SET_PRESET(state: any, preset: any): void;
        SET_MODEL(state: any, model: any): void;
        SET_DEVICE_DATA(state: any, { key, value }: {
            key: any;
            value: any;
        }): void;
        SAVE_DEVICE(state: any, device: any): void;
        SET_ARE_TAGS_AVAILABLE(state: any, value: any): void;
        SET_DEVICE_POSITION(state: any, position: any): void;
        RESET_STATE(state: any): void;
        SET_DEVICE_COORDINATE(state: any, { index, value }: {
            index: any;
            value: any;
        }): void;
        SET_ONBOARDING_STEP(state: any, step: any): void;
    };
    actions: {
        setPreset(context: any, preset: any): void;
        setModel(context: any, model: any): void;
        setDeviceData(context: any, { key, value }: {
            key: any;
            value: any;
        }): void;
        applyDeviceConfiguration(context: any, { deviceId, presetId }: {
            deviceId: any;
            presetId: any;
        }): Promise<void>;
        saveDevice(context: any, device: any): void;
        fetchDeviceByHwId(context: any, deviceId: string): Promise<import("../interfaces/device").DeviceIn>;
        checkActivationCode(context: any, activationCode: any): Promise<import("../interfaces/devicelicence").ActivationLicenseInDTO>;
        editDevice(context: any, { deviceId, newLabel, newDescription }: {
            deviceId: string;
            newLabel: string;
            newDescription?: string;
        }): Promise<void>;
        activateDevice(context: any, deviceData: import("../interfaces/device").DataDevice): Promise<import("../interfaces/devicelicence").ActivateDeviceLicenseInDTO>;
        addPositionToDevice(context: any, { deviceId, position }: {
            deviceId: any;
            position: any;
        }): Promise<void>;
        setDevicePosition(context: any, position: any): void;
        setAreTagsAvailable(context: any, value: any): void;
        resetState(context: any): void;
        setDeviceCoordinate(context: any, { index, value }: {
            index: any;
            value: any;
        }): void;
        setOnboardingStep(context: any, step: any): void;
    };
    getters: {
        getDeviceData(state: any): any;
        getModel(state: any): any;
        getPreset(state: any): any;
        getDevice(state: any): any;
        getAreTagsAvailable(state: any): any;
        getOnboardingStep(state: any): any;
    };
};
export default _default;
