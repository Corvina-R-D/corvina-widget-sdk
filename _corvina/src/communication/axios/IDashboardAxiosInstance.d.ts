import { DashboardOutDTO, DashboardsInDTO, FetchDashboardParams, AssetStorageStatusDTO, OrganizationGalleryAsset } from "@/interfaces/dashboard";
export interface ProgressData {
    name: string;
    percentageComplete: number;
    total: number;
    loaded: number;
    dashboardId?: string;
    widgetId?: string;
}
export default interface IDashboardsAxiosInstance {
    createDashboard(data: DashboardOutDTO): Promise<void>;
    updateDashboard(data: DashboardOutDTO): Promise<void>;
    fetchDashboards(params?: FetchDashboardParams): Promise<DashboardsInDTO>;
    getDashboard(id: string): Promise<DashboardOutDTO>;
    getMyDashboards(): Promise<DashboardsInDTO>;
    getSharedDashboards(): Promise<DashboardsInDTO>;
    deleteDashboard(id: string): Promise<void>;
    addAsset(dashboardId: string, assetName: string, asset: any, progressCallback?: (ProgressData: any) => void, widgetId?: string): Promise<boolean>;
    getAssetURL(dashboardId: string, assetName: string): Promise<string>;
    getAssetData(signerURL: string): Promise<any>;
    getAssetStorageStatus(): Promise<AssetStorageStatusDTO>;
    getOrganizationAssetsManifest(): Promise<any>;
    getOrganizationGalleryAsset(assetName: any): Promise<OrganizationGalleryAsset>;
    uploadOrganizationGalleryAsset(assetName: string, data: File): Promise<boolean>;
    removeOrganizationGalleryAsset(assetName: string): Promise<any>;
}
