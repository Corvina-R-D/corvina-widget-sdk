import { GroupWgt, Dashboard } from "@/corvina-model";
declare class GridController {
    maxCols: number;
    maxRows: number;
    setRows(dashboard: Dashboard, group: GroupWgt, grRows: number, size?: number): void;
    private updateRowConfiguration;
    setColumns(dashboard: Dashboard, group: GroupWgt, grCols: number, size?: number): void;
    private updateColumnConfiguration;
    setRowsGlobal(grRows: number, selectedWidget: GroupWgt, dashboard: Dashboard, breakpoint?: number): void;
    setColumnsGlobal(grCols: number, selectedWidget: GroupWgt, dashboard: Dashboard, breakpoint?: number): void;
    private updateWidgetsInRows;
    private updateWidgetsInColumns;
}
declare const _default: GridController;
export default _default;
