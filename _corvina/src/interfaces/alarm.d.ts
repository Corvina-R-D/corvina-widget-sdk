import { PaginationDTO } from "./commons/pagination";
import { AlarmStatusEnum } from "../constant/AlarmStatusEnum";
import { AlarmAction, AlarmEnabled, AlarmResetAck, AlarmStatus } from "../communication/axios/model/alarmdata";
export interface AlarmDetailInDTO {
    data: AlarmDetail[];
}
export interface AlarmInDTO extends PaginationDTO {
    data: AlarmIn[];
}
export declare class AlarmDetail {
    ack: AlarmResetAck;
    action: AlarmAction;
    description: String;
    enabled: AlarmEnabled;
    reset: AlarmResetAck;
    status: AlarmStatus;
    updatedAt: Number | String;
    value_double: Number;
    value_integer: Number;
    value_longinteger: Number;
    value_boolean: Boolean;
    value_string: String;
    value_binaryblob: String;
    value: String;
}
export interface AlarmIn {
    id: String;
    realmId: String;
    name: String;
    description: String;
    deviceId: String;
    tag: String;
    severity: Number;
    updatedAt: Number;
    eventTimestamp: Number;
    acknowledgedDate: Number;
    orgResourceId: String;
    status: AlarmStatusEnum;
    action: String;
    alarmEnabled: String;
    ack: String;
    reset: String;
    alarmHistory: AlarmDetail[];
    comment: String;
    platformAction: String;
    value_double: Number;
    value_integer: Number;
    value_longinteger: Number;
    value_boolean: Boolean;
    value_string: String;
    value_binaryblob: String;
    deviceLabel?: String;
}
export interface AlarmBulkAction {
    comment: string;
    applyOnlyToVisibleValue: boolean;
}
export interface AlarmSeverityEntry {
    severity: number;
    count: number;
}
export interface AlarmSeverityDeviceDTO {
    data: {
        [key: string]: AlarmSeverityEntry[];
    }[];
    last: boolean;
    next: string;
}
export interface AlarmSeverityDevice {
    deviceId: string;
    alarms: {
        severity: number;
        count: number;
    }[];
    alarmUpdateEpochCounter: number;
}
