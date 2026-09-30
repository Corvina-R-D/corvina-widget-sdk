import { ActionWgt, IWidgetSerialization, Value } from "@/corvina-model";
import { DashboardEntryDTO } from '@/interfaces/flows';
export default class LoadDashboardAction extends ActionWgt {
    actionType: string;
    params: ILoadDashboardParams;
    constructor(args: any);
    serialize(): IWidgetSerialization;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    private getClockParams;
    execute(event: any): Promise<void>;
    getDashboardFlowId(dashboardTree: Array<DashboardEntryDTO>, dashboardId: string): any;
}
export interface ILoadDashboard {
    id: string;
    name: string;
}
export interface ILoadDashboardParams {
    dashboardIdName: Value<string | {
        id: string;
        name: string;
    }>;
    deviceSlots: {
        name: string;
        device: Value<string>;
    }[];
    variables: {
        name: string;
        value: Value<string>;
    }[];
    clock: boolean;
    id?: string;
}
