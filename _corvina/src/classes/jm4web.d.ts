export declare interface ISize {
    width: number;
    height: number;
}
export declare interface IGridConfiguration {
    grVUF: number;
    grVOF: number;
    grHUF: number;
    grHOF: number;
    grRows: number;
    grCols: number;
    grGStkMode: number;
    grGStkCollapsed: number;
    grGStkWidth: number;
    grGStkColor: string;
    grSclAutohide: number;
    grSclBgColor: number;
    grSclImage: string;
    grSclColor: string;
    grSclSize: number;
    grSclOffset: number;
    s: number;
}
export declare interface IColumnConfiguration {
    minWidth: number;
    maxWidth: number;
    lMargin: number;
    rMargin: number;
    lStroke: number;
    rStroke: number;
    stretch: number;
    rStkColor: string;
    lStkColor: string;
    colPos?: number;
}
export declare interface IRowConfiguration {
    minHeight: number;
    maxHeight: number;
    tMargin: number;
    bMargin: number;
    tStroke: number;
    bStroke: number;
    stretch: number;
    tStkColor: string;
    bStkColor: string;
    bgColor: string;
    rowPos?: number;
}
export declare interface IGridLayoutConfiguration {
    gr: IGridConfiguration;
    colsProps: Array<IColumnConfiguration>;
    rowsProps: Array<IRowConfiguration>;
}
export declare interface ICurrentConfiguration {
    cl: IGridLayoutConfiguration;
    id: number;
}
export declare interface IRenderFlags {
    DRAWGRID: number;
    DRWSCROLLBAR: number;
    UPDATESCROLLBARX: number;
    UPDATESCROLLBARY: number;
}
export declare interface IScrollOffsets {
    top: number;
    left: number;
}
export declare interface IOverflow {
    hor: number;
    ver: number;
}
import { GroupWgt } from "@/corvina-model";
import { ComposedWgt } from "@/corvina-model";
export declare interface hmiGroup extends GroupWgt {
    enableVerScrollbar(enable: boolean, size: number): any;
    enableHorScrollbar(enable: boolean, size: number): any;
}
export declare interface hmiWrapper extends ComposedWgt {
    enableVerScrollbar(enable: boolean, size: number): any;
    enableHorScrollbar(enable: boolean, size: number): any;
}
import { BaseGraphicWgt } from "@/corvina-model";
export type GroupChildren = BaseGraphicWgt[];
