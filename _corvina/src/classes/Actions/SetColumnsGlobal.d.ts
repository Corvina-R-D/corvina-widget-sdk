import Action from './Action';
import { Dashboard } from '@/corvina-model';
export interface ISetColumnsGlobalArgs {
    groupId: string;
    grCols: number;
    breakpoint: number;
}
export declare class SetColumnsGlobal extends Action {
    args: ISetColumnsGlobalArgs;
    undoValue: number;
    constructor(args: ISetColumnsGlobalArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
