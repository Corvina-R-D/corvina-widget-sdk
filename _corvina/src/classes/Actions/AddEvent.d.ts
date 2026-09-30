import Action from './Action';
import { Dashboard } from '@/corvina-model';
export interface IAddEventArgs {
    wgtId: string;
    eventName: string;
    aliasID?: string;
}
export declare class AddEvent extends Action {
    args: IAddEventArgs;
    constructor(args: IAddEventArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
