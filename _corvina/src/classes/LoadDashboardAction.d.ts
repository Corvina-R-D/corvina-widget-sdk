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
    /**
     * Resolve the dashboard id to load based on the given dashboard parameter.
     * If the name is provided, it tries to find the dashboard by name and returns a matching id,
     * preferring the one whose id matches the provided id when possible. If the resolved id
     * differs from the provided one, a warning is logged.
     * This is useful in case of import issues where the id of the imported dashboard is different
     * from the original one but the name is the same.
     */
    private resolveDashboardId;
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
