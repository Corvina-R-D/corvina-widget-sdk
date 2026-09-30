import { BaseGraphicWgt, Column, GridConfiguration, GridLayout, Layout, LayoutConfig, Row, IDataLinkConstructorArgs } from '@/corvina-model';
import BaseWgt from "./BaseWgt";
import { ILayoutConfig } from "@/classes/LayoutConfig";
import { LayoutType } from "@/constant/Layouts";
import PlaceholderWgt from './PlaceholderWgt';
import { IColumnConfiguration as ColumnConfiguration, IRowConfiguration as RowConfiguration } from './jm4web';
export default class GroupWgt extends BaseGraphicWgt {
    grconf: GridConfiguration[];
    curGridConf: GridConfiguration;
    gl: GridLayout;
    gridMatrix: any[];
    placeholders: {
        [id: string]: PlaceholderWgt;
    };
    wgts: BaseGraphicWgt[];
    isCustomWidget: boolean;
    props: any;
    scrollbarY: {
        [size: number]: boolean;
    };
    scrollbarX: {
        [size: number]: boolean;
    };
    private defaultBackgroundColorChildren;
    elevateOnHover: boolean;
    constructor(args: any);
    initGridLayout(): void;
    initCustomWidgetAliases(wgt: BaseGraphicWgt): void;
    protected addAliasDatalinkToTarget(target: BaseWgt, args: IDataLinkConstructorArgs): void;
    watchAlias(): any;
    protected setStyleProperties(initState: any): void;
    getStyles(): {
        [property: string]: string | number;
    };
    isGroupWgt(): boolean;
    getRootGroup(): GroupWgt;
    removeChild(childIndex: number): BaseWgt;
    insertColumnGlobal(position: any): void;
    insertRowGlobal(position: any): void;
    addColumnGlobal(): void;
    addRowGlobal(): void;
    removeColumnGlobal(colPos: any): void;
    removeRowGlobal(rowPos: any): void;
    serialize(): import("./BaseGraphicWgt").IBaseGraphicWidgetSerialization;
    getGridProperties(): import("./jm4web").IGridConfiguration;
    getGLRowProps(): RowConfiguration[];
    getGLColProps(): ColumnConfiguration[];
    getRowProps(rowIndex: number): RowConfiguration;
    getColProps(colIndex: number): ColumnConfiguration;
    getGridColsNumber(): number;
    getGridRowsNumber(): number;
    isGlobalStrokeCollaptionActive(): boolean;
    isGlobalStrokeModeFixed(): boolean;
    getGlobalStrokeWidth(): number;
    getGlobalStrokeColor(): string;
    setParentBounds(x: any, y: any, width: any, height: any, parentWgt?: any): void;
    setGroupBounds(bounds: any, parentWgt: any): void;
    getScaleFactor(originalSize: any, newSize: any): {
        w: number;
        h: number;
    };
    setBoundsToChildren(scaleFactor: any, parentWgt: any): void;
    getPropertyValue(prop: any): any;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    setAliasPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getGridConf(size?: number): GridConfiguration;
    hasGridLayout(): boolean;
    createCompatibleLayout(layoutConfig: ILayoutConfig): Layout;
    createLayout(partialConfig: any): Layout;
    generateLayoutForCurrentSize(layoutConfig: LayoutConfig): Layout;
    generateLayoutForPlaceholder(colPosition: number, rowPosition: number): Layout;
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
    private getReferenceWidthForCurrentSize;
    private getGridForCurrentSize;
    applyGridlayout(): void;
    getChildren(): BaseGraphicWgt[];
    addChild(child: BaseWgt): void;
    addChildren(children: BaseWgt[]): void;
    removePlaceholders(placeholders: PlaceholderWgt[]): void;
    removeAllPlaceholders(): void;
    private updatePlaceholders;
    generateGridMatrix(): any[];
    generateGridMatrixRecursive(): void;
    populateOccupiedMatrixSpaces(gridMatrix: any): void;
    findEmptyPositionInCurrentGrid(): {
        row: number;
        column: number;
        cSpan: number;
        rSpan: number;
    };
    getGridSize(): number;
    getGridRowsProps(): Row[];
    getGridColsProps(): Column[];
    getCurrentBreakpoint(): number;
    findEmptyPositionInLayouts(preferred?: {
        row: number;
        col: number;
    }): {
        layouts: {
            [size: number]: any;
        };
        placeholders: Array<string>;
    };
    getLayoutType(): LayoutType;
    setGridPropsForBreakpoint(breakpoint: any, { element, prop, value }: {
        element: any;
        prop: any;
        value: any;
    }): void;
    setGridProps(gridconf: any, element: any, prop: any, value: any): void;
    enableVerScrollbar(enable: boolean, size: number): void;
    enableHorScrollbar(enable: boolean, size: number): void;
    getYScrollPosition(): number;
    getXScrollPosition(): number;
    getScrollAndStrokeOffset(): {
        offsetX: number;
        offsetY: number;
    };
    protected beforeRemove(): void;
}
