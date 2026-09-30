import Action from './Action';
import { Dashboard } from '@/corvina-model';
export interface ISetRowsGlobalArgs {
    groupId: string;
    grRows: number;
    breakpoint: number;
}
export declare class SetRowsGlobal extends Action {
    args: ISetRowsGlobalArgs;
    undoValue: number;
    constructor(args: ISetRowsGlobalArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
