export interface IAppCustomizations {
    groupPoliciesDisabled: boolean;
    showMapByDefault: boolean;
    hideDeviceSerialNumber: boolean;
    hideDeviceDescription: boolean;
    hideVpnExportConfig: boolean;
}
export interface IAppFeatures {
    structs: boolean;
    highFreq: boolean;
    deLanguage: boolean;
    esLanguage: boolean;
    frLanguage: boolean;
    jpLanguage: boolean;
    developerUI: boolean;
    formulaMapping: boolean;
    developerUI_DEFreeGridInfo: boolean;
    ipFilter: boolean;
    loginSplashVideoBackground: boolean;
    editorInspector: boolean;
    VPNnetworkSize: boolean;
    showVpnIp: boolean;
    deviceServiceAccountAssociation: boolean;
    credits: boolean;
    deviceTableWidget: boolean;
    mapAlarmWidget: boolean;
    widgetPermissions: boolean;
    showHiddenApps: boolean;
}
export declare const AppFeatures: IAppFeatures & IAppCustomizations;
/** Returns the editable features for this brand (or already saved in local storage)*/
export declare function availableFeatures(): string[];
export declare function initAppFeatures(): void;
export declare enum ClientOs {
    UNKNOWN = "",
    WINDOWS = "Win",
    LINUX = "Lin",
    MAC = "Mac",
    ANDROID = "Android",
    IOS = "iOS"
}
export declare function browserOS(): Promise<ClientOs>;
