import Action from './Action';
import { IRemoveWidgetArgs } from './RemoveWidget';
import { Dashboard, BaseWgt, ConfigurationLayout } from "@/corvina-model";
export interface IAddWidgetArgs {
    type: string;
    version?: string;
    parentId: string;
    position: any;
    layout?: any;
    initState?: any;
    isLoading?: boolean;
    forceId?: string;
    forceName?: string;
}
export declare class AddWidget extends Action {
    args: IAddWidgetArgs;
    redoArgs: IRemoveWidgetArgs;
    subscribeTags: boolean;
    confLayout: ConfigurationLayout;
    listLanguageMgrRemoved: Map<string, Map<string, any>>;
    constructor(args: IAddWidgetArgs, dashboard: Dashboard, subscribeTags?: boolean);
    setLayoutConfiguration(conf: ConfigurationLayout): void;
    private checkChildrendLimits;
    do(): BaseWgt;
    undo(): void;
    redo(): void;
}
