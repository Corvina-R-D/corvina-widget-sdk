export type WidgetDataModel = Array<PropertyDataDefinition>;
export interface FactoryPropertyDataDefinition {
    type: string;
    properties: string[] | Array<{
        name: string;
        index?: number;
    }>;
    additionalLinks?: Array<{
        sourceTypes: string[];
        sourceProp: string;
        targetProp: string;
        perm?: 'r' | 'w' | 'rw';
        useClock?: boolean;
    }>;
    policy?: string;
}
export interface PropertyDataDefinition {
    type: TagDataType | `${TagDataType}`;
    instanceOf?: string | RegExp;
    links: Array<{
        match: string;
        properties?: string[];
        index?: number;
        linkToModel?: boolean;
        factory?: Array<FactoryPropertyDataDefinition>;
    }>;
}
export type gfxArgs = boolean | {
    galleryMode: boolean;
    version: string;
};
export interface WidgetModule {
    type: string;
    component: string;
    class: any;
    typeName?: string;
    gfxVersion?: string;
    jsVersion?: string;
    gfx: (gfxArgs: any) => any;
    js?: string | Function;
    props?: any;
    displayName?: () => string;
    category?: string;
    inGallery?: boolean;
    icon: string;
    iconName?: string;
    dataModel?: WidgetDataModel;
    isDataSource?: boolean;
    manifest?: IManifest;
    custom?: boolean;
    storeAppKey?: string;
    manifestResourceName?: string;
    errors?: string[];
}
export interface WidgetModuleRegistrationParam {
    component: string;
    class: any;
    gfx: (boolean: any) => any;
    js?: string | Function;
    props?: any;
    displayName?: () => string;
    category?: string;
    inGallery?: boolean;
    icon: string;
    iconName?: string;
    dataModel?: WidgetDataModel;
    isDataSource?: boolean;
    manifest?: IManifest;
    custom?: boolean;
    storeAppKey?: string;
    manifestResourceName?: string;
    errors?: string[];
}
export declare class WidgetFactory {
    registry: Map<string, WidgetModule>;
    groups: Map<string, string[]>;
    organizationAssets: boolean;
    private _activeConfiguration;
    constructor();
    /**
     * Set the active editor configuration.
     * The configuration controls which widgets are shown in the gallery
     * and which editor features are enabled.
     * Pass `null` to clear the configuration (all widgets available).
     */
    setConfiguration(configuration: DashboardProfile | null): void;
    /**
     * Get the currently active editor configuration.
     * Returns `null` if no configuration is set (all widgets available).
     */
    getConfiguration(): DashboardProfile | null;
    /**
     * Check whether a widget type is allowed by the active configuration.
     * If no configuration is set, or the configuration allows all widgets (DashboardProfile.gallery === null),
     * this returns true for any type.
     */
    isWidgetAllowedByConfiguration(type: string): boolean;
    updateLanguage(): void;
    /*! register a new widget
          * @param fullTypeName : the name of widget (custom) type. Can be a decorated
          * custom widget module name: com.exor.MyCustomWgt-1.3:2.4
          * @component : the js component actually providing this widget
          * @initData : initialization data for a widget
          * @js : custom widget javascript code (provided by user)
          */
    register(params: WidgetModuleRegistrationParam): void;
    unregister(type: string): void;
    getModule(fullModuleName: string): WidgetModule;
    getModules(condition: (module: WidgetModule) => boolean): WidgetModule[];
    /**
     * Returns only the gallery-visible widgets that are allowed by the active configuration.
     * Widgets with `inGallery: false` are excluded.
     * If a dashboard profile configuration is active, only widget types allowed by its `DashboardProfile.gallery` settings are returned.
     */
    getGalleryModules(): WidgetModule[];
    getComponent(wgt: any): string;
    actualWidget(wgt: any, galleryMode?: boolean, version?: string): any;
    getPreviewIcon(wgt: any): string;
    getPropertyHandler(wgt: any): BasePropsHandler;
    getClass(type: any): any;
    getDataSourceClasses(): WidgetModule[];
    getDataModel(type: string): WidgetDataModel;
    getDataModels(): WidgetModule[];
    disableOrganizationAssets(): void;
    enableOrganizationAssets(): void;
    organizationAssetsEnabled(): boolean;
    registerGroup(name: string, widget: string[]): boolean;
    unregisterGroup(name: string): void;
    getWidgetsInGroup(groupName: string): string[] | null;
    getManifestResourceName(widgetType: string): string | undefined;
    /**
     * Get the widget application linked to the widget
     * @param storeAppKey the key of the store application linked to the widget
     * @returns false if the widget is not linked to a store application, or the ApplicationOutDTO|undefined if the widget is linked to a store application
     */
    getWidgetApp(storeAppKey: string): ApplicationOutDTO | boolean;
    isWidgetAppActive(storeAppKey: string): boolean;
}
declare let globalWidgetRegistry: WidgetFactory;
export { globalWidgetRegistry };
import JM4WebMgr from "./JM4WebMgr";
import BasePropsHandler from "./widgets/gallery/propertiesHandlers/BasePropsHandler";
import { IManifest } from "@/interfaces/dashboard";
import { ApplicationOutDTO } from "@/interfaces/applications";
import { TagDataType } from "@/utils/Tag";
import type { DashboardProfile } from "./EditorProfile/types";
declare let jm4web: JM4WebMgr;
export { jm4web };
