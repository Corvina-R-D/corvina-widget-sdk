import { Dashboard } from "../../corvina-model";
import { LayoutType } from "@/constant/Layouts";
import Action from "./Action";
export interface IRemoveWidgetArgs {
    widgetId: string;
    type: string;
    parentId: string;
    version?: string;
    initState: any;
    layout?: any;
    isLoading?: boolean;
}
interface ILayoutConfiguration {
    type: LayoutType;
    options: any;
}
export declare class RemoveWidget extends Action {
    args: IRemoveWidgetArgs;
    parentLayout: ILayoutConfiguration;
    listLanguageMgrRemoved: Map<string, Map<string, any>>;
    constructor(args: IRemoveWidgetArgs, dashboard: Dashboard);
    private updateChildrendLimits;
    do(): void;
    undo(): void;
    redo(): void;
    private stashLayoutState;
    private applyLayoutState;
}
export {};
