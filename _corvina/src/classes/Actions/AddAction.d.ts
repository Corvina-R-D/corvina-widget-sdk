import { Dashboard } from '@/corvina-model';
import Action from './Action';
export interface IAddActionArgs {
    actionWgtId: string;
    eventName: string;
    parentId: string;
}
export declare class AddAction extends Action {
    args: IAddActionArgs;
    constructor(args: IAddActionArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
