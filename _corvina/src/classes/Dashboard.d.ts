import ModelTypeEnum from "@/constant/ModelTypeEnum";
import { BaseGraphicWgt, BaseWgt, DataLink, GroupWgt, Layout, PageWgt, ProjectWgt } from "@/corvina-model";
import { DashboardManifest, DashboardType, IDashboardSerialization, IDeviceSlotsMap, IPageConfiguration } from "../interfaces/dashboard";
import { ConfigurationLayout } from "./BaseGraphicWgt";
import { IWidgetSerialization } from "./BaseWgt";
import ColorPaletteWgt from "./ColorPaletteWgt";
import { ModelProperties } from "./DeviceSlot";
import PlaceholderWgt from "./PlaceholderWgt";
import { DeviceIn } from "@/interfaces/device";
import { IClockConfigurationParams } from "@/interfaces/dashboard";
import { PROJECT_LOAD_STATUS } from "@/interfaces/dashboardStatus";
interface SlotProps {
    slotType: ModelTypeEnum;
    slotName: string;
    slotModelName: string;
    slotModelProperties: ModelProperties;
    deviceId: string;
    supportI18n: boolean;
    deviceIntermediatePath: string;
    deviceModelName: string;
}
interface IDevicesStatus {
    active: string[];
    inactive: string[];
    missing: string[];
    details: DeviceIn[];
}
export default class Dashboard {
    type: DashboardType;
    id: any;
    name: string;
    description: string;
    projectWgt: ProjectWgt;
    dateCreated: Date;
    dateModified: Date;
    selectedWidget: BaseWgt;
    activeGroup: GroupWgt;
    inEditor: boolean;
    curPage: PageWgt;
    deviceSlots: IDeviceSlotsMap;
    initState: IDashboardSerialization | null;
    hasMissingDevices: boolean;
    hasDevicesMismatch: boolean;
    listDevicesMismatch: string[];
    devices: IDevicesStatus;
    version: string;
    onlylocal: boolean;
    manifest: DashboardManifest;
    mapBufferAssetsData: Map<string, Promise<any>>;
    private assetStorageInfo;
    preparedJson?: string;
    dateCreatedStr?: string;
    dateModifiedStr?: string;
    /** True while the project is being loaded (during loadProject or createProject) */
    projectLoadingStatus: PROJECT_LOAD_STATUS;
    editors: Array<string>;
    readers: Array<string>;
    distributors: Array<string>;
    private projectLoaded;
    private markProjectLoaded;
    constructor(type: DashboardType);
    private loadWithOtherDeviceSlots;
    inFlowViewer(): any;
    flowDeviceSlots(): void;
    createProject(name: string, strategy: Function): void;
    private setAllPagesParent;
    private generateBaseTextForCurrentLangugage;
    hasGlobalVariablesWidget(): boolean;
    hasLanguageManagerWidget(): boolean;
    hasDefaultColorPalette(): boolean;
    private setDataWindowState;
    private initProjectFromState;
    isProjectLoaded(): Promise<void>;
    loadProject(args: ILoadProjectArgs): Promise<void>;
    confirmPendingOperations(): Promise<boolean>;
    getDefaultColorPalette(): ColorPaletteWgt;
    getAssetStorageStatus(): Promise<{
        enabled: boolean;
    }>;
    getDeviceSlot(slotName: string): any;
    addClockToDeviceSlot(slotName: string, clockId: string): void;
    addDeviceSlot(slotName: string, model: string, deviceId?: any, modelProperties?: any, supportI18n?: any): Error;
    addPropertySlotExtended(sp: SlotProps, simulationDesc: any): Promise<Error>;
    fetchDevices(): Promise<IDevicesStatus>;
    isSimulatedDevice(deviceId: string): boolean;
    setSlotDevice(slotName: string, model: string, modelName: string, deviceId: string, supportI18n?: boolean): void;
    setSlotDeviceExtended(sp: SlotProps, simulationDesc: any): Promise<void>;
    setTagSimulation(slotName: string, tag: string, desc: any): void;
    removeDeviceSlot(slotName: string): void;
    removeDataLinkForDeviceSlot(slotName: string): void;
    removeDataLinkForClock(clockId: string): void;
    removeClockFromDatasources(clockId: string): void;
    checkAndMarkMissingDevices(): boolean;
    getDeviceDetail(deviceId: string): Promise<any | null>;
    checkDeviceSlotModelMismatch(): Promise<void>;
    getDeviceSlotModelMismatch(devices: DeviceIn[]): string[];
    getSlotNameWithMissingDevices(): string[];
    setCurrentPage(wgt: PageWgt): void;
    generateId(type: string): string;
    private createWidget;
    private setWidgetLayout;
    private addWidgetToPage;
    addWidget({ type, version, parentId, initState, layout, isLoading, position, configurationLayout, forceName, forceId, sourcelessDatalink }: addWgtArgs): BaseWgt;
    private removeSourcelessDatalinks;
    addEvent(eventName: string, wgt: BaseWgt): void;
    addAction(eventName: string, actionWgtId: string, parentId: string): void;
    removeAction(eventName: string, actionWgtId: string, parentId: string): void;
    initActions(): void;
    initWgtActions(wgt: BaseWgt): void;
    initWgtActionsRecursive(wgt: BaseWgt): void;
    createPlaceholder(parentId: string, layout: Layout): PlaceholderWgt;
    addPlaceholders(placeholders: addPlaceholderArgs[]): void;
    addWidgets(widgetArgs: addWgtArgs[]): BaseWgt[];
    removeTargetDatalinks(sourceWidget: BaseWgt): void;
    removeWidget(widgetId: any, forceDelete?: boolean): boolean;
    private removeWidgetFromParent;
    removeWidgets(widgetIds: string[]): void;
    removePlaceholder(placeholderId: string, parentId: string): void;
    private getDeviceSlotsWithoutTagsInfo;
    serialize(version?: string): IDashboardSerialization;
    /*! Returns the compressed serialization of current project */
    json(): string;
    getWidget(id: any): BaseWgt;
    getWidgetByName(name: string): BaseWgt;
    getAllWidgetsByType(type: string): BaseWgt[];
    clearSelectedWgt(): void;
    addDatalink({ sourceId, targetId, srcProp, tgtProp, permission }: {
        sourceId: any;
        targetId: any;
        srcProp: any;
        tgtProp: any;
        permission: any;
    }): DataLink;
    isLayoutWidget(widget: BaseGraphicWgt): boolean;
    private getTargetValidLayoutType;
    generateCopiedWidgetInitState(copiedWidget: IWidgetSerialization, targetWidget: BaseGraphicWgt, position: {
        x: number;
        y: number;
    }): IWidgetSerialization;
    private getProperTargetLayout;
    getCurrentPage(): PageWgt;
    toggleWidgetLayoutVisibility(id: string, size?: number): boolean;
    hideWidgetInLayout(args: {
        id: string;
        size?: number;
        updateLayout?: boolean;
    }): boolean;
    showWidgetInLayout(id: string, size?: number): boolean;
    setOffset(left: number, top: number): void;
    getOffset(): {
        left: number;
        top: number;
    };
    setScale(scale: number): void;
    getScale(): number;
    getProject(): ProjectWgt;
    getColorPalette(): ColorPaletteWgt;
    getFirstWidgetByClassInstance<T extends BaseWgt>(widgetClass: {
        new (...args: any[]): T;
    }): T;
    /**
     * Add asset to dashboard manifest.
     */
    addAsset(name: string): void;
    hasAsset(name: string): boolean;
    /**
     * Remove asset from dashboard manifest.
     */
    removeAsset(name: string): boolean;
    /**
     * Get asset from dashboard manifest.
     */
    getAsset(name: string): {
        name: string;
        signedUrl?: string;
    };
    /**
     * Set signed URL to an asset in dashboard manifest.
     */
    setAssetURL(name: any, url: string): void;
    /**
     * Store asset data into buffer in order to be available for all dashboard's widget.
     */
    storeAssetData(name: string, data: Promise<any>): void;
    /**
     * Get data of a specific asset.
     * If dashboard has not data it fectchs from the store.
     */
    getAssetData(name: string, dashboardId?: string): Promise<any>;
    /**
     * Get asset url.
     */
    getAssetUrl(name: string, dashboardId?: string): Promise<string>;
    setPrintConfiguration(configuration: IPageConfiguration): void;
}
export interface DashboardConstructorParams {
    projectsCount?: number;
    initState?: any;
    strategy?: Function;
    deviceSlots?: {
        [slotName: string]: string; /**DeviceId*/
    };
}
export interface addWgtArgs {
    type: string;
    version?: string;
    parentId: string;
    initState?: BaseWgt | IWidgetSerialization;
    layout?: Layout;
    isLoading?: boolean;
    position?: IPosition;
    configurationLayout?: ConfigurationLayout;
    forceName?: string;
    forceId?: string;
    sourcelessDatalink?: boolean;
}
export interface ICreateWidgetArgs {
    type: string;
    version?: string;
    parentId: string;
    initState?: BaseWgt;
    isLoading?: boolean;
    forceName?: string;
    forceId?: string;
    parentWgt: BaseWgt;
}
export interface ISetWidgetLayoutArgs {
    wgt: BaseWgt;
    configurationLayout?: ConfigurationLayout;
    layout?: Layout;
    position?: IPosition;
}
export interface ILoadProjectArgs {
    initState: any;
    deviceSlots: {
        [slotName: string]: string; /**DeviceId*/
    };
    manifest: any;
    variables: {
        [name: string]: any;
    };
    clock?: IClockConfigurationParams[] | null;
    confirmLanguageManager: string;
}
export interface IPosition {
    x: number;
    y: number;
}
export interface addPlaceholderArgs {
    parentId: string;
    layout: Layout;
}
export {};
