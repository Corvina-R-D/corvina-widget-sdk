import { Dashboard } from "@/corvina-model";
import Action from './Action';
export interface IAddXForm {
    widgetId: string;
    datalinkId: string;
    initState: any;
}
export declare class AddXForm extends Action {
    args: IAddXForm;
    undoArgs: any;
    constructor(args: IAddXForm, dashboard: Dashboard);
    do(): void;
    undo(): void;
}
