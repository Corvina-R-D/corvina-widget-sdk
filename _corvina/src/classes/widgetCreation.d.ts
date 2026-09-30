import { VueConstructor } from "vue";
import { WidgetDataModel } from "@/corvina-model";
import { IManifest } from "@/interfaces/dashboard";
/** Component mounting the SDK widgets that render themselves (registered without a Vue component) */
export declare const SDK_RENDER_HOST = "SdkRenderHost";
export declare function initWidgets(this: any, widgetsArgs: WidgetRegistrationArgs[]): void;
export declare function nameSpaceWidget(manifest: IManifest, componentName: string): string;
export declare function registerWidget(args: WidgetRegistrationArgs, manifest: IManifest): void;
export interface WidgetRegistrationArgs {
    type: string;
    /** Vue 2 component rendering the widget. Optional when the widget class implements render() */
    component?: VueConstructor;
    class: any;
    gfx: (boolean: any) => any;
    js?: string | Function;
    props?: any;
    icon?: string;
    category?: string;
    inGallery?: boolean;
    dataModel?: WidgetDataModel;
}
