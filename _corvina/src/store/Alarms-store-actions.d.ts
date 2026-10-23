import { AlarmDetail } from '../interfaces/alarm';
declare const _default: {
    saveAlarms(context: any, payload: any): void;
    saveAlarmsSeverityCount(context: any, alarms: any): void;
    saveAlarmDetails(context: any, alarmDetails: any): void;
    fetchAlarmsList(context: any, filter?: {
        search: string;
        page: number;
        pageSize: number;
        append: boolean;
        deviceName: string;
        deviceGroups: any[];
        orderBy: string;
        orderDir: string;
        filterSeverity: string;
        filterDate: {
            start: string;
            end: string;
        };
        queryParams: any[];
        activeAlarms: boolean;
        fetchDeviceLabel: boolean;
        alarmsScopeId: any;
    }): Promise<import("../interfaces/alarm").AlarmInDTO>;
    fetchAlarmDetails(context: any, { alarmId }: {
        alarmId: any;
    }): Promise<AlarmDetail[]>;
    fetchAlarmsSeverityCount(): Promise<any>;
    resetAlarm(context: any, data: any): Promise<unknown>;
    acknowledgeAlarm(context: any, data: any): Promise<unknown>;
    clearAlarm(context: any, data: any): Promise<void>;
    resetAllAlarms(context: any, data: any): Promise<void>;
    acknowledgeAllAlarms(context: any, data: any): Promise<void>;
    clearAllAlarms(context: any, data: any): Promise<void>;
};
export default _default;
