import { BaseWgt, Value } from "@/corvina-model";
import { IClockConfiguration, DATAWINDOW_MODE } from "../interfaces/dashboard";
import { TIME_UNITS } from "@/interfaces/dashboardClock";
export declare enum CLOCK_MODE {
    INDEPENDENT = 0,
    LINKED = 1
}
export declare enum SHIFT_DIRECTION {
    BACKWARD = "backward",
    FORWARD = "forward"
}
export interface IShift {
    direction: SHIFT_DIRECTION;
    value: number;
    unit: TIME_UNITS;
}
export interface IDurationStruct {
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
    protected beatIntervalTimerID: number;
    protected shift: IShift;
    protected durationStruct: {
        value: number;
        unit: TIME_UNITS;
    };
    protected realtimeTimer: any;
    constructor(args: any);
    protected updateDurationStructFromDuration(): void;
    protected calcDurationFromStruct(): number;
    protected castValueToDate(value: Value<Date> | number | string | Date): Date;
    private scheduleNotificationReachNow;
    getClockConfiguration(): IClockConfiguration;
    private attachToLinkedClock;
    private detachLinkedClock;
    private applyCalendarShift;
    private applyShift;
    private getShiftMillis;
    getPropertyValue(prop: string): any;
    private emitDateIntervalUpdated;
    private _handleDateIntervalChange;
    private _handleStartDateChange;
    private _handleEndDateChange;
    private _handleShiftChange;
    private _handleClockModeChange;
    private _handleModeChange;
    private _handleLinkedClockIdChange;
    private _handleDurationStructChange;
    private durationFromStructValue;
    private validateDuration;
    private _handleDurationChange;
    private _isCalendarUnit;
    private _handleAutoscrollChange;
    setPropertyValue({ prop, value }: {
        prop: any;
        value: any;
    }): void;
    getRefreshInterval(): number;
    protected getAutoscrollRefreshInterval(): number;
    protected getBeatDataRefreshInterval(): number;
    protected enableBeatDataPolling(): void;
    protected disableBeatDataPolling(): void;
    protected startAutoscroll(): void;
    protected stopAutoscroll(): void;
    protected updateTimeRangeFromDuration(): void;
    calendarIntervalTo(durationStruct: {
        value: number;
        unit: TIME_UNITS;
    }, date: Date): {
        startDate: Date;
        endDate: Date;
    };
    protected updateTimeRangeFromCalendar(): void;
    stop(): void;
    serialize(): any;
}
export default ClockWgt;
