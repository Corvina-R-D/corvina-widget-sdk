import Action from './Action';
import { Dashboard } from '@/corvina-model';
export interface IMoveWidgetArgs {
    widgetId: string;
    x: number;
    y: number;
}
export declare class MoveWidget extends Action {
    args: IMoveWidgetArgs;
    undoX: number;
    undoY: number;
    constructor(args: IMoveWidgetArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
