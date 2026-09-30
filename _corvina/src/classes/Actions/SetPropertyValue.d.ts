import Action from './Action';
import { Dashboard } from '@/corvina-model';
export interface ISetPropertyValueArgs {
    widgetId: string;
    prop: string;
    value: any;
}
export declare class SetPropertyValue extends Action {
    args: ISetPropertyValueArgs;
    listLanguageMgrRemoved: Map<string, Map<string, any>>;
    undoValue: any;
    constructor(args: ISetPropertyValueArgs, dashboard: Dashboard);
    do(): void;
    undo(): void;
    private setWidgetValue;
}
