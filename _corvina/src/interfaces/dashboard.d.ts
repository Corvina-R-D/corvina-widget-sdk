import { ICrypto } from "@/utils/DashboardPassowordUtils";
export interface DashboardOutDTO {
    id: string;
    type: DashboardType;
    name: string;
    description: string;
    json: string;
    manifest: DashboardManifest;
    updatedAt?: number;
    owner?: string;
    parentId?: string;
    autosave?: boolean;
    readers?: Array<string>;
    editors?: Array<string>;
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
    realmId: string;
    updatedAt: number;
    version: string;
    cardStyle?: CardStyleInTO;
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
export interface CardStyleInTO {
    id: string;
    flagColor: string;
    flagShape: string;
    backgroundColor: string;
    backgroundImageUrl: string;
    backgroundImageData: string;
    iconColor: string;
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
    search?: string;
    orderBy?: string;
    orderDir?: string;
    append?: boolean;
    whose?: SHOW_MODE;
}
export interface DashboardTagDTO {
    name: string;
    description: string;
    creationDate: number;
    updatedAt?: number;
}
export interface DashboardManifest {
    cardStyle?: CardStyleInTO;
    crypto?: ICrypto;
    isComposedWidget?: boolean;
    assets: Array<{
        name: string;
        signedUrl?: string;
        counter?: number;
        generation?: number;
    }>;
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
    ALL = ""
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
