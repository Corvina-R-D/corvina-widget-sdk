import { DataDevice } from '@/interfaces/device';
declare const _default: {
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
    fetchDeviceByHwId(context: any, deviceId: string): Promise<import("@/interfaces/device").DeviceIn>;
    checkActivationCode(context: any, activationCode: any): Promise<import("../interfaces/devicelicence").ActivationLicenseInDTO>;
    editDevice(context: any, { deviceId, newLabel, newDescription }: {
        deviceId: string;
        newLabel: string;
        newDescription?: string;
    }): Promise<void>;
    activateDevice(context: any, deviceData: DataDevice): Promise<import("../interfaces/devicelicence").ActivateDeviceLicenseInDTO>;
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
export default _default;
