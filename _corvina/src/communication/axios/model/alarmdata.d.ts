import { AlarmDetail } from "@/interfaces/alarm";
export declare enum AlarmEnabled {
    ENABLED = "ENABLED",
    NOT_ENABLED = "NOT_ENABLED"
}
export declare enum AlarmAction {
    ACK = "ACK",
    NO_ACK = "NO_ACK",
    RESET = "RESET"
}
export declare enum AlarmResetAck {
    REQUIRED = "REQUIRED",
    NOT_REQUIRED = "NOT_REQUIRED"
}
export declare enum AlarmStatus {
    ACTIVE = "ACTIVE",
    NOT_ACTIVE = "NOT_ACTIVE"
}
declare function convertValue(alarm: AlarmDetail): string;
declare function convertTime(UNIX_timestamp: any): string;
export { convertTime, convertValue };
