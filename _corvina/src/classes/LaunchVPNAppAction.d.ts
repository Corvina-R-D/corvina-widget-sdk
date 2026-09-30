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
    constructor(args: any);
    serialize(): import("@/corvina-model").IWidgetSerialization;
    execute(): Promise<void>;
}
export interface ILaunchVPNAppParams {
    application: Value<VPNAppConfiguration | string>;
    openNewTab: boolean;
}
