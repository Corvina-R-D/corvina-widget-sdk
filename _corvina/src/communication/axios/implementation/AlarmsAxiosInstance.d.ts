import AbstractAxiosInstance from "./AbstractAxiosInstance";
import { AlarmInDTO, AlarmDetailInDTO, AlarmSeverityDeviceDTO } from "@/interfaces/alarm";
declare class AlarmsAxiosInstance extends AbstractAxiosInstance {
    constructor();
    updateBaseUrl(): void;
    getAlarms(params?: any): Promise<AlarmInDTO>;
    getAlarmDetails(alarmId: any): Promise<AlarmDetailInDTO>;
    getAlarmsSeverityCount(): Promise<any>;
    getAlarmsSeverityCountForDevice({ pagination }: {
        pagination: any;
    }): Promise<AlarmSeverityDeviceDTO>;
    resetAlarm(params?: any): Promise<unknown>;
    acknowledgeAlarm(params?: any): Promise<unknown>;
    clearAlarm(params?: any): Promise<unknown>;
    resetAllAlarms(params?: any): Promise<unknown>;
    acknowledgeAllAlarms(params?: any): Promise<unknown>;
    clearAllAlarms(params?: any): Promise<unknown>;
}
declare const _default: AlarmsAxiosInstance;
export default _default;
