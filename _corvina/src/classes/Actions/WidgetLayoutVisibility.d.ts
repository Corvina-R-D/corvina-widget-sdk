import { Dashboard } from '@/corvina-model';
import Action from './Action';
export interface IHideWidgetArgs {
    widgetId: string;
    type: string;
    mode: MODE;
    breakpoint: number;
}
export declare enum MODE {
    TOGGLE = 0,
    HIDE = 1,
    SHOW = 2
}
export declare class WidgetLayoutVisibility extends Action {
    args: IHideWidgetArgs;
    constructor(args: IHideWidgetArgs, dashboard: Dashboard);
    private getCurrentBreakpoint;
    do(): boolean;
    undo(): boolean;
    redo(): boolean;
}
