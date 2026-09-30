declare const _default: {
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
export default _default;
