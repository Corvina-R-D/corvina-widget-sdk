import Action from './Action';
import { Dashboard } from "@/corvina-model";
export interface IReorderSiblingWidgetsArgs {
    parentId: string;
    newPartialOrder: string[];
}
export declare class ReorderSiblingWidgets extends Action {
    args: IReorderSiblingWidgetsArgs;
    currentTotalOrder: string[];
    constructor(args: IReorderSiblingWidgetsArgs, dashboard: Dashboard);
    do(): void;
    private applyNewOrder;
    undo(): void;
    redo(): void;
}
