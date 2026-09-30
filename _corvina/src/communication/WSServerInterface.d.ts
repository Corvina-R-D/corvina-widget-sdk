import ServerInterface from "./ServerInterface";
import { PlatformQueryDataDTO } from "../interfaces/IPlatformController";
import { WSTagChannel } from "./channels";
import EventEmitter from "events";
import { DeviceConfig } from "../interfaces/preset";
import RequestsController from "./RequestsController";
import DeviceMetadataMgr from "@/classes/DeviceMetadataMgr";
import { IClockConfiguration, TagConf } from "@/interfaces/dashboard";
interface CorvinaPlatformInterface {
    realm: string;
    device: string;
    interf: string;
}
export interface GroupConf {
    /** tag names of this group */
    tgs: Set<string>;
}
export interface TagNotificationEventData {
    /** name */
    n: string;
    /** payload */
    v: any;
}
export interface NotificationEvent {
    /** event type (tags, alarms, ...) */
    e: string;
    data: TagNotificationEventData;
}
type NotificationId = number;
type EventType = string;
type NotificationCallback = (ArrayOfTagNotificationEventData: any) => void;
type NotificationMap = Map<NotificationId, NotificationCallback>;
type NotificationRegistry = Map<EventType, NotificationMap>;
export interface WSServerInterfaceOptions {
    tags: Map<string, TagConf>;
    groups: Map<string, GroupConf>;
    emitter: EventEmitter;
}
export declare const extractValue: (header: string[], rawValue: any) => {
    v: any;
    ts: any;
};
/**
 * An Example of implementation of ServerInterface
 */
export declare class WSServerInterface extends ServerInterface {
    conf: any;
    groups: Map<string, GroupConf>;
    tags: Map<string, TagConf>;
    emitter: EventEmitter;
    channels: Map<string, WSTagChannel>;
    subscribed: Map<string, number>;
    uninitialized: Map<string, string>;
    interfLoading: Map<string, CorvinaPlatformInterface>;
    cbNotification: NotificationRegistry;
    serverready: boolean;
    mappingsCache: Map<string, Map<string, string>>;
    deviceConfigCache: Map<string, Promise<DeviceConfig>>;
    deviceSimulator: any;
    requestController: RequestsController;
    deviceMetadataMgr: DeviceMetadataMgr;
    constructor(options: any);
    clear(): Promise<void>;
    waitForConnection(): boolean;
    processMessage(event: NotificationEvent): void;
    throwError(event: any): void;
    getTagsConf(): Promise<Map<string, TagConf>>;
    getTagAddress(name: string): string;
    getGroupConf(): Promise<Map<string, GroupConf>>;
    addTagConfiguration(tagConf: TagConf): void;
    getTagConfiguration(tagName: string): TagConf;
    updateTagClock(tagName: any, clock: IClockConfiguration): void;
    addTagToGroup(name: any, groupName: any): void;
    subscribeGroups(reqGroups: any): void;
    isSimulatedTag(tagConf: TagConf): boolean;
    getDeviceSimulator(): Promise<any>;
    private simulateTag;
    private stopSimulation;
    private readSimulatedData;
    subscribeTags(tagsName: Array<string>): Promise<void>;
    refreshTags(tags: string[]): void;
    refreshTag(name: string): Promise<void>;
    private updateChannelCallback;
    unsubscribeTags(tags: any): Promise<boolean[]>;
    subscribeNotification(eventType: string, callback: NotificationCallback): number;
    readTrend(name: string, startTime: number, endTime: number, nSample: number, deltaTime: number, downsample?: boolean, aggregation?: any, downsampling?: {
        size: number;
    }, filterCondition?: string, filterRawData?: string): Promise<any>;
    showCircuitBrakerError(propertyName: string): void;
    showWsIotCreditsError(): void;
    showReadTrendError(error: any, tag: string): void;
    errorMessageAnalysis(data: {
        error: string;
        message: string;
        statusCode: number;
    }, tag: string): {
        message: string;
    };
    private resolveTagName;
    queryTagsDefinition(queryData: PlatformQueryDataDTO): {
        method: string;
        url: string;
        params: PlatformQueryDataDTO;
    };
    prepareQueryTags(queryData: PlatformQueryDataDTO, options?: {
        autoSource: boolean;
    }): PlatformQueryDataDTO;
    queryTags(queryData: PlatformQueryDataDTO, options?: {
        autoSource: boolean;
    }): Promise<{}[]>;
    private formatValue;
    /**
     * Implementation of SeverInterface API
     */
    writeTags(reqTags: string[], tagValues: any[], sync?: boolean, force?: boolean): Promise<any>;
    setRequestsController(controller: RequestsController): void;
    getDeviceMetadataMgr(): DeviceMetadataMgr;
}
export {};
