export interface ActivateDeviceLicenseOutDTO {
    activationKey: string;
    alias: string;
    orgResourceId: string;
}
export interface ActivateDeviceLicenseInDTO {
    deviceId: string;
    activationKey: string;
    alias: string;
    apiKey: string;
    clientName: string;
    deleted: boolean;
    id: number;
    label: string;
    logicalId: string;
    notes: string;
    orgResourceId: string;
    platformPairingApiUrl: string;
    realm: string;
    serialNumber: string;
    used: boolean;
    toDateVpn: string;
    fromDateVpn: string;
    numOfSecondsAutoRenewVpn: number;
    hasPassword?: boolean;
}
export interface UpdateDevicePasswordInDTO {
    password: string;
}
export interface ActivationLicenseInDTO {
    apiKey: string;
    logicalId: string;
    orgResourceId: string;
    platformPairingApiUrl: string;
    realm: string;
}
export interface ActivateDeviceLicenseVPNInDTO {
    autorenew: boolean;
    logicalId: string;
    numOfSeconds: number;
    orgResourceId: string;
}
export interface VpnLicensePlansDTO {
    phase: number;
    enabledModes: string[];
}
export interface VpnBulkRenewalEstimateDTO {
    deviceCount: number;
    renewalMode: string;
    creditsPerDevice: number;
    totalCreditsEstimated: number;
    hasEnoughCredits: boolean;
}
export interface VpnBulkRenewalDTO {
    operationId?: string;
    orgResourceId: string;
    renewalMode: string;
    devicesRequested: number;
    devicesSucceeded: number;
    devicesFailed: number;
    totalCreditsCharged: number;
    results: Array<VpnBulkRenewalResultDTO>;
    entityId?: number;
    entityStringId?: string;
    entityType?: string;
}
export interface VpnBulkRenewalResultDTO {
    logicalId: string;
    success: boolean;
    creditsCharged: number;
    errorCode?: string;
    errorMessage?: string;
}
export interface VpnBulkRenewMigratedDTO {
    operationId?: string;
    orgResourceId: string;
    renewalMode: string;
    devicesRenewed: number;
}
export type VpnUsageHistoryAggregatedDTO = {
    numOfSeconds: number;
};
