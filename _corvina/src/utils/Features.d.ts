import { FeatureFlagsOutDTO } from '@/interfaces/featureFlags';
export type AppFeature = keyof (IAppFeatures & IAppCustomizations);
export interface IAppCustomizations {
    groupPoliciesDisabled: boolean;
    showMapByDefault: boolean;
    hideDeviceSerialNumber: boolean;
    hideDeviceDescription: boolean;
    hideVpnExportConfig: boolean;
    hideStore: boolean;
    allowTryCustomApplication: boolean;
    vpnL2Support: boolean;
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
    showHiddenApps: boolean;
    subOrgAndBulkSharing: boolean;
    absoluteLayout: boolean;
    vpnRenewal: boolean;
    vpnExpirationForecast: boolean;
    activationCodePassword: boolean;
    allowSocialLoginOnly: boolean;
    /** Dashboards menu entry and home open corvina-dashboard; classic routes stay reachable by link. Per environment: `global.featureFlags` in corvina-k8s. */
    dashboardNew: boolean;
    /** corvina-dashboard only: offers Radio Button, Edit Box, Combo Box, Check Box and Multi State Image in the editor's gallery. */
    experimentalJMWidgets: boolean;
}
export declare const AppFeatures: Record<AppFeature, boolean>;
/** Returns the editable features for this brand (or already saved in local storage)*/
export declare function availableFeatures(): AppFeature[];
/** Returns true if the feature is locked by the backend and cannot be manually toggled */
export declare function isLockedByBackend(feature: string): boolean;
/** The organization's flags fetch in flight, for the few readers that must not decide before it. */
export declare function trackCoreFeatureFlags(load: Promise<unknown>): void;
/** Resolves once the organization's flags are applied, or after `timeoutMs` if the fetch hangs. */
export declare function coreFeatureFlagsLoaded(timeoutMs?: number): Promise<void>;
export declare function applyCoreFeatureFlagsOverride(featureFlags?: FeatureFlagsOutDTO): void;
export declare function initAppFeatures(): void;
/** CTRL+ALT+SHIFT+E / D / S, by key code; corvina-dashboard forwards them from its iframe. */
export declare function runFeatureShortcut(code: string): void;
export declare enum ClientOs {
    UNKNOWN = "",
    WINDOWS = "Win",
    LINUX = "Lin",
    MAC = "Mac",
    ANDROID = "Android",
    IOS = "iOS"
}
export declare function browserOS(): Promise<ClientOs>;
