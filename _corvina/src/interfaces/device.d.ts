import PaginationQueryParamsDTO from './commons/PaginationQueryParamsDTO';
import { AlarmIn } from "./alarm";
import { PaginatedResponse } from "@/communication/axios/model/generic";
export interface DeviceIn {
    id: string;
    realmId: string;
    name: string;
    label: string;
    deviceId: string;
    presetId: string;
    creationDate: number;
    connected: boolean;
    position: GeoPoint;
    configurationSent: boolean;
    orgResourceId: string;
    configurationApplied: boolean;
    modelId: string;
    groups: string[];
    attributes?: {
        defaultDashboardId?: string;
        geoLocation?: number[];
    };
    alarms: AlarmIn[];
    modelName: string;
    modelVersion: string;
    presetName: string;
    maxSeverity?: number;
    vpnName: string;
    logicalId?: string;
    serverTimetsamp?: number;
    description?: string;
    serialNumber?: string;
}
export interface DeviceMapMarker {
    deviceId: string;
    label: string;
    connected: boolean;
    attributes?: {
        geoLocation?: number[];
    };
    maxSeverity?: number;
}
export interface DeviceInDTO extends PaginatedResponse {
    data: DeviceIn[];
    serverTimestamp?: number;
}
export interface DataDevice {
    deviceCode: string;
    deviceAlias: string;
    position: number[];
    description?: string;
    serialNumber?: string;
}
export interface GeoPoint {
    lat: number;
    lon: number;
}
export interface DeviceCoreInDTO {
    alias: string;
    hwId: string;
    id: number;
    label: string;
}
export interface DeviceOutDTO {
    id: number;
    alias: string;
    label: string;
    hwId: string;
    orgResourceId: string;
}
export interface DeviceUpdateDTO {
    label?: string;
    description?: string;
    serialNumber?: string;
}
export interface Realm {
    id: number;
    name: string;
    deleted: boolean;
}
export interface DeviceRepositoryDTO {
    alias: string;
    deleted: boolean;
    deviceAlias: string;
    hwId: string;
    id: string;
    label: string;
    realm: Realm;
    securityPolicyGroups: any[];
    vpnName: string;
}
export interface DeviceQueryParamsDTO extends PaginationQueryParamsDTO {
    deviceAlias?: string;
    deviceHwId?: string;
    deviceId?: string;
    securityPolicyGroupId?: string;
}
export interface DeviceSearchParamsDTO extends PaginationQueryParamsDTO {
    data?: string;
    scopedOrganization?: string;
    orderBy?: string;
    geoLocation?: {
        lat: number;
        lon: number;
    };
    geoLocationDistance?: string;
    geoHashGridPrecision?: number;
    geoTileGridPrecision?: number;
    geoBoundsTopLeft?: number[];
    geoBoundsBottomRight?: number[];
    orderDir?: string;
    statFields?: string[];
}
export interface GeoBounds {
    bottom_right: GeoPoint;
    top_left: GeoPoint;
}
export interface GeoDeviceStatField {
    "count": number;
    "min": number;
    "max": number;
    "avg": number;
    "sum": number;
    "min_as_string": boolean;
    "max_as_string": boolean;
    "avg_as_string": boolean;
    "sum_as_string": boolean;
}
export interface GeoDeviceDataAlarms {
    n_active_0?: number;
    n_active_1?: number;
    n_active_2?: number;
    n_active_3?: number;
    n_active_4?: number;
    n_active_5?: number;
    n_active_6?: number;
}
export interface GeoDeviceDoc {
    connected: false;
    attributes: {
        geoLocationLonLat: [number, number];
    };
    label: string;
    id: string;
    deviceId: string;
}
export interface GeoDeviceData {
    name: string;
    deviceId: string;
    realmId: string;
    tags: any;
    creationDate: number;
    updatedAt: number;
    id: string;
    configurationSent: boolean;
    deleted: boolean;
    orgResourceId: string;
    label: string;
    configurationApplied: boolean;
    connected: boolean;
    attributes: {
        geoLocation: [number, number];
        vpn_last_attempt?: number;
        vpn_connected?: boolean;
        alarms_max_severity?: number;
        alarms?: GeoDeviceDataAlarms;
    };
}
export interface DeviceBucketGeoGrid {
    key: string;
    doc: GeoDeviceDoc;
    doc_count: number;
    connected?: GeoDeviceStatField;
    "attributes.vpn_connected"?: GeoDeviceStatField;
    "attributes.alarms_max_severity"?: GeoDeviceStatField;
    "attributes.alarms.n_active_0": GeoDeviceStatField;
    "attributes.alarms.n_active_1": GeoDeviceStatField;
    "attributes.alarms.n_active_2": GeoDeviceStatField;
    "attributes.alarms.n_active_3": GeoDeviceStatField;
    "attributes.alarms.n_active_4": GeoDeviceStatField;
    "attributes.alarms.n_active_5": GeoDeviceStatField;
    "attributes.alarms.n_active_6": GeoDeviceStatField;
    viewport: {
        bounds: GeoBounds;
    };
    centroid: {
        location: GeoPoint;
    };
}
export interface DeviceSearchInDTO extends PaginatedResponse {
    data: GeoDeviceData[];
    aggregations: {
        geogrid: {
            buckets: DeviceBucketGeoGrid[];
        };
        viewport: {
            bounds: GeoBounds;
        };
        centroid: {
            location: GeoPoint;
        };
    };
    serverTimestamp?: number;
}
export type DeviceAlarmsCountCompact = [number, number, number, number, number, number, number];
export interface DeviceOrBucket {
    centroid: GeoPoint;
    key: string;
    doc_count: number;
    label: string;
    deviceId?: string;
    connected: number;
    vpnReady?: boolean;
    maxAlarm?: number;
    alarmsCompact: DeviceAlarmsCountCompact;
    bounds?: GeoBounds;
}
export declare const deviceVpnIsReady: (vpnLastAttempt: number, serverTimestamp: number) => boolean;
