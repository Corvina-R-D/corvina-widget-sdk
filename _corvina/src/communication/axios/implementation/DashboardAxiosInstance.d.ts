import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { DashboardOutDTO, DashboardsInDTO, FetchDashboardParams, AssetStorageStatusDTO, OrganizationGalleryAsset } from "@/interfaces/dashboard";
import IDashboardAxiosInstance from "../IDashboardAxiosInstance";
import { PaginatedResponse, PageableFullDTO } from '../model/generic';
import { FlowDTO } from "@/interfaces/flows";
export interface IAddPrivilegesInBulkInDTO {
    ids: string[];
    readers?: string[];
    editors?: string[];
    distributors?: string[];
}
export type IDashboardDependenciesBulkOutDTO = Array<IDashboardDependencies>;
export interface IDashboardDependencies {
    id: string;
    name: string;
    widgets: Array<{
        id: string;
        name: string;
    }>;
    groups: Array<string>;
}
export interface IFlowDependenciesDTO {
    id: string;
    name: string;
    dashboards: IDashboardDependencies[];
}
export interface ResponseDashboardVersions extends PaginatedResponse {
    data: [
        {
            name: string;
            description: string;
            creationDate: number;
            updatedAt: number;
            owner: string;
            autosave?: boolean;
        }
    ];
}
export interface UserPreferenceDashboardsDTO extends PageableFullDTO {
    content: {
        id: number;
        dashboardId: string;
    }[];
}
declare class DashboardAxiosInstance extends AbstractAxiosInstance implements IDashboardAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    createDashboard(data: DashboardOutDTO, params?: any): Promise<void>;
    updateDashboard(data: DashboardOutDTO, params?: any): Promise<void>;
    fetchDashboards(params?: FetchDashboardParams): Promise<DashboardsInDTO>;
    fetchWidgets(params?: FetchDashboardParams): Promise<DashboardsInDTO>;
    fetchFlows(params?: FetchDashboardParams): Promise<DashboardsInDTO>;
    getDashboard(id: string, params?: any): Promise<DashboardOutDTO>;
    createFlow(data: FlowDTO, params?: any): Promise<void>;
    updateFlow(data: FlowDTO, params?: any): Promise<void>;
    getFlow(id: string, params?: any): Promise<DashboardOutDTO>;
    deleteFlow(id: string, params?: any): Promise<void>;
    deleteDashboard(id: string, params?: any): Promise<void>;
    getMyDashboards(params?: FetchDashboardParams): Promise<DashboardsInDTO>;
    getMyFlows(params?: FetchDashboardParams): Promise<DashboardsInDTO>;
    getSharedDashboards(params?: FetchDashboardParams): Promise<DashboardsInDTO>;
    getDashboardVersions(id: string, params: any): Promise<ResponseDashboardVersions>;
    createDashboardVersion(id: string, data: any, params: any): Promise<unknown>;
    getDashboardVersion(id: string, versionName: string, params: any): Promise<DashboardOutDTO>;
    exportDashboardDatasourceDataCSV(id: string, params: any): Promise<unknown>;
    makeDashboardVersionCurrent(id: string, versionName: string, params: any): Promise<unknown>;
    deleteDashboardVersion(id: string, versionName: string, params: any): Promise<any>;
    createDerivedDashboardVersion(id: string, oldVersionName: string, newVersionName: string, data: any, params: any): Promise<unknown>;
    additiveBulkDashboardSharing(data: IAddPrivilegesInBulkInDTO, params?: any): Promise<void>;
    additiveBulkFlowSharing(data: IAddPrivilegesInBulkInDTO, params?: any): Promise<void>;
    getDashboardDependencies(data: {
        id: string;
    }, params?: any): Promise<IDashboardDependencies>;
    getDashboardDependenciesBulk(data: {
        ids: string[];
    }, params?: any): Promise<IDashboardDependenciesBulkOutDTO>;
    getFlowDependencies(data: {
        id: string;
    }, params?: any): Promise<IFlowDependenciesDTO>;
    getFlowDependenciesBulk(data: {
        ids: string[];
    }, params?: any): Promise<IFlowDependenciesDTO[]>;
    shareDashboard(dashboardId: string, groupName: string, permission: "r" | "r/w" | "r/s", params?: {
        organization: any;
    }): Promise<DashboardsInDTO>;
    shareDashboardWithUsers(dashboardId: string, listUsers: Array<{
        name: string;
        permission: string;
    }>, params?: {
        organization: any;
    }): Promise<void>;
    unshareDashboardWithUsers(dashboardId: string, listUsers: Array<{
        name: string;
        permission: string;
    }>, params?: {
        organization: any;
    }): Promise<void>;
    unshareDashboard(dashboardId: string, groupName: string, params?: {
        organization: any;
    }): Promise<void>;
    shareFlow(id: string, groupName: string, permission: "r" | "r/w" | "r/s", params?: {
        organization: any;
    }): Promise<DashboardsInDTO>;
    shareFlowWithUsers(id: string, listUsers: Array<{
        name: string;
        permission: string;
    }>, params?: {
        organization: any;
    }): Promise<void>;
    unshareFlowWithUsers(id: string, listUsers: Array<{
        name: string;
        permission: string;
    }>, params?: {
        organization: any;
    }): Promise<void>;
    unshareFlow(id: string, groupName: string, params?: {
        organization: any;
    }): Promise<void>;
    addAsset(dashboardId: string, assetName: string, data: any, progressCallback?: (ProgressData: any) => void, widgetId?: string): Promise<boolean>;
    getAssetURL(dashboardId: string, assetName: string): Promise<string>;
    getAssetData(signedURL: string): Promise<any>;
    getAssetStorageStatus(): Promise<AssetStorageStatusDTO>;
    getOrganizationAssetsManifest(): Promise<any>;
    getOrganizationGalleryWidgets(): Promise<any>;
    getOrganizationGalleryAsset(assetName: any): Promise<OrganizationGalleryAsset>;
    uploadOrganizationGalleryAsset(assetName: string, file: File): Promise<boolean>;
    removeOrganizationGalleryAsset(assetName: string): Promise<any>;
    fetchUserPreferences(username: string, page: number, pageSize: number): Promise<UserPreferenceDashboardsDTO>;
    addDashboardToUserPreferences(username: string, dashboardId: string): Promise<any>;
    deleteDashboardFromUserPreferences(dashbordUserpreferenceId: number): Promise<any>;
}
declare const _default: DashboardAxiosInstance;
export default _default;
