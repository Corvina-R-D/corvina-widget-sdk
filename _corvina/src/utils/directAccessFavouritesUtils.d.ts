import { VPNApplicationType } from '../interfaces/VPNDevice';
export declare function mergeDashboardPreferenceIds(results: Array<{
    content?: {
        dashboardId: string;
    }[];
} | undefined>): string[];
export declare function mergeVpnPreferencesByPath<T extends {
    gatewayId: string;
    endpointId: string;
    application: string;
}>(results: Array<{
    content?: T[];
} | undefined>): T[];
export declare function excludeCustomVpnApplications(actionNames: string[], applications: {
    label: string;
    applicationType?: VPNApplicationType;
}[]): string[];
export declare function excludeGroupDerivedItems<T>(items: T[], additionalInfo: Record<string | number, {
    groups?: any[];
}>, keyOf: (item: T) => string | number): T[];
export declare function mergeAppPreferencesByKey<T extends {
    appKey: string;
}>(results: Array<{
    content?: T[];
} | undefined>): T[];
export declare function appHasEnablingRoleSelected(app: {
    key: string;
}, appStoreRoles?: {
    ownerRef?: string;
}[]): boolean;
