import { ActionWgt, Value } from "@/corvina-model";
export interface VPNAppConfiguration {
    gateway: {
        gatewayId: string;
        deviceId: string;
    };
    endpoint: {
        gateway: string;
        name: string;
        ID: string;
    };
    applicationName: string;
}
export default class LaunchVPNAppAction extends ActionWgt {
    actionType: string;
    params: ILaunchVPNAppParams;
    deviceName: Value<string | null>;
    gatewayName: Value<string | null>;
    applicationName: Value<string | null>;
    constructor(args: any);
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private updateGateway;
    private updateApplicationProperty;
    get deviceNameString(): string | null;
    get gatewayNameString(): string | null;
    get applicationNameString(): string | null;
    getPropertyValue(prop: string): any;
    private removeUndefinedValues;
    serialize(): import("@/corvina-model").IWidgetSerialization;
    execute(): Promise<void>;
}
export interface ILaunchVPNAppParams {
    application: Value<VPNAppConfiguration | string>;
    openNewTab: boolean;
}
