import { BaseWgt, Value } from "@/corvina-model";
import { IClockConfiguration } from "../interfaces/dashboard";
export declare enum DATAWINDOW_MODE {
    DURATION = 0,// Autoscroll: Form now to X units
    FIXED_INTERVAL = 1,// Interval: From X to Y
    RELATIVE = 2
}
export declare enum CLOCK_MODE {
    INDIPENDENT = 0,
    LINKED = 1
}
declare enum SHIFT_DIRECTION {
    BACKWARD = "backward",
    FORWARD = "forward"
}
declare enum TIME_UNITS {
    MILLISECONDS = "milliseconds",
    MINUTES = "minutes",
    HOURS = "hours",
    DAYS = "days",
    WEEKS = "weeks",
    YEARS = "years"
}
interface IShift {
    direction: SHIFT_DIRECTION;
    value: number;
    unit: TIME_UNITS;
}
declare class ClockWgt extends BaseWgt {
    static autoscrollInterval: number;
    protected startDate: Value<Date>;
    protected endDate: Value<Date>;
    protected samples: Value<number>;
    protected mode: Value<DATAWINDOW_MODE>;
    protected clockMode: CLOCK_MODE;
    protected linkedClockId: string;
    protected duration: number;
    protected autoscroll: boolean;
    protected autoscrollTimerID: number;
    protected futureIntervalTimerID: number;
    protected shift: IShift;
    protected humanDuration: {
        value: number;
        unit: TIME_UNITS;
    };
    protected realtimeTimer: any;
    constructor(args: any);
    protected updateHumanDuration(): void;
    protected castValueToDate(value: Value<Date> | number | string | Date): Date;
    private setRealtimeTimer;
    getClockConfiguration(): IClockConfiguration;
    private attachToLinkedClock;
    private detachLinkedClock;
    private applyShift;
    private getShiftMillis;
    getPropertyValue(prop: string): any;
    private emitDateIntervalUpdated;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    protected updateFutureIntervalRefresh(): void;
    protected disableFutureIntervalRefresh(): void;
    protected startAutoscroll(): void;
    protected stopAutoscroll(): void;
    protected updateTimeRangeFromDuration(): void;
    stop(): void;
    serialize(): any;
}
export default ClockWgt;
