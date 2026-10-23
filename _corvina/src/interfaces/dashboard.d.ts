import { ICrypto } from "@/utils/IDashboardPasswordUtil";
import { TIME_UNITS } from "./dashboardClock";
export interface DashboardOutDTO {
    id: string;
    type: DashboardType;
    name: string;
    description: string;
    json: string;
    manifest: DashboardManifest;
    creationDate?: number;
    updatedAt?: number;
    owner?: string;
    parentId?: string;
    autosave?: boolean;
    readers?: Array<string>;
    editors?: Array<string>;
    distributors?: Array<string>;
}
export interface DashboardItemInDTO {
    type: DashboardType;
    creationDate: number;
    deleted: boolean;
    description: string;
    editors: Array<string>;
    id: string;
    manifest: DashboardManifest;
    name: string;
    orgResourceId: string;
    owner: string;
    readers: Array<string>;
    distributors?: Array<string>;
    realmId: string;
    updatedAt: number;
    version: string;
    cardStyle?: CardStyleInDTO;
    writers?: Array<string>;
    inEditor?: boolean;
    preparedJson?: string;
    onlylocal?: boolean;
    dateModified?: number;
}
export interface IDashboardItem extends DashboardItemInDTO {
    isShared?: boolean;
    isOwner?: boolean;
}
export type DashboardsMap = {
    [key: string]: IDashboardItem;
};
export interface CardStyleInDTO {
    id: string;
    flagColor: string;
    flagShape: string;
    backgroundColor: string;
    backgroundImageUrl?: string | null;
    backgroundImageData?: string | null;
    iconColor: string;
    iconSet: string;
    iconFontFamily: string;
    iconName: string;
}
export interface DashboardsInDTO {
    data: DashboardItemInDTO[];
    totalElements: number;
    totalPages: number;
    number: number;
    last: boolean;
}
export interface FetchDashboardParams {
    page?: number;
    pageSize?: number;
    organization?: string;
    username?: string;
    usergroups?: string[];
    search?: string;
    orderBy?: string;
    orderDir?: string;
    append?: boolean;
    whose?: SHOW_MODE;
    noStore?: boolean;
    type?: DashboardType;
}
export interface DashboardTagDTO {
    name: string;
    description: string;
    creationDate: number;
    updatedAt?: number;
}
export type PageFormat = "A4" | "Letter";
export type PageOrientation = "portrait" | "landscape";
export interface IPageConfiguration {
    format: {
        size: PageFormat;
        pxSize: {
            width: number;
            height: number;
        };
        orientation: PageOrientation;
    };
    margins: {
        top: number;
        right: number;
        bottom: number;
        left: number;
    };
}
export interface DashboardManifest {
    cardStyle?: CardStyleInDTO;
    crypto?: ICrypto;
    isComposedWidget?: boolean;
    assets: Array<{
        name: string;
        signedUrl?: string;
        counter?: number;
        generation?: number;
    }>;
    page?: IPageConfiguration;
    dataCaching?: boolean;
}
export interface AssetStorageStatusDTO {
    enabled: boolean;
}
export interface OrganizationGalleryAsset {
    asset: string;
    lib: string;
    url: string;
    manifest: OrganizationGalleryAssetManifest;
}
export interface OrganizationGalleryAssetManifest {
    resources: {
        images?: Array<{
            name: string;
            url: string;
        }>;
        fonts?: Array<{
            name: string;
            url: string;
        }>;
        icon?: {
            name: string;
            url: string;
        } | Array<{
            name: string;
            url: string;
        }>;
        jmVersion?: string;
    };
    asset?: string;
    source?: string;
    widgets?: string[];
}
export interface IDeviceSlotsMap {
    [name: string]: any;
}
export interface IDashboardSerialization {
    id: string;
    name: string;
    description: string;
    projectWgt: any;
    dateCreated: Date;
    dateModified: Date;
    deviceSlots: IDeviceSlotsMap;
    version: string;
    definitionVersion: string;
}
export declare enum SHOW_MODE {
    ALL = "ALL",
    MINE = "MINE",
    SHARED_WITH_ME = "SHARED_WITH_ME",
    SHARED_BY_ME = "SHARED_BY_ME"
}
export declare enum DashboardType {
    DASHBOARD = "DASHBOARD",
    WIDGET = "WIDGET",
    ALL = "",
    FLOW = "FLOW",
    REPORT = "REPORT"
}
export interface IClockConfiguration {
    id: string;
    start: number;
    end: number;
    realtime: boolean;
}
export interface TagConf {
    tagName: string;
    realm: string;
    modelPath: string;
    deviceId: string;
    type: string;
    clock: IClockConfiguration;
}
export interface IManifest {
    name: string;
    source: string;
    main: string;
    widgets?: string[];
    resources: {
        images?: string[];
        icon?: string[];
    };
}
export declare enum DATAWINDOW_MODE {
    DURATION = 0,// Autoscroll: Form now to X units
    FIXED_INTERVAL = 1,// Interval: From X to Y
    RELATIVE = 2,// Relative: From time X to Y units ago ( DURATION + AUTOSCROLL OFF ),
    CALENDAR = 3
}
export interface IClockConfigurationParams {
    id: string;
    startDate: number;
    endDate: number;
    mode: DATAWINDOW_MODE;
    duration: number;
    durationStruct: {
        value: number;
        unit: TIME_UNITS;
    };
}
