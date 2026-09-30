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
export type VpnUsageHistoryAggregatedDTO = {
    numOfSeconds: number;
};
