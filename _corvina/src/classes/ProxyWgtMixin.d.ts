import { IWidgetSerialization } from "./BaseWgt";
import { BaseGraphicWgt, DeviceSlot, IWgtConstructorParams, DataLink, IDataLinkConstructorArgs } from "@/corvina-module";
import { IBaseGraphicWidgetSerialization } from "./BaseGraphicWgt";
type Constructor<T = {}> = new (...args: any[]) => T;
type internalSlotName = string;
type modelName = string;
export interface IProxyDataLink {
    datalink: DataLink;
    deviceSlot: string;
    property: string;
    propertyAlias: string;
    deviceSlotType: string;
}
export interface IProxyingWgt {
    mapProxyDatalink: Map<internalSlotName, IProxyDataLink[]>;
    mapAliasPropertyProxy: Map<string, {
        slot: internalSlotName;
        type: string;
    }>;
    mapLazyDataLink: Map<modelName, DataLink[]>;
    removePrefix(property: string): string;
    getPropertyValue(prop: string): any;
    setPropertyValue({ prop, value }: {
        prop: string;
        value: any;
    }): void;
    getAliasPropertyModel(property: string): any;
    isSimpleAliasProperty(property: string): boolean;
    serialize(): IBaseGraphicWidgetSerialization;
    loadProxyData(serialization: IWgtConstructorParams<IWidgetSerialization>): void;
    loadProxyDataLinks(internalDeviceSlots: Array<DeviceSlot>, datalinks: Array<IDataLinkConstructorArgs>): Promise<void>;
    isModel(object: any, depth?: number): boolean;
    rewireInternalDatalinks(deviceSlots: Array<DeviceSlot>, datalinks: Array<IDataLinkConstructorArgs>): Promise<void>;
    onDataLinkUpdated(datalink: DataLink): void;
    getDatalinkPermission(property: string): "readonly" | "read/write" | "write";
    updatePropertyModel(property: string, model: any): Promise<void>;
    beforeRemove(): void;
    updateExternalDatalink(): Promise<void>;
    removeLazyProperties(object: any): any;
}
/**
 * Mixin providing proxy property functionality
 *
 * It expects to have a root property prefix and provide observable access to any subproperty
 * with datalink functionality.
 *
 */
export default function ProxyWgtMixin<TBase extends Constructor<BaseGraphicWgt>>(Base: TBase, rootPropertyPrefix: string): TBase & Constructor<IProxyingWgt>;
export {};
