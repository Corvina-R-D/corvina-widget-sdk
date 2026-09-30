import { WSServerInterface } from '../communication/WSServerInterface';
import { DeviceSlot, Value, BaseDatasourceWgt } from '@/corvina-model';
import { TagDataType } from '@/utils/Tag';
import RequestsController from '../communication/RequestsController';
import { DataValue } from '../communication/axios/model/devicedata';
import { PlatformQueryDataDTO } from "../interfaces/IPlatformController";
import { TagConf, IClockConfiguration } from '@/interfaces/dashboard';
import DeviceMetadataMgr from './DeviceMetadataMgr';
import { DataModelDeviceSlot, DataModelDeviceSlotProperty, PropertyMetaInfo } from './utils/ModelUtility';
import Tag from "./Tag";
export { default as Tag } from "./Tag";
interface TagMap {
    [key: string]: Tag;
}
interface IDeviceSlotsMap {
    [name: string]: DeviceSlot;
}
export default class TagMgr extends BaseDatasourceWgt {
    serverInterface: WSServerInterface;
    tags: TagMap;
    deviceSlots: IDeviceSlotsMap;
    inited: Promise<void>;
    stopped: boolean;
    deviceSimulator: any;
    deviceMetadataMgr: DeviceMetadataMgr;
    rController: RequestsController;
    constructor({ initState, isLoading, parent }: {
        initState: any;
        isLoading: any;
        parent: any;
    });
    private handleClockPropertyUpdate;
    setPropertyValue({ prop, value }: {
        prop: string;
        value: any;
    }): void;
    private handleWriteTagsErrors;
    reset(): void;
    serialize(): import("@/corvina-model").IWidgetSerialization;
    getPropertyValue(watchProp: any): any;
    getPropertyValueTimestamp(watchProp: any): any;
    watch(watchProp: string, datalink: any): any;
    disconnect(): Promise<void>;
    stop(): Promise<void>;
    removeTagSource(tagName: string): void;
    private removeTag;
    getTagsForDeviceSlot(deviceSlotName: string): string[];
    getTagsForClock(clockId: string): string[];
    getDeviceSimulator(): Promise<any>;
    getAllTags(): any;
    tagExists(name: string): boolean;
    getPropertyType(name: string): TagDataType;
    private parseTagName;
    updateTagClock(clock: IClockConfiguration): Promise<void>;
    getTagsByClock(clockId: string): string[];
    addTagConfiguration(tagName: string): void;
    addTag(tagName: string, v?: Value<any>, occurences?: number): void;
    addTagWithoutClock(tagName: string, v?: Value<any>, occurences?: number): void;
    addTagWithClock(tagName: string, v?: Value<any>, occurences?: number): void;
    private resolveProxyModelPath;
    private isDeviceSlotProxy;
    private findTagType;
    private findTag;
    verifyTagReferenceCounter(mapTags: Map<string, number>): void;
    connect(tagInfo: TagConf): void;
    readHistData(tagName: string, from: number, to: number, nSamples: number, downsample?: boolean, aggregation?: any, downsampling?: {
        size: number;
    }, filterCondition?: string, filters?: {
        filterRawData: string;
    }): Promise<Array<DataValue>>;
    queryData(query: PlatformQueryDataDTO, options?: {
        autoSource: boolean;
    }): Promise<Array<DataValue>>;
    getQueryDataDefinition(query: PlatformQueryDataDTO): {
        method: string;
        url: string;
        params: PlatformQueryDataDTO;
    };
    private init;
    getDataModel(filterModel?: string): DataModelDeviceSlot;
    getTagInfo(tagName: string): DeviceSlot | DataModelDeviceSlot | PropertyMetaInfo;
    getTagAddress(tagName: string): string;
    getTagName(address: string): string;
    getReferenceCounter(): {
        [tagName: string]: number;
    };
    getTagPropertyChain(fullName: string, property: string): [string | DataModelDeviceSlotProperty];
    isReady(): Promise<any>;
    private calculateTagsMap;
}
