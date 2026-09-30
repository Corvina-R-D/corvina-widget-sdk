import { DeviceDetails } from "./devicedetails";
import { PresetSourceItem } from "./preset";
type TimestampAndValue = Array<any>;
export interface PlatformTagsDTO {
    data: Array<TimestampAndValue>;
    deviceId: string;
    header: string[];
    modelPath: string;
}
export interface PlatformDeviceStatusDTO {
    data: Array<TimestampAndValue>;
    deviceId: string;
    header: string[];
}
export interface GeneralParams {
    since?: string;
    to?: string;
    sinceAfter?: string;
    limit?: number;
    format?: string;
    timestampFormat?: string;
}
export interface DeviceTagsParams {
    modelPath: string;
    since?: string;
    to?: string;
    sinceAfter?: string;
    limit?: number;
    aggregation?: {
        type: string;
        sampling: {
            extent: number;
            size: number;
            unit: string;
        };
    };
    format?: string;
    timestampFormat?: string;
    filterStructFields?: string;
    filterCondition?: string;
    filterRawData?: string;
    downsampling?: {
        size: number;
    };
    queryTimeout?: number;
    filters?: {
        post?: {
            condition: string;
            fields: string[];
        };
    };
    timezone?: string;
}
export declare enum PlatformActionDataInDTO {
    FETCH = "FETCH",
    DESCRIBE = "DESCRIBE",
    RESOLVE = "RESOLVE"
}
export declare enum PlatformPaddingDataInDTO {
    SEARCH = "SEARCH",
    NULL = "NULL",
    ZERO = "ZERO",
    SEARCH_OR_ZERO = "SEARCH_OR_ZERO",
    SEARCH_OR_NULL = "SEARCH_OR_NULL"
}
export declare enum PlatformFillDataGapsInDTO {
    LINEAR_INTERPOLATION = "LINEAR_INTERPOLATION",
    EXTEND_LAST_VALUE = "EXTEND_LAST_VALUE",
    NEXT_VALUE = "NEXT_VALUE",
    CURRENT_VALUE = "CURRENT_VALUE",
    USE_NULL = "USE_NULL",
    USE_ZERO = "USE_ZERO"
}
export declare enum AggregationMode {
    SCALAR = "SCALAR",
    MOVING = "MOVING",
    DISABLED = "DISABLED"
}
export declare enum PlatformQueryFormat {
    json = "json",
    table = "table",
    legacy = "legacy",
    csv = "csv"
}
export declare enum PlatformQueryTimestampFormat {
    unix = "unix",
    iso8601 = "iso8601"
}
export interface PlatformQueryDataDTO {
    since: string;
    to: string;
    sinceAfter?: boolean;
    limit?: number;
    format: PlatformQueryFormat;
    timestampFormat: PlatformQueryTimestampFormat;
    alignment: {
        sampling: {
            size: number;
            unit: string;
            extent: number;
        };
        aggregation: string;
        missingValues: {
            fillPolicy: PlatformFillDataGapsInDTO;
            paddingPolicy: PlatformPaddingDataInDTO;
        };
        source?: {
            deviceId?: string;
            modelPath: string;
        };
    };
    aggregation: {
        mode: AggregationMode;
        size: number;
        unit: string;
        extent: number;
    };
    sources?: PresetSourceItem[];
    functions: {
        [name: string]: {
            map: string;
            reduce?: {
                operator: string;
            };
        };
    };
    filterCondition?: string;
    filterStructFields?: string[];
    filters?: {
        beforeAlignment?: {
            condition: string;
        };
        post?: {
            condition: string;
            fields: string[];
        };
    };
    timezone?: string;
}
export interface DeviceWriteTagsParams {
    data: Array<{
        modelPath: string;
        v: any;
    }>;
}
export interface DeviceConfigurationJsonDTO {
    type: string;
    properties: {
        [key: string]: any;
    };
}
export interface PlatformDeviceConfigurationDTO {
    type: string;
    properties: {
        [key: string]: any;
    };
}
export interface DeviceConfigurationDTO {
    configurationJson: DeviceConfigurationJsonDTO;
    configurationFromDevice: PlatformDeviceConfigurationDTO;
}
export interface DeviceTagInfoDTO {
    name: string;
    type: string;
}
export interface DeviceDetailsDTO {
    data: Array<DeviceDetails>;
    links: {
        self: string;
        next: string | null;
    };
}
export interface DeviceStatusDTO {
    id: string;
    aliases: any;
    introspection: any;
    connected: boolean;
    last_connection: string;
    last_disconnection: string;
    first_registration: string;
    first_credentials_request: string;
    last_seen_ip: string;
    last_credentials_request_ip: string;
    total_received_bytes: number;
    total_received_msgs: number;
}
export {};
