import { Dashboard, DeviceSlot, GroupWgt, IDataLinkConstructorArgs, IWgtConstructorParams, IWidgetSerialization, Layout } from "@/corvina-model";
import { CardStyleInTO, IDashboardSerialization } from "@/interfaces/dashboard";
import PlaceholderWgt from "./PlaceholderWgt";
import { IBaseGraphicWidgetSerialization } from "./BaseGraphicWgt";
import { TagDataType } from "@/utils/Tag";
import { DataValue } from '../communication/axios/model/devicedata';
import { ArgsAddDatalinkOptions } from "./BaseWgt";
export interface IComposedWidgetSerialization extends IBaseGraphicWidgetSerialization {
    content: {
        dashboardId?: string;
        cardStyle?: CardStyleInTO;
        name: string;
        version: string;
    };
}
declare const ComposedWgt_base: typeof GroupWgt & (new (...args: any[]) => import("./ProxyWgtMixin").IProxyingWgt);
/**
 * ComposedWidget is a group widget, containing as first child the PageWgt of a composed widget plus
 * other global widgets of the composed widget (like variables).
 *
 * ComposedWidget is serialized  without its children. Indeed the actual graphical content is loaded during gfx mount
 *
 * The mounting process is the following:
 * - tbe basic composed widget is mounted (without children)
 * - the actual version of the dashboard serialization is loaded in memory
 * - the composed widget is async replaced with the new version including the dashboard serialization
 * - the datalinks are connected
 *
 * The ComposedWidget acts as a proxy wgt to provide values to datalinks and to the composed widget device slots.
 *
 */
export default class ComposedWgt extends ComposedWgt_base {
    deviceSlotValues: Record<string, any>;
    content: {
        deviceSlots?: Array<DeviceSlot>;
        datalinks?: Array<IDataLinkConstructorArgs>;
        cardStyle?: CardStyleInTO;
        name: string;
        dashboardId: string;
        version: string;
    };
    private readyForDatalinks;
    private contentLoadedResolve;
    private contentLoaded;
    constructor(args: IWgtConstructorParams<IComposedWidgetSerialization>);
    set dashboardId(dashboardId: string);
    get dashboardId(): string;
    isComposedWgt(): boolean;
    serialize(): IComposedWidgetSerialization;
    loadContent(): Promise<void>;
    addDatalink(args: IDataLinkConstructorArgs, options?: ArgsAddDatalinkOptions): import("@/corvina-model").DataLink;
    loadDatalinksRecursive(addTagsToManager?: boolean, needSkipTagMgr?: boolean): void;
    private loadChildrenDataLinks;
    private loadChildrenActions;
    initChildren(isLoading: boolean): void;
    setPropertyValue({ prop, value }: {
        prop: string;
        value: any;
    }): void;
    getDataModel(submodel?: string): any;
    getPropertyType(name: string): TagDataType;
    setStyleProperties(initState: any): void;
    calculatePlaceholders(): {
        add: Array<{
            type: string;
            parentId: string;
            layout: Layout;
        }>;
        remove: Array<{
            widgetId: string;
            widget: PlaceholderWgt;
            record: boolean;
        }>;
    };
    readHistData(prop: string, from: number, to: number, nSamples: number, downsample?: boolean, aggregation?: any, downsampling?: {
        size: number;
    }): Promise<Array<DataValue> | DataValue>;
}
export declare function getComposedWidgetRoot(initState: IDashboardSerialization | Dashboard): IWidgetSerialization;
export {};
