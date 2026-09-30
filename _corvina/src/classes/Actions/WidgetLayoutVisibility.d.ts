import { Dashboard } from '@/corvina-model';
import Action from './Action';
export interface IHideWidgetArgs {
    widgetId: string;
    type: string;
    mode: MODE;
}
export declare enum MODE {
    TOGGLE = 0,
    HIDE = 1,
    SHOW = 2
}
export declare class WidgetLayoutVisibility extends Action {
    args: IHideWidgetArgs;
    constructor(args: IHideWidgetArgs, dashboard: Dashboard);
    do(): boolean;
    undo(): boolean;
    redo(): boolean;
}
