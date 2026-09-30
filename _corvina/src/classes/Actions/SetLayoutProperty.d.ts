import Action from './Action';
import { Dashboard } from '@/corvina-model';
export interface ISetLayoutPropertyArgs {
    widgetId: string;
    prop: string;
    value: any;
    size: number;
}
export declare class SetLayoutProperty extends Action {
    args: ISetLayoutPropertyArgs;
    undoValue: any;
    constructor(args: ISetLayoutPropertyArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
