import { Dashboard } from '@/corvina-model';
import Action from './Action';
export interface IRemoveActionArgs {
    actionWgtId: string;
    eventName: string;
    parentId: string;
}
export declare class RemoveAction extends Action {
    args: IRemoveActionArgs;
    constructor(args: IRemoveActionArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
