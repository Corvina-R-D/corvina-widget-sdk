import { BaseWgt, Layout, LayoutConfig, Value, IWgtConstructorParams } from '@/corvina-model';
import { IWidgetSerialization } from './BaseWgt';
import { LayoutType } from "@/constant/Layouts";
import { ProgressData } from '@/communication/axios/IDashboardAxiosInstance';
interface Point {
    x: number;
    y: number;
    z?: number;
}
type ChainElements = Array<{
    wgt: BaseGraphicWgt;
    inverse: number[][];
}>;
export interface FreeGridLayout {
    positionRef: string;
    prefferedSize?: {
        w: number;
        h: number;
    };
}
export declare enum BREAKPOINTS_MODE {
    RECURSIVE = 0,
    MAIN_GROUP_MASTER = 1,
    NONE = 2
}
export interface IBaseGraphicWidgetSerialization extends IWidgetSerialization {
    x: number;
    y: number;
    width: number;
    height: number;
    minY?: number;
    tx?: number;
    ty?: number;
    tz?: number;
    rx?: number;
    ry?: number;
    rz?: number;
    sx?: number;
    sy?: number;
    sz?: number;
    cx?: number;
    cy?: number;
    mtx?: number[][];
    xformScaling?: boolean;
    keepAspectRatio?: boolean;
    supportedIn3D?: boolean;
    displayAsBillboard?: string;
    prevWidth?: number;
    prevHeight?: number;
    prevX?: number;
    prevY?: number;
    fullscreenMode?: boolean;
    placeholderWidth?: number;
    placeholderHeight?: number;
    pinned?: boolean;
    depth?: number;
    opacity?: number;
    display?: string;
    position?: string;
    layout?: Layout;
    layoutConfiguration?: ConfigurationLayout;
    bgColor?: string;
    topStroke?: number;
    bottomStroke?: number;
    leftStroke?: number;
    rightStroke?: number;
    topStrokeStyle?: string;
    bottomStrokeStyle?: string;
    leftStrokeStyle?: string;
    rightStrokeStyle?: string;
    topStrokeColor?: string;
    bottomStrokeColor?: string;
    leftStrokeColor?: string;
    rightStrokeColor?: string;
    paddingTop?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingBottom?: number;
    elevation?: number;
    showPermissions: boolean;
    usePermissions: boolean;
    enabledForGroups: Array<string>;
    visibleForGroups: Array<string>;
}
/** A numeric property out of range: it must be less/greater or equal to another property of the widget or to a constant */
export interface IRangeError {
    mustBe: "lessOrEqual" | "greaterOrEqual";
    bound: string | number;
}
export default abstract class BaseGraphicWgt extends BaseWgt {
    parent: BaseGraphicWgt;
    display: string;
    x: number;
    y: number;
    minY: number;
    tx: Value<number>;
    ty: Value<number>;
    tz: Value<number>;
    rx: Value<number>;
    ry: Value<number>;
    rz: Value<number>;
    sx: Value<number>;
    sy: Value<number>;
    sz: Value<number>;
    transform2D: boolean;
    displayAsBillboard: string;
    prevWidth: number;
    prevHeight: number;
    prevX: number;
    prevY: number;
    fullscreenMode: boolean;
    placeholderWidth: number;
    placeholderHeight: number;
    pinned: boolean;
    width: number;
    height: number;
    depth: number;
    position: string;
    layout?: Layout;
    protected layoutType: LayoutType;
    layoutConfiguration: ConfigurationLayout;
    vm: any;
    isVisible: boolean;
    cx: number;
    cy: number;
    mtx: Array<Array<number>>;
    xformScaling: any;
    opacity: Value<number>;
    scaling: number;
    keepAspectRatio: boolean;
    supportedIn3D: boolean;
    bgColor: Value<string>;
    paddingTop: number;
    paddingLeft: number;
    paddingRight: number;
    paddingBottom: number;
    topStroke: number;
    bottomStroke: number;
    leftStroke: number;
    rightStroke: number;
    topStrokeStyle: string;
    bottomStrokeStyle: string;
    leftStrokeStyle: string;
    rightStrokeStyle: string;
    topStrokeColor: Value<string>;
    bottomStrokeColor: Value<string>;
    leftStrokeColor: Value<string>;
    rightStrokeColor: Value<string>;
    scrollLeft: number;
    scrollTop: number;
    elevation: number;
    private _boundingRect;
    protected offsetTop: number;
    protected offsetLeft: number;
    protected defaultDisplay: string;
    protected defaultPosition: string;
    showPermissions: boolean;
    usePermissions: boolean;
    enabledForGroups: Array<string>;
    visibleForGroups: Array<string>;
    inEditor: boolean;
    static styleProps: ({
        name: string;
        default: string;
        init: (v: string) => Value<unknown>;
    } | {
        name: string;
        default: number;
        init?: undefined;
    } | {
        name: string;
        default: string;
        init?: undefined;
    } | {
        name: string;
        default: number;
        init: typeof BaseGraphicWgt.getOpacityValue;
    })[];
    mtxChainInfo: ChainElements;
    constructor(args: IWgtConstructorParams<IBaseGraphicWidgetSerialization>);
    matchGroupOrUser(permittedGroups: Array<string | number>): boolean;
    get isVisiblePermitted(): boolean;
    get isEnabledPermitted(): boolean;
    get top(): number;
    set top(value: number);
    get left(): number;
    set left(value: number);
    set scaleFactor(value: number);
    get scaleFactor(): number;
    get parentWidget(): BaseGraphicWgt;
    set parentWidget(wgt: BaseGraphicWgt);
    setInitState(): void;
    protected setStyleProperties(initState: any): void;
    private static getOpacityValue;
    protected setDefaultPositioning(): void;
    getStateForDefaults(): any;
    serialize(): IBaseGraphicWidgetSerialization;
    haveLayout(): boolean;
    hasLayout(): boolean;
    getLayoutType(): LayoutType;
    hasLayoutConfiguration(name: any): boolean;
    getLayoutConfigurationType(): string;
    removeLayoutConfiguration(name: string): boolean;
    setWidgetLayoutPosition(type: string, conf: any): void;
    getWidgetLayoutConfiguration(type: any): FreeGridLayout;
    getLayoutConf(): LayoutConfig;
    getCurrentLayoutSize(): number;
    isGroupWgt(): boolean;
    getLayout(grsize?: any): LayoutConfig;
    getBounds(): {
        w: number;
        h: number;
        x: number;
        y: number;
    };
    getParentBounds(targetParent: BaseGraphicWgt): IBounds;
    parentTransform(parentWgt: any): number[][];
    applyBoundsToChildren(): void;
    applyBounds(): void;
    setParentBounds(x: number, y: number, width: number, height: number, parentWgt?: BaseGraphicWgt): void;
    protected _map(mtx: Number[][], point: Point): Point;
    _normalizePosition(P: number[][], PI: number[][], sceneBounds: Point): void;
    updateBoundingRect(): void;
    protected _mapRect(mtx: number[][], rect: IBounds): IBounds;
    protected getCompleteTransform(targetParent: BaseGraphicWgt): Array<Array<number>>;
    setAsVisible(isVisible: any): void;
    /**
     * Return the intrinsic content height (in pixels) the widget needs to fully
     * display its content for the given available width. Used by the grid layout
     * Auto-Size Row feature (see GridLayoutClass.computeAutoSizeRowHeights).
     *
     * The width parameter is essential for widgets whose content height depends on
     * the available horizontal space (e.g. word-wrapping text blocks).
     *
     * Concrete widget subclasses override this method according to their content
     * type (text length/line-height for labels, row count for tables, etc.).
     *
     * @param availableWidth - The width available to the widget, already resolved
     *                         by the layout's widthCalc step.
     * @returns The required content height in pixels, or -1 when the widget does
     *          not support intrinsic height calculation (default). A widget that
     *          returns -1 is excluded from the auto-size computation for its row.
     */
    getContentHeight(availableWidth: number): number;
    get boundingRect(): IBounds;
    get boundingRectWidth(): number;
    set boundingRectWidth(value: number);
    get boundingRectHeight(): number;
    set boundingRectHeight(value: number);
    setLayoutPosition(layout: Layout): void;
    setLayout(layout: LayoutConfig, size: string): void;
    setLayoutProp(prop: string, value: any, applyAlgorithm?: boolean, size?: number): void;
    updateLayout(): void;
    setPropertyValue({ prop, value, ts }: {
        prop: any;
        value: any;
        ts?: number;
    }): void;
    /**
     * Schedules a new render() of an SDK widget registered without a Vue component (see SdkRender).
     * Property changes request it automatically, call it when the render depends on internal state.
     * It is a no-op for widgets rendered by a Vue component.
     */
    requestUpdate(): void;
    getPropertyValue(prop: any): any;
    /**
     * Range errors of a numeric property, to be shown by its property control.
     * Override it in the widgets that validate their properties
     */
    getRangeErrors(prop: string): IRangeError[];
    /** i18n keys and params of the errors of a property, read by the property control as `<prop>_errorMessages` */
    getErrorMessages(prop: string): Array<{
        key: string;
        params: {
            [name: string]: string | number;
        };
    }>;
    getCustomCSSClasses(): string[];
    setHeight(height: number): void;
    setWidth(width: number): void;
    setRectHeight(height: number): void;
    setRectWidth(width: number): void;
    getTransformMatrix(): number[][];
    setOffsetTop(value: number): void;
    setOffsetLeft(value: number): void;
    getOffsetTop(): number;
    getOffsetLeft(): number;
    getScale(): number;
    mapPointInLocalTransformation(x: number, y: number): number[];
    /**
     * JM4web function to manage coordinate calculation
     */
    mapPointInGlobalTransformation(x: number, y: number): number[];
    saveMtxChain(mtxChainInfo: any): void;
    move(x: number, y: number): void;
    setX(newX: any): void;
    setY(newY: any): void;
    getColSpan(size: number): number;
    getGridPosition(size: number): any;
    hasPositionInGridLayout(): boolean;
    /**
     * Transformation matrix actually rendered by getStyles(): mtx plus the 2D translation (tx, ty)
     * and rotation (rx) when transform2D is enabled.
     */
    getRenderedTransform(): number[][];
    private applyTransformation;
    private cloneMatrix;
    private translate;
    private rotate;
    private formatTransformMatrixToCSS;
    getFixedStyleForChildren(): {};
    getStyles(): {
        [property: string]: string | number;
    };
    isPreviewMode(): boolean;
    getScrollAndStrokeOffset(): {
        offsetX: number;
        offsetY: number;
    };
    setScrollPosition(top: number, left: number): void;
    getAbsolutePosition(): {
        x: number;
        y: number;
    };
    /** Allot to keep track of asset loading */
    updateLoadingStatus(progressData: ProgressData): void;
    getWidgetByLayout(layoutConfiguration: ConfigurationLayout): BaseGraphicWgt;
    getWidgetLayoutPosition(child: BaseGraphicWgt): any;
    copyPasteSerialization(): IWidgetSerialization;
}
interface IBounds {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ConfigurationLayout {
    type: string;
    configuration: FreeGridLayout;
}
export {};
