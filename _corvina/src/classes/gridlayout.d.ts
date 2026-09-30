import { IGridConfiguration, IColumnConfiguration, IRowConfiguration, hmiGroup, hmiWrapper } from "./jm4web";
import { Bounds } from "../corvina-model";
/**
 * Interface defining the possible states of the grid layout calculation.
 * These states help determine how to handle various layout scenarios.
 */
interface gridState {
    OK: number;
    OVERFLOW: number;
    UNDERFLOW: number;
    ERROR: number;
}
/**
 * Interface defining how a widget is positioned and sized within the grid
 * This is the key layout information for each widget
 */
export interface widgetLayout {
    rOcc: number;
    cOcc: number;
    rSpan: number;
    cSpan: number;
    maxWidth?: number;
    maxHeight?: number;
    hItemUF?: number;
    vItemUF?: number;
    tMargin?: number;
    bMargin?: number;
    lMargin?: number;
    rMargin?: number;
    lBgColor?: string;
    preserveAR?: number;
    aR?: string;
}
/**
 * Interface defining stroke (border) mode options
 */
interface StrokeMode {
    AUTO: number;
    FIXED: number;
}
/**
 * Interface defining stroke collapse options
 * Stroke collapsing determines how borders between adjacent cells are rendered
 */
interface StrokeCollaption {
    FALSE: number;
    TRUE: number;
}
/**
 * GridLayoutClass manages grid layout calculations and widget positioning
 * It is responsible for determining the size and position of each cell in a grid
 * and positioning widgets within those cells according to layout constraints.
 */
