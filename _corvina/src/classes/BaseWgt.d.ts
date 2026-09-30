import { PageWgt, Value, ActionWgt, DataLink, IDataLinkConstructorArgs, IWgtConstructorParams, ProjectWgt, WidgetDataModel } from '@/corvina-model';
import { DataValue } from '../communication/axios/model/devicedata';
import { TagDataType } from '@/utils/Tag';
import { IPropertyEventDetail } from '@/utils/dashboards/PropertyUpdateEvent';
import { DatalinkPermission } from '@/interfaces/datalink';
type PropertyName = string;
type ListOfAssets = Array<{
    name: string;
    dashboardId: string;
}>;
interface ConnectionMap {
    source: BaseWgt;
    map: Array<any>;
}
type EventName = string;
type PropertyValue = string | number | number[] | string[] | object;
export default class BaseWgt {
    id: string;
    private _name;
    wgts?: BaseWgt[];
    initState?: IWidgetSerialization;
    datalinks?: IDatalinksMap;
    parent: BaseWgt;
    parentId: string;
    page?: PageWgt;
    class: string;
    type?: string;
    needSerializeChild: boolean;
    studioId: string;
    ignoreSupporti18n: boolean;
    isCustomWidget: boolean;
    props: {
        [name: string]: PropertyValue | Value<PropertyValue>;
    };
    isClone: boolean;
    childrenMap: any;
    unselectable: boolean;
    protected preview: boolean;
    events: IEvents;
    customEvents: string[];
    eventsAlias: {
        [key: EventName]: string[];
    };
    disabled: Value<boolean>;
    private _emitter;
    protected mapAssets: Map<PropertyName, ListOfAssets>;
    loadingAssets: boolean;
    static widgetCount: number;
    private childrenOverflow;
    private _version;
    protected isRemovable: boolean;
    constructor(args: IWgtConstructorParams<IWidgetSerialization>);
    get version(): string;
    set version(version: string);
    get name(): string;
    set name(name: string | Value<string>);
    get wgtId(): string;
    get parentWidget(): BaseWgt;
    set parentWidget(wgt: BaseWgt);
    get emitter(): EventTarget;
    static getWidgetCounter(): number;
    getProject(): ProjectWgt;
    addChild(child: BaseWgt): void;
    indexOfChild(child: BaseWgt): number;
    removeChild(childIndex: number, widget?: BaseWgt): BaseWgt;
    removeChildById(id: string): boolean;
    setParent(parent: BaseWgt): void;
    hasEvent(eventName: string, recursive?: boolean): boolean;
    /**
     * Called when dashboard is unloaded
     */
    unload(): void;
    setInitState(): void;
    isTableGroup(): boolean;
    getLastChild(): BaseWgt;
    initChildren(isLoading: boolean): void;
    getDatalinkFromProperty(targetProperty: string): DataLink;
    private addTagsToManager;
    /**
     * Pay attention when you set addTagToManager to true because
     * add again the tag to tag manager influence the refrences count
     * @param addTagToManager : add the tags to tag manager
     */
    loadDatalinks(addTagsToManager?: boolean, needSkipTagMgr?: boolean): void;
    /**
     * Pay attention when you set addTagToManager to true because
     * add again the tag to tag manager influence the refrences count
     * @param addTagsToManager : add the tags to tag manager
     * @param needSkipTagMgr : if true, dont make datalink linked to TagMgr. used by ComposedWgt
     */
    loadDatalinksRecursive(addTagsToManager?: boolean, needSkipTagMgr?: boolean): void;
    /**
     * Calculate the tags occurrences in the widget and its children
     *
     * @param mapOccurences map of tag occurences
     * @param mapInfo map of detailed info about tag occurences (debug purpose)
     * @param useCurrentState use current state instead of initState
     * @param excludeWeakDatalink  Not counting the weak datalink in reference counter
     */
    private calulateTagOccurrences;
    getTagOccurrences(args?: IArgsGetTagOccurrences): {
        mapOccurrences: Map<string, number>;
        mapInfo: Map<string, InfoTagReferenceCounter>;
        weakTagList?: string[];
    };
    getFirstSelectableParent(): any;
    findChildByName(name: string): BaseWgt;
    findChildByNameSanitized(name: string): BaseWgt;
    findChildByNameRecursive(name: string): BaseWgt;
    getWidgetByName(name: string): BaseWgt;
    /**Exists for compatibility with jm4web */
    getWidget(id: string, unnecesaryBoolean?: boolean): BaseWgt;
    resolveWidgetPath(wPath: string): BaseWgt;
    findChild(id: string): BaseWgt;
    findChildRecursive(wgtId: string, level?: number): BaseWgt;
    filterChilds(condition: (widget: BaseWgt) => boolean, list?: BaseWgt[]): BaseWgt[];
    getStateForDefaults(): {};
    serialize(): IWidgetSerialization;
    serializeEvents(): IEvents;
    copyPasteSerialization(): IWidgetSerialization;
    setPropertyValue({ prop, value, ts }: {
        prop: any;
        value: any;
        ts?: number;
    }): void;
    getPropertyValue(prop: any): any;
    getPropertyValueTimestamp(prop: any): number;
    /**
     * Read historical data for the property.
     *
     * If the timerange is inverted it means values are returned in the reverse order
     *
     * If nSamples is specified, limit the number of samples returned (e.g. from=now(), to=0, nSamples=1 should return the first sample in the past since now)
     *
     * @param prop
     * @param from inclusive from timestamp
     * @param to inclusive to timestamp
     * @param nSamples maximum number of samples to return
     * @param downsample enable downsampling
     * @param aggregation
     * @param downsampling
     * @param filterCondition
     * @param filters
     * @returns
     */
    readHistData(prop: string, from: number, to: number, nSamples: number, downsample?: boolean, aggregation?: any, downsampling?: {
        size: number;
    }, filterCondition?: string, filters?: {
        filterRawData: string;
    }): Promise<Array<DataValue> | DataValue>;
    hasDatalinkAttachedtoProp(propName: any): boolean;
    serializeDatalinks(datalinks: any): {};
    serializeChildren(): any[];
    getDatalinkByTgtProp(tgtProp: string, options?: {
        searchAlias: boolean;
    }): DataLink | DataLink[];
    /**
     * Return the widget that match the alias
     * Example of alias is *.Label.text
     * It replace the * with the id of the widget and then search the widget among the children
     */
    getAliasWidget(alias: string): BaseWgt;
    getAliasWidgetsForProp(property: string): Array<DataLink>;
    unmountLinks(): void;
    private removeAllDatalinks;
    isReady(): Promise<any>;
    protected updateDatalinks(listConnectionMap: ConnectionMap[]): Promise<Map<string, DataLink>>;
    private removeDatalinks;
    addDatalink(args: IDataLinkConstructorArgs, options?: ArgsAddDatalinkOptions): DataLink;
    protected markPropertyAsLinked(property: string): void;
    protected removeDataLinkMark(property: string): void;
    addDatalinkToProperty(property: string, sourceProperty: string, permission?: DatalinkPermission, weak?: boolean): void;
    getDataModel(submodel?: string): any;
    removeDatalink(dl: DataLink): void;
    removeDatalinkToProperties(properties: string[]): DataLink[];
    removeDatalinkToDataSource(sourceId: string, propName: string, recursively?: boolean): void;
    stop(): void;
    getLangIdFromLangCode(key: string): any;
    getLayoutType(): string;
    /**
     * Connect sourceWidget properties with current widget properties through datalinks.
     * This function is used inside the implementations of BaseWidget::loadDefaultConfiguration()
     * to create "default links" with global widgets like DataWindow.
     *
     * For example:
     * this.connectWidgetProperties(
     *   dataWindow,
     *   new Map( [
     *     ["windowStart", { name: "startDate", permission: "read/write" } ],
     *     ["windowEnd", { name: "endDate", permission: "read/write" } ]
     *   ] )
     * );
     * Create datalinks on:
     *   -currentWidget.windowStart -> dataWindow.startDate
     *   -currentWidget.windowEnd -> dataWindow.endDate
     */
    protected connectWidgetProperties(sourceWidget: BaseWgt, map: Map<string, {
        name: string;
        permission: DatalinkPermission;
    }>): Map<string, DataLink>;
    loadDefaultConfiguration(): void;
    addAsset(property: string, assetsName: string[], dashboardId?: string): void;
    /**
     * Initialize widget assets
     */
    initAssets(updateAssetsCounter?: boolean): void;
    /**
     * Load assets resource for current widget.
     */
    loadAssetsFromStorage(): Promise<void>;
    hasAssetsInStorage(): boolean;
    /**
     * Increment assets reference counter in Dashboard object store
     */
    protected updateAssetsReferenceCounter(): void;
    /**
     * Free dahsboard assets when widget is removed
     */
    freeAssets(): void;
    /**
     * Free assets bind to a widget property
     */
    freePropertyAssets(property: string): void;
    protected freeAssetsData(serializedWgt: any): void;
    getPropertyReference(propertyName: string): Value<any>;
    update(): void;
    getDataModelMap(): WidgetDataModel;
    getCustomEvents(): string[];
    hasCustomEvent(eventName: string): boolean;
    getPropertyType(property: string): TagDataType;
    updateModel(): void;
    /**
       * @deprecated
     * Will be deprecated in future versions, use getChildrenLimit instead
     */
    getChildrendLimit(type: string): number;
    getChildrenLimit(type: string): number;
    /**
     * @deprecated
     * Will be deprecated in future versions, use setChildrenLimit instead
     */
    setChildrendOverflow(type: string, overflow: boolean): void;
    setChildrenOverflow(type: string, overflow: boolean): void;
    /**
     * @deprecated
     * Will be deprecated use getChildren instead
     * Return a list of top level children
     */
    getChildrend(): BaseWgt[];
    /**
     * Return a list of top level children
     */
    getChildren(): BaseWgt[];
    protected onBeforeChildAdded(child: BaseWgt): void;
    protected onBeforeInitChildren(): void;
    protected beforeRemove(): void;
    protected onModelUpdated(): void;
    protected onChildRemoved(child: BaseWgt): void;
    protected onChildAdded(child: BaseWgt): void;
    onBeforeDatalinkAttached(datalink: DataLink): void;
    onAfterDatalinkDetached(datalink: DataLink): void;
    onDataLinkPermissionUpdated(datalink: DataLink): void;
    onDatalinkInitialized(datalink: DataLink): void;
    onPropertyUpdated(callback: (property: IPropertyEventDetail) => void): void;
    protected emitPropertyUpdated(event: IPropertyEventDetail): void;
}
export interface IEvents {
    [eventName: string]: ActionWgt[];
}
interface IDatalinksMap {
    [id: string]: DataLink;
}
export interface IWidgetSerialization {
    type?: string;
    id?: string;
    name?: string;
    parentId?: string;
    wgts?: IWidgetSerialization[];
    datalinks?: {
        [id: string]: IDataLinkConstructorArgs;
    };
    unselectable?: boolean;
    disabled?: boolean;
    mapAssets?: Map<PropertyName, ListOfAssets>;
    eventsAlias?: {
        [key: EventName]: string[];
    };
    isCustomWidget?: boolean;
    [prop: string]: any;
}
export interface ArgsAddDatalinkOptions {
    removeDuplicate: boolean;
}
interface InfoTagReferenceCounter {
    widgets: {
        id: string;
        type: string;
        property: string;
        weak: boolean;
    }[];
}
export interface IArgsGetTagOccurrences {
    mapOccurrences?: Map<string, number>;
    mapInfo?: Map<string, InfoTagReferenceCounter>;
    useCurrentState?: boolean;
    excludeWeakDatalink?: boolean;
    weakTagSet?: Set<string>;
}
export {};
