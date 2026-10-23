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
/**
 * Appended by platform-api as the last element of a tags/status response when the query was
 * interrupted while the body was already being streamed - at that point the status code is
 * already committed to 200, so the abort cannot be reported as an HTTP error any more.
 * `CIRCUIT_BREAKER_TIMEOUT` is the query circuit breaker deadline set through `queryTimeout`.
 */
export interface PlatformStreamNotice {
    code: "CIRCUIT_BREAKER_TIMEOUT";
    /** technical message, for logs - not for the user */
    message: string;
    /** the read was aborted by the queryTimeout deadline */
    timeout: boolean;
    /** the partially written response was closed into a well formed document */
    gracefulClose: boolean;
    /** the data returned before the interruption is incomplete */
    partialData: boolean;
}
export interface PlatformStreamNoticeDTO {
    notice: PlatformStreamNotice;
}
/** An element of a tags response: a data block, or the trailing notice above. */
export type PlatformTagsResponseItem = PlatformTagsDTO | PlatformStreamNoticeDTO;
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
    limitAggregationOutput?: number;
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
/**
 * Where a formula evaluated by platform-api is used:
 * - map: `functions[name].map` of a query (with `category`, the map of a category dataset)
 * - category: a category function name like `($0:$(Tag))=>'Label ' + $0`
 * - sampleFilter: `sources[i].filter.condition` or `filters.beforeAlignment.condition` of a query
 * - postFilter: `filters.post.condition` of a query or of a tag data read
 * - rawDataFilter: `filterRawData` of a tag data read
 */
export type ServerFormulaContext = "map" | "category" | "sampleFilter" | "postFilter" | "rawDataFilter";
export interface FormulaValidationRequestDTO {
    context: ServerFormulaContext;
    formula: string;
    /** context map: the category function name the map belongs to */
    category?: string;
    /**
     * The sources of the query that runs the formula, as platform-api receives them: they give the device and model of
     * simplified tag names like $("Tag"). [] when the query has none; omitted when not known (then accepted).
     */
    sources?: Array<{
        deviceId?: string | null;
        modelPath?: string | null;
    }>;
}
/** Lines and columns start from 1 */
export interface FormulaValidationMarkerDTO {
    startLineNumber: number;
    startColumn: number;
    endLineNumber: number;
    endColumn: number;
    message: string;
    /** a warning does not make the formula invalid; missing from older platform-api: error */
    severity?: "error" | "warning";
}
export interface FormulaValidationResultDTO {
    /** the formula compiles: it may still have warnings */
    valid: boolean;
    markers: FormulaValidationMarkerDTO[];
}
export {};
