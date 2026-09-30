import Action from './Action';
import { Dashboard, BaseGraphicWgt, Layout } from '@/corvina-model';
export interface IMoveWidgetInGridArgs {
    targetParent: BaseGraphicWgt;
    sourceParent: BaseGraphicWgt;
    source: BaseGraphicWgt;
    target: BaseGraphicWgt;
    previousLayout: Layout;
    newLayout: Layout;
}
export declare class MoveWidgetInGrid extends Action {
    args: IMoveWidgetInGridArgs;
    private previoustLayout;
    private previousSize;
    constructor(args: IMoveWidgetInGridArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