export default class GridLayoutClass {
    gridProperties: IGridConfiguration;
    colProperties: Array<IColumnConfiguration>;
    rowProperties: Array<IRowConfiguration>;
    colXPos: Array<number>;
    rowYPos: Array<number>;
    static _grState: gridState;
    static _wgtHorUnderflowMode: {
        INHERITED: number;
        LEFT: number;
        CENTER: number;
        RIGHT: number;
    };
    static _groupHorUnderflowMode: {
        BLOCKED: number;
        LEFT: number;
        CENTER: number;
        RIGHT: number;
    };
    static _wgtVerUnderflowMode: {
        INHERITED: number;
        TOP: number;
        MIDDLE: number;
        BOTTOM: number;
    };
    static _groupVerUnderflowMode: {
        BLOCKED: number;
        TOP: number;
        MIDDLE: number;
        BOTTOM: number;
    };
    static _groupHorOverflow: {
        HIDDEN: number;
        VISIBLE: number;
        SCROLL: number;
    };
    static _groupVerOverflow: {
        HIDDEN: number;
        VSIBLE: number;
        SCROLL: number;
    };
    static _scrollbarAutohide: {
        AUTO: number;
        ALWAYSVISIBLE: number;
    };
    static enumStrokeMode: StrokeMode;
    static enumStrokeCollaption: StrokeCollaption;
    /**
     * Constructor for GridLayoutClass
     * No initialization is done here; call init() separately
     */
    constructor();
    /**
     * Initialize the grid layout with a configuration object
     *
     * @param config - Configuration object containing grid, column, and row properties
     * @param disableRowCollapse - Optional flag to disable row stroke collapsing
     */
    init(config: any, disableRowCollapse?: boolean): void;
    /**
     * Calculate the minimum width required for all columns combined
     * This is the smallest width the grid can be without causing overflow
     *
     * @returns The minimum width required for all columns
     */
    private getGridColInferiorLimit;
    /**
     * Calculate the minimum height required for all rows combined
     * This is the smallest height the grid can be without causing overflow
     *
     * @returns The minimum height required for all rows
     */
    private getGridRowInferiorLimit;
    /**
     * Calculate the maximum width that all columns could occupy
     * This is used to determine if underflow will occur
     *
     * @returns The maximum width for all columns
     */
    private getGridColSuperiorLimit;
    /**
     * Calculate the maximum height that all rows could occupy
     * This is used to determine if underflow will occur
     *
     * @returns The maximum height for all rows
     */
    private getGridRowSuperiorLimit;
    /**
     * Get a copy of the row properties array
     *
     * @returns Array of row configurations or null if not initialized
     */
    getRowProperties(): Array<IRowConfiguration>;
    /**
     * Get a copy of the column properties array
     *
     * @returns Array of column configurations or null if not initialized
     */
    getColProperties(): Array<IColumnConfiguration>;
    /**
     * Compute collapsed strokes for rows
     * This adjusts stroke widths at row boundaries to avoid double-thick strokes
     * when adjacent rows both have strokes
     */
    computeRowStrokeCollapsed(): void;
    /**
     * Compute collapsed strokes for columns
     * This adjusts stroke widths at column boundaries to avoid double-thick strokes
     * when adjacent columns both have strokes
     *
     * This function is almost identical to computeRowStrokeCollapsed but for columns
     */
    computeColStrokeCollapsed(): void;
    /**
     * Get the grid properties object
     *
     * @returns The grid configuration or null if not initialized
     */
    getGridProperties(): IGridConfiguration;
    /**
     * Parse the width component of an aspect ratio string
     * For example, from "16:9" returns 16
     *
     * @param aRStr - Aspect ratio string in format "width:height"
     * @returns The width component as a number
     */
    getWaR(aRStr: string): number;
    /**
     * Parse the height component of an aspect ratio string
     * For example, from "16:9" returns 9
     *
     * @param aRStr - Aspect ratio string in format "width:height"
     * @returns The height component as a number
     */
    getHaR(aRStr: string): number;
    /**
     * Calculate the total minimum width required for all columns
     * This is used to determine if scrollbars are needed
     *
     * @returns The total minimum width for all columns
     */
    private getTotalColMinWidth;
    /**
     * Calculate the total minimum height required for all rows
     * This is used to determine if scrollbars are needed
     *
     * @returns The total minimum height for all rows
     */
    private getTotalRowMinHeight;
    /**
     * Adjust widget positions and sizes to preserve their aspect ratios
     * This is called after the basic layout calculations
     *
     * @param grpWgt - The group or wrapper widget containing the children
     * @param wgtsBoundsMap - Map of widget IDs to their bounds
     */
    preserveAR(grpWgt: hmiGroup | hmiWrapper, wgtsBoundsMap: Map<string, Bounds>): void;
    /**
     * Apply the complete layout algorithm to a group widget
     * This handles width calculation, height calculation, and aspect ratio preservation
     *
     * @param grpWgt - The group or wrapper widget to apply layout to
     * @param wgtsBoundsMap - Map of widget IDs to their bounds
     */
    applyAlgorithm(grpWgt: hmiGroup | hmiWrapper, wgtsBoundsMap: Map<string, Bounds>): void;
    /**
     * Calculate the width and horizontal position of each column and child widget
     *
     * @param grpWgt - The group or wrapper widget containing the grid
     * @param wgtsBoundsMap - Map of widget IDs to their bounds
     * @param recursive - Flag indicating if this is a recursive call
     */
    widthCalc(grpWgt: hmiGroup | hmiWrapper, wgtsBoundsMap: Map<string, Bounds>, recursive?: boolean): void;
    /**
     * Calculate the height and vertical position of each row and child widget
     * This is very similar to widthCalc but for the vertical dimension
     *
     * @param grpWgt - The group or wrapper widget containing the grid
     * @param wgtsBoundsMap - Map of widget IDs to their bounds
     * @param recursive - Flag indicating if this is a recursive call
     */
    heightCalc(grpWgt: hmiGroup | hmiWrapper, wgtsBoundsMap: Map<string, Bounds>, recursive?: boolean): void;
    /**
     * Compare two numbers with a small epsilon to handle floating point precision issues
     *
     * @param groupWidth - First number to compare
     * @param newWidth - Second number to compare
     * @returns True if the numbers are approximately equal, false otherwise
     */
    fuzzyCompare(groupWidth: number, newWidth: number): boolean;
    /**
     * Reposition widgets horizontally based on calculated column positions
     * This is called after column widths have been determined
     *
     * @param children - Array of child widgets to position
     * @param xOffset - Additional horizontal offset to apply to all widgets
     * @param wgtsBoundsMap - Map of widget IDs to their bounds
     */
    wgtRepositioningX(children: any, xOffset: number, wgtsBoundsMap: Map<string, Bounds>): void;
    /**
     * Reposition widgets vertically based on calculated row positions
     * This is called after row heights have been determined
     * This function is very similar to wgtRepositioningX but for vertical positioning
     *
     * @param children - Array of child widgets to position
     * @param yOffset - Additional vertical offset to apply to all widgets
     * @param wgtsBoundsMap - Map of widget IDs to their bounds
     */
    wgtRepositioningY(children: any, yOffset: number, wgtsBoundsMap: Map<string, Bounds>): void;
    /**
     * Core algorithm for calculating column widths based on available width
     * This distributes the available width among columns according to their stretch factors
     * and respects minimum and maximum width constraints
     *
     * @param gwidth - Available width for the grid
     * @returns Grid state (OK, OVERFLOW, UNDERFLOW, ERROR)
     */
    baseWidthCalc(gwidth: number): number;
    /**
     * Core algorithm for calculating row heights based on available height
     * This is very similar to baseWidthCalc but for vertical dimension
     *
     * @param gheight - Available height for the grid
     * @returns Grid state (OK, OVERFLOW, UNDERFLOW, ERROR)
     */
    baseHeightCalc(gheight: number): number;
}
export {};
