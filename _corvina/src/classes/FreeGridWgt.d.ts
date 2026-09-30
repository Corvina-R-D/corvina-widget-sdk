import { BaseGraphicWgt, ConfigurationLayout } from '../corvina-model';
export interface GridItem {
    x: number;
    y: number;
    w: number;
    h: number;
    i: string;
    wgt?: BaseGraphicWgt;
}
export interface ItemPosition {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}
export default class FreeGridWgt extends BaseGraphicWgt {
    private columns;
    private rowHeight;
    private maxRows;
    private gridItems;
    private mapGridWidgets;
    private defaultBackgroundColorChildren;
    private marginH;
    private marginV;
    constructor(args: any);
    updateWidgetsLayout(): void;
    private resolveConflict;
    getWidgetByGridId(id: string): BaseGraphicWgt;
    getWidgetByLayout(layoutConfiguration: ConfigurationLayout): BaseGraphicWgt;
    getWidgetLayoutPosition(widget: BaseGraphicWgt): ItemPosition;
    hasGridLayout(): boolean;
    serialize(): any;
    getFreePositions(): Array<GridItem>;
    getMaxArea(freeGridItems: Array<GridItem>, position: ItemPosition): {
        maxW: number;
        maxH: number;
    };
    private removeItemFromGrid;
    removeChild(childIndex: number): BaseGraphicWgt;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    addGridItem(widget: BaseGraphicWgt, position: ItemPosition): boolean;
    isPositionFree(position: ItemPosition): boolean;
    getFreePositionIndex(): number;
}
