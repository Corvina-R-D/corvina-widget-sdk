export type WidgetDataModel = Array<PropertyDataDefinition>;
export interface PropertyDataDefinition {
    type: string;
    instanceOf?: string | RegExp;
    links: Array<{
        match: string;
        properties?: string[];
        index?: number;
        linkToModel?: boolean;
        factory?: Array<{
            type: string;
            properties: string[];
            policy?: string;
        }>;
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
    displayName?: string;
    category?: string;
    inGallery?: boolean;
    icon: string;
    iconName?: string;
    dataModel?: WidgetDataModel;
    isDataSource?: boolean;
    manifest?: IManifest;
    custom?: boolean;
    storeAppKey?: string;
}
export interface WidgetModuleRegistrationParam {
    component: string;
    class: any;
    gfx: (boolean: any) => any;
    js?: string | Function;
    props?: any;
    displayName?: string;
    category?: string;
    inGallery?: boolean;
    icon: string;
    iconName?: string;
    dataModel?: WidgetDataModel;
    isDataSource?: boolean;
    manifest?: IManifest;
    custom?: boolean;
    storeAppKey?: string;
}
export declare class WidgetFactory {
    registry: Map<string, WidgetModule>;
    groups: Map<string, string[]>;
    organizationAssets: boolean;
    constructor();
    updateLanguage(): void;
    /*! register a new widget
          * @param fullTypeName : the name of widget (custom) type. Can be a decorated
          * custom widget module name: com.organization.MyCustomWgt-1.3:2.4
          * @component : the js component actually providing this widget
          * @initData : initialization data for a widget
          * @js : custom widget javascript code (provided by user)
          */
    register(params: WidgetModuleRegistrationParam): void;
    unregister(type: string): void;
    getModule(fullModuleName: string): WidgetModule;
    getModules(condition: (module: WidgetModule) => boolean): WidgetModule[];
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
    getWidgetGroup(widgetType: string): {
        name: string;
        widgets: string[];
    };
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
declare let jm4web: JM4WebMgr;
export { jm4web };
