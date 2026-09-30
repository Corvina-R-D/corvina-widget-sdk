declare const _default: {
    namespaced: boolean;
    state: {
        alarms: {};
        alarmsSeverityCount: {};
        alarm_details: {};
        byDevice: Map<string, {
            AlarmIn: any;
            number: any;
        }>;
    };
    mutations: {
        SAVE_ALARMS(state: any, alarms: any): void;
        RESET_ALARM(state: any, alarm: any): void;
        ACKNOWLEDGE_ALARM(state: any, alarm: any): void;
        CLEAR_ALARM(state: any, alarmId: any): void;
        SAVE_ALARMS_SEVERITY_COUNT(state: any, alarms: any): void;
        SAVE_ALARM_DETAILS(state: any, alarm: any): void;
        SAVE_ALARM_DEVICE_COUNT(state: any, { deviceId, alarms, alarmUpdateEpochCounter }: {
            deviceId: any;
            alarms: any;
            alarmUpdateEpochCounter: any;
        }): void;
        CLEAR_OLD_ALARM_DEVICE_COUNT(state: any, { alarmUpdateEpochCounter, deletedDevicesOut }: {
            alarmUpdateEpochCounter: any;
            deletedDevicesOut: any;
        }): void;
    };
    actions: {
        saveAlarms(context: any, alarms: any): void;
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
        }): Promise<import("../interfaces/alarm").AlarmInDTO>;
        fetchAlarmDetails(context: any, { alarmId }: {
            alarmId: any;
        }): Promise<import("../interfaces/alarm").AlarmDetail[]>;
        fetchAlarmsSeverityCount(): Promise<any>;
        fetchSeverityCountForDevice(context: any, filter: {
            pagination: any;
            next: null;
        }): Promise<{
            counterAlarmDevices: import("../interfaces/alarm").AlarmSeverityDevice[];
            zeroCountDevices: string[];
        }>;
        resetAlarm(context: any, data: any): Promise<unknown>;
        acknowledgeAlarm(context: any, data: any): Promise<unknown>;
        clearAlarm(context: any, data: any): Promise<void>;
        resetAllAlarms(context: any, data: any): Promise<void>;
        acknowledgeAllAlarms(context: any, data: any): Promise<void>;
        clearAllAlarms(context: any, data: any): Promise<void>;
    };
    getters: {
        getAlarms(state: any): any;
        getAlarmsSeverityCount(state: any): any;
        getAlarmsByDevice(state: any): (deviceId: any) => any;
        getStateDevice(state: any): any;
    };
};
export default _default;
