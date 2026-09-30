import { BaseWgt, BaseGraphicWgt, Dashboard, BREAKPOINTS_MODE, LayoutConfig, TagMgr } from "../corvina-model";
import { CustomWidgetClass } from "./loaderCustomWidget";
interface JMCustomWidgetConf {
    definition: any;
    gallery: any;
    manifest: {
        jmVersion: string;
        icon: {
            name: string;
            data: string;
        };
        resources: {
            css: string;
        };
    };
}
interface SDKCustomWidgetConf {
}
interface CustomWidget {
    type: CustomWidgetClass;
    name: string;
    configuration: JMCustomWidgetConf | SDKCustomWidgetConf;
}
export default class ProjectWgt extends BaseGraphicWgt {
    wgts: BaseWgt[];
    homePageId: string;
    breakpoints: {
        sizes: {
            large: number;
            medium: number;
            small: number;
        };
        mode?: BREAKPOINTS_MODE;
    };
    private dashboard;
    private customWidgets;
    private mapCustomWidgets;
    private tagMgr;
    constructor({ initState, isLoading, dashboard }: {
        initState: any;
        isLoading: any;
        dashboard: any;
    });
    getBreakpointsInfo(): {
        sizes: {
            large: number;
            medium: number;
            small: number;
        };
        mode?: BREAKPOINTS_MODE;
    };
    getMainGroup(): import("./GroupWgt").default;
    getCurrentPage(): import("./PageWgt").default;
    getProject(): ProjectWgt;
    getLayoutConf(): LayoutConfig;
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
    getTagMgr(): TagMgr;
    initChildren(isLoading: any): void;
    initHomePage(isLoading: any): void;
    getDashboard(): Dashboard;
    addCustomWidget(name: string, configuration: CustomWidget): boolean;
    getCustomWidgetCSS(name: string): string;
    getCustomWidgetCSSIDs(): string[];
}
export {};
