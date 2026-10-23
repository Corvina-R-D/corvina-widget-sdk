declare const _default: {
    namespaced: boolean;
    state: {
        alarms: any[];
        alarmsByScope: {};
        alarmsSeverityCount: {};
        alarm_details: {};
        byDevice: Map<string, {
            AlarmIn: any;
            number: any;
        }>;
    };
    mutations: {
        SAVE_ALARMS(state: any, payload: any): void;
        RESET_ALARM(state: any, alarm: any): void;
        ACKNOWLEDGE_ALARM(state: any, alarm: any): void;
        CLEAR_ALARM(state: any, alarm: any): void;
        SAVE_ALARMS_SEVERITY_COUNT(state: any, alarms: any): void;
        SAVE_ALARM_DETAILS(state: any, alarm: any): void;
    };
    actions: {
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
        }): Promise<import("../interfaces/alarm").AlarmDetail[]>;
        fetchAlarmsSeverityCount(): Promise<any>;
        resetAlarm(context: any, data: any): Promise<unknown>;
        acknowledgeAlarm(context: any, data: any): Promise<unknown>;
        clearAlarm(context: any, data: any): Promise<void>;
        resetAllAlarms(context: any, data: any): Promise<void>;
        acknowledgeAllAlarms(context: any, data: any): Promise<void>;
        clearAllAlarms(context: any, data: any): Promise<void>;
    };
    getters: {
        getAlarms(state: any): any;
        getAlarmsByScope(state: any): (scopeId: any) => any;
        getAlarmsSeverityCount(state: any): any;
    };
};
export default _default;
